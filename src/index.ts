import { ListResource } from "./ListResource";
import { ResourceManager } from "./ResourceManager";

if (process.argv.length < 4) {
    console.log('Please specify the URL and output path.');
    process.exit();
}

const url = process.argv[2];
const outputPath = process.argv[3];

const listResource = new ListResource(url);
const resourceManager = new ResourceManager(listResource, outputPath);
resourceManager.writeMarkdownFiles();
