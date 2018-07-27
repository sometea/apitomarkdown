import { ListResource } from "./ListResource";
import path from 'path';
import fs from 'fs';
import { promisify } from 'util';
import { DetailResource } from "./DetailResource";

const writeFile = promisify(fs.writeFile);
const mkdir = promisify(fs.mkdir);

export class ResourceManager {
    constructor(private listResource: ListResource, private outputPath: string) { }

    private toCamelCase(str: string) {
        const camelCase = str.replace(/(?:^\w|[A-Z]|\b\w)/g, (ltr, idx) => idx === 0 ? ltr.toLowerCase() : ltr.toUpperCase()).replace(/\s+/g, '');
        return camelCase.replace(/[^a-zA-Z ]/g, '');
    }

    public async accessResourceAndWriteFiles() {
        let detailResources: DetailResource[];
        try {
            detailResources = await this.listResource.iterate();
        } catch (err) {
            throw 'Unable to access list resource.';
        }
        for (let detailResource of detailResources) {
            const accessedResource = await detailResource.accessResource();
            const fileName = this.toCamelCase(accessedResource.getTitle()) + '.md';
            await mkdir(this.outputPath);
            await writeFile(path.join(this.outputPath, fileName), accessedResource.asMarkdown());
        }
    }
}