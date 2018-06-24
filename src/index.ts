import { ListResource } from "./ListResource";
import { ResourceManager } from "./ResourceManager";
import { AuthenticationManager } from "./AuthenticationManager";
import { RequestHandler } from "./RequestHandler";

if (process.argv.length < 5) {
    console.log('Please specify the URL, authentication URL and output path.');
    process.exit();
}

const url = process.argv[2];
const authenticationUrl = process.argv[3]
const outputPath = process.argv[4];

const bearerToken = (new AuthenticationManager(authenticationUrl))
    .authenticate({ username: 'admin@admin.com', password: 'password' })
    .getToken();
const requestHandler = new RequestHandler(url, bearerToken);
const listResource = new ListResource(requestHandler);
const resourceManager = new ResourceManager(listResource, outputPath);
resourceManager.writeMarkdownFiles();
