import { ListResource } from "./ListResource";
import path from 'path';
import fs from 'fs';

export class ResourceManager {
    constructor(private listResource: ListResource, private outputPath: string) { }

    private toCamelCase(str: string ) {
        const camelCase = str.replace(/(?:^\w|[A-Z]|\b\w)/g, (ltr, idx) => idx === 0 ? ltr.toLowerCase() : ltr.toUpperCase()).replace(/\s+/g, '');
        return camelCase.replace(/[^a-zA-Z ]/g, '');
    }

    private writeFile(fileNameWithPath: string, content: string): Promise<void> {
        return new Promise((resolve, reject) => {
            fs.writeFile(fileNameWithPath, content, err => {
                if (err) {
                    console.log(err);
                    reject();
                } else {
                    resolve();
                }
            })
        });
    }

    private createFolder(folderName: string): Promise<void> {
        return new Promise(resolve => {
            fs.mkdir(folderName, err => resolve());
        });
    }

    public async writeMarkdownFiles() {
        const detailResources = await this.listResource.iterate();
        for (let detailResource of detailResources) {
            const accessedResource = await detailResource.accessResource();
            const fileName = this.toCamelCase(accessedResource.getTitle()) + '.md';
            await this.createFolder(this.outputPath);
            await this.writeFile(path.join(this.outputPath, fileName), accessedResource.asMarkdown());
        }
    }
}