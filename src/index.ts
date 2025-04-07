import {distillDocumentFromURL} from "./distillDocumentFromURL.js";
import {McpServer} from '@modelcontextprotocol/sdk/server/mcp.js'
import {StdioServerTransport} from "@modelcontextprotocol/sdk/server/stdio.js";
import {z} from "zod";

const server = new McpServer({
	name: "distill-mcp",
	version: "0.0.1",
	capabilities: {
		resources: {},
		tools: {},
	},
})

server.tool(
	"get-title",
	"Get the title of a web page",
	{
		url: z.string().url(),
	},
	async ({url}) => {
		const title = await distillDocumentFromURL(url);
		if (!title) {
			return {
				content: [
					{
						type: "text",
						text: "Failed to retrieve title",
					},
				],
			};
		}

		return {
			content: [
				{
					type: "text",
					text: `Title of the page: ${title}`,
				},
			],
		};
	}
)

async function main() {
	const transport = new StdioServerTransport();
	await server.connect(transport);
	console.error("Weather MCP Server running on stdio");
}

main().catch((error) => {
	console.error("Fatal error in main():", error);
	process.exit(1);
});