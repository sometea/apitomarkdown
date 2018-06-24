import request from 'request-promise-native';

export class RequestHandler {
    constructor(private url: string, private bearerToken: string) { }

    public getUrl(): string {
        return this.url;
    }

    public getBearerToken(): string {
        return this.bearerToken;
    }

    public async get(): Promise<any> {
        const response = await request.get(this.url, {
            'auth': {
                'bearer': this.bearerToken,
            },
        });
        return JSON.parse(response);
    }
}