export class DetailResource {
    constructor(private url: string) { }

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