import { ListResource } from "./ListResource";
import { ResourceManager } from "./ResourceManager";
import { AuthenticationManager } from "./AuthenticationManager";
import { RequestHandler } from "./RequestHandler";
import { ConfigReader } from "./ConfigReader";

import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';

const app = express();

app.use(bodyParser.json());

app.get('/', (req, res) => {
    return res.send('This is the API-to-markdown server. POST to /generate to start markdown generation.');
});

app.post('/generate', async (req, res) => {
    const url = req.body.url;
    const relativeOutputPath = req.body.relativeOutputPath;
    const secretKey = req.body.secretKey;
    let outputPath: string;
    if (!url || !relativeOutputPath || !secretKey) {
        return res.status(400).send('Please specify url, relativeOutputPath and secretKey in the request body.');
    }

    const config = await (new ConfigReader()).readConfig('config.json');
    if (secretKey !== config.secretKey) {
        throw 'Secret key not valid';
    }
    outputPath = path.join(config.basePath, relativeOutputPath);
    const authHandler = await (new AuthenticationManager(config.authenticationUrl))
        .authenticate({ username: config.username, password: config.password });
    const bearerToken = authHandler.getToken();
    const requestHandler = new RequestHandler(url, bearerToken);
    const listResource = new ListResource(requestHandler);
    const resourceManager = new ResourceManager(listResource, outputPath);
    await resourceManager.accessResourceAndWriteFiles();
    return res.send('Markdown generation successful.');
});

app.listen(3000, () => {
    console.log('API-to-markdown listening on port 3000...')
})