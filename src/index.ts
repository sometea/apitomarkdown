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

app.post('/generate', (req, res) => {
    const url = req.body.url;
    const relativeOutputPath = req.body.relativeOutputPath;
    const secretKey = req.body.secretKey;
    let outputPath: string;
    if (!url || !relativeOutputPath || !secretKey) {
        res.status(400);
        return res.send('Please specify url, relativeOutputPath and secretKey in the request body.');
    }

    (new ConfigReader()).readConfig('config.json').then(config => {
        if (secretKey !== config.secretKey) {
            throw 'Secret key not valid';
        }
        outputPath = path.join(config.basePath, relativeOutputPath);
        return (new AuthenticationManager(config.authenticationUrl))
            .authenticate({ username: config.username, password: config.password })
    }).then(authHandler => {
        const bearerToken = authHandler.getToken();
        const requestHandler = new RequestHandler(url, bearerToken);
        const listResource = new ListResource(requestHandler);
        const resourceManager = new ResourceManager(listResource, outputPath);
        resourceManager.writeMarkdownFiles();
        return res.send('Markdown generation successful.');
    }).catch(err => {
        res.status(500);
        return res.send(err);
    });    
});

app.listen(3000, () => {
    console.log('API-to-markdown listening on port 3000...')
})