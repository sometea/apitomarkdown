import { ListResource } from "./ListResource";
import { ResourceManager } from "./ResourceManager";
import { AuthenticationManager } from "./AuthenticationManager";
import { RequestHandler } from "./RequestHandler";
import { ConfigReader } from "./ConfigReader";

import path from 'path';

if (process.argv.length < 4) {
    console.log('Please specify the URL and relative output path.');
    process.exit();
}

const url = process.argv[2];
const relativeOutputPath = process.argv[3];
let outputPath: string;

(new ConfigReader()).readConfig('config.json').then(config => {
    outputPath = path.join(config.basePath, relativeOutputPath);
    return (new AuthenticationManager(config.authenticationUrl))
        .authenticate({ username: config.username, password: config.password })
}).then(authHandler => {
    const bearerToken = authHandler.getToken();
    const requestHandler = new RequestHandler(url, bearerToken);
    const listResource = new ListResource(requestHandler);
    const resourceManager = new ResourceManager(listResource, outputPath);
    resourceManager.writeMarkdownFiles();
}).catch(err => {
    console.log(err);
});
