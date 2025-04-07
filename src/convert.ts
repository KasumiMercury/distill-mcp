import TurndownService from "turndown";
import DOMPurify from "dompurify";

export const convertToMarkdown = (html: string): string => {
	if (!html) {
		throw new Error("HTML content is empty");
	}

	const turndownService = new TurndownService();

	const sanitizedContent = DOMPurify.sanitize(html);
	return turndownService.turndown(sanitizedContent);
}