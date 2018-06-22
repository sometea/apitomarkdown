import { DetailResource } from "./DetailResource";

export class ListResource {
    constructor(private url: string) { }

    public iterate(): DetailResource[] {
        return [new DetailResource(this.url)];
    }
}