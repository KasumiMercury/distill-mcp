import TurndownService from "turndown";
import { JSDOM } from 'jsdom';
import DOMPurify from 'dompurify';

export const convertToMarkdown = (html: string): string => {
	if (!html) {
		throw new Error("HTML content is empty");
	}

	const turndownService = new TurndownService();

	const window = new JSDOM('').window;
	// @ts-ignore
	const purify = DOMPurify(window);

	const sanitizedContent = purify.sanitize(html);
	return turndownService.turndown(sanitizedContent);
}