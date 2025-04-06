"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsdom_1 = require("jsdom");
// console.log('Happy developing ✨')
const args = process.argv.slice(2);
const targetUrl = args[0];
if (!targetUrl) {
    console.error('Please provide a URL as an argument.');
    process.exit(1);
}
const main = () => __awaiter(void 0, void 0, void 0, function* () {
    const dom = yield jsdom_1.JSDOM.fromURL(targetUrl);
    const document = dom.window.document;
    console.log(`Title: ${document.title}`);
});
main()
    .then(() => {
    console.log('Done!');
})
    .catch((error) => {
    console.error('Error:', error);
})
    .finally(() => {
    process.exit(0);
});
