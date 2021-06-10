const RootElement = require('./Elements/RootElement')
const elements = require('./elementRegister')

const run = function run(rawStr) {
	let root = new RootElement(null, rawStr, 'root')
	for (const [regex, elementClass] of Object.entries(elements)) {
  		root.registerElement(regex, elementClass)
	}
	return root.render()
}

let str = ":h{::h is same as ::h1::} \n'f' for :::f[2s blue] formatting, b :b bold, i :i italics, d :d delete, u :u underline. :p link to google is: :ln[https://www.google.com/] google"
console.log(run(str))

module.exports = run