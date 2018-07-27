import fs from 'fs';
import { promisify } from 'util';

const readFile = promisify(fs.readFile);

export interface Config {
    basePath: string,
    authenticationUrl: string,
    secretKey: string;
    username: string,
    password: string,
}

export class ConfigReader {
    public async readConfig(filename: string): Promise<Config> {
        const data = await readFile(filename);
        return <Config>JSON.parse(data.toString());
    }
}