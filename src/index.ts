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
	"get_article-as-markdown",
	"Get article as markdown from URL",
	{
		url: z.string().url(),
	},
	async ({url}) => {
		try {
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

			return {
				content: [
					{
						type: "text",
						text: markdown,
					},
				],
			};
		} catch (error) {
			console.error("Error in get_article-as-markdown:", error);
			return {
				content: [
					{
						type: "text",
						text: "Failed to retrieve article: " + error,
					},
				],
			};
		}
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