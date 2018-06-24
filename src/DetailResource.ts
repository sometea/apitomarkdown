import { RequestHandler } from "./RequestHandler";

export class DetailResource {
    private metaData: any;
    private title: string = '';
    private body: string = '';

    constructor(private requestHandler: RequestHandler) { }

    public async accessResource(): Promise<DetailResource> {
        const response = await this.requestHandler.get();
        const data = response.data;
        this.title = data.title;
        this.body = data.body;
        this.metaData = data;
        delete this.metaData.body;
        return this;
    }

    public getMetaData(): any {
        return this.metaData;
    }

    public getTitle(): string {
        return this.title;
    }

    public getBody(): string {
        return this.body;
    }

    public asMarkdown(): string {
        return JSON.stringify(this.getMetaData()) + '\n' + this.getBody();
    }
}