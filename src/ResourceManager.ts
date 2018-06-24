import { ListResource } from "./ListResource";
import path from 'path';

export class ResourceManager {
    constructor(private listResource: ListResource, private outputPath: string) { }

    private toCamelCase(str: string ) {
        return str.replace(/(?:^\w|[A-Z]|\b\w)/g, (ltr, idx) => idx === 0 ? ltr.toLowerCase() : ltr.toUpperCase()).replace(/\s+/g, '');
    }

    private writeFile(fileNameWithPath: string, content: string) {
        console.log('Filename: ' + fileNameWithPath + '\n');
        console.log('Content: \n' + content + '\n');
    }

    public async writeMarkdownFiles() {
        const detailResources = await this.listResource.iterate();
        for (let detailResource of detailResources) {
            const accessedResource = await detailResource.accessResource();
            const fileName = this.toCamelCase(accessedResource.getTitle()) + '.md';
            this.writeFile(path.join(this.outputPath, fileName), accessedResource.asMarkdown());
        }
    }
}