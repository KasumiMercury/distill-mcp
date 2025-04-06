import {JSDOM} from 'jsdom'

// console.log('Happy developing ✨')

const args = process.argv.slice(2)
const targetUrl = args[0]

if (!targetUrl) {
	console.error('Please provide a URL as an argument.')
	process.exit(1)
}

const main = async () => {
	const dom = await JSDOM.fromURL(targetUrl)
	const document = dom.window.document

	console.log(
		`Title: ${document.title}`
	)
}

main()
	.then(() => {
		console.log('Done!')
	})
	.catch((error) => {
		console.error('Error:', error)
	})
	.finally(() => {
		process.exit(0)
	})