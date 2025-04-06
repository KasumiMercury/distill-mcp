import {distillDocumentFromURL} from "./distill/distillDocumentFromURL.js";
import {McpServer} from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

const server = new McpServer({
	name: "distill-mcp",
	version: "0.0.1",
	capabilities: {
		resources: {},
		tools: {},
	},
})

// const args = process.argv.slice(2)
// const targetUrl = args[0]
//
// if (!targetUrl) {
// 	console.error('Please provide a URL as an argument.')
// 	process.exit(1)
// }
//
// distillDocumentFromURL(targetUrl)
// 	.then((result) => {
// 		console.log('Distilled Document:', result)
// 		console.log('Done!')
// 	})
// 	.catch((error) => {
// 		console.error('Error:', error)
// 	})
// 	.finally(() => {
// 		process.exit(0)
// 	})

async function main() {
	const transport = new StdioServerTransport();
	await server.connect(transport);
	console.error("Weather MCP Server running on stdio");
}

main().catch((error) => {
	console.error("Fatal error in main():", error);
	process.exit(1);
});