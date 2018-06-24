import { DetailResource } from "./DetailResource";
import { RequestHandler } from "./RequestHandler";

export class ListResource {
    constructor(private requestHandler: RequestHandler) { }

    public async iterate(): Promise<DetailResource[]> {
        const response = await this.requestHandler.get();
        return response.data.map((element: any) => {
            const detailRequestHandler = new RequestHandler(
                this.requestHandler.getUrl() + '/' + element.id,
                this.requestHandler.getBearerToken()
            );
            return new DetailResource(detailRequestHandler);
        })
    }
}