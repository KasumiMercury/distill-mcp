import {JSDOM} from "jsdom";
import {Readability} from "@mozilla/readability";
import DOMPurify from "dompurify";
import TurndownService from "turndown";


export const distillDocumentFromURL = async (url: string): Promise<string> => {
	const dom = await JSDOM.fromURL(url)
	const document = dom.window.document

	if (!document) {
		throw new Error("Failed to parse document");
	}

	const article = new Readability(document).parse();

	if (!article) {
		throw new Error("Failed to parse article");
	}

	if (!article.content) {
		throw new Error("Failed to get article content");
	}

	const turndownService = new TurndownService();
	const sanitizedContent = DOMPurify.sanitize(article.content);
	return turndownService.turndown(sanitizedContent);
}