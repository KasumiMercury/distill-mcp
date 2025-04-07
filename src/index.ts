import {distillDocumentFromURL} from "./distillDocumentFromURL.js";
import {McpServer} from '@modelcontextprotocol/sdk/server/mcp.js'
import {StdioServerTransport} from "@modelcontextprotocol/sdk/server/stdio.js";
import {z} from "zod";
import {convertToMarkdown} from "./convert.js";

const server = new McpServer({
	name: "distill-mcp",
	version: "0.0.1",
	capabilities: {
		resources: {},
		tools: {},
	},
})

server.tool(
	"get-article-as-markdown",
	"Get article as markdown",
	{
		url: z.string().url(),
	},
	async ({url}) => {
		const article = await distillDocumentFromURL(url);
		if (!article) {
			return {
				content: [
					{
						type: "text",
						text: "Failed to retrieve article",
					},
				],
			};
		}

		const markdown = convertToMarkdown(article);
		if (!markdown) {
			return {
				content: [
					{
						type: "text",
						text: "Failed to convert article to markdown",
					},
				],
			};
		}

		return {
			content: [
				{
					type: "text",
					text: markdown,
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