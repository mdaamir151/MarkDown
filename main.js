const RootElement = require('./Elements/RootElement')
const elements = require('./elementRegister')

const run = function run(rawStr) {
	let root = new RootElement(null, rawStr)
	for (const [regex, elementClass] of Object.entries(elements)) {
  		root.registerElement(regex, elementClass)
	}
	return root.render()
}

let str = ':h1{tc: red}_This is title. check this string\n and :s{fw: bold}_this is other string'
console.log(run(str))