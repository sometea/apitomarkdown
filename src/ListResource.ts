import { DetailResource } from "./DetailResource";
import { RequestHandler } from "./RequestHandler";

export class ListResource {
    constructor(private requestHandler: RequestHandler) { }

    public iterate(): DetailResource[] {
        return [new DetailResource(this.requestHandler)];
    }
}