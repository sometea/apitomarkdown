import { RequestHandler } from "./RequestHandler";

export class DetailResource {
    constructor(private requestHandler: RequestHandler) { }

    public accessResource() {

    }

    public getMetaData(): object {
        return {};
    }

    public getTitle(): string {
        return 'Test';
    }

    public getBody(): string {
        return '';
    }

    public asMarkdown(): string {
        return ''
    }
}