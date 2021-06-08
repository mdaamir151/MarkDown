const RootElement = require('./Elements/RootElement')
const elements = require('./elementRegister')

const run = function run(rawStr) {
	let root = new RootElement(null, rawStr)
	for (const [regex, elementClass] of Object.entries(elements)) {
  		root.registerElement(regex, elementClass)
	}
	return root.render()
}

let str = ':h1[red]_{This :::{is title}\nCheck this string and :s[bold blue hlt italic 1.5s]_this is other string'

console.log(run(str))