import fs from 'fs';

export interface Config {
    basePath: string,
    authenticationUrl: string,
    username: string,
    password: string,
}

export class ConfigReader {
    public readConfig(filename: string): Promise<Config> {
        return new Promise((resolve, reject) => {
            fs.readFile(filename, (err, data) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(<Config>JSON.parse(data.toString()));
                }
            })
        });
    }
}