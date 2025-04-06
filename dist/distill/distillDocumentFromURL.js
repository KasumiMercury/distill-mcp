import { JSDOM } from "jsdom";
export const distillDocumentFromURL = async (url) => {
    const dom = await JSDOM.fromURL(url);
    const document = dom.window.document;
    // TODO: impl distill
    // TODO: convert to Markdown
    return document.title;
};
