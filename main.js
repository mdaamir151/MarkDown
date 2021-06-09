const RootElement = require('./Elements/RootElement')
const elements = require('./elementRegister')

const run = function run(rawStr) {
	let root = new RootElement(null, rawStr, 'root')
	for (const [regex, elementClass] of Object.entries(elements)) {
  		root.registerElement(regex, elementClass)
	}
	return root.render()
}

let str = ':h1[red]_{This :::{is title}\nCheck :b_ this string and :p_:f[bold blue hlt italic 1.5s]_this is other string.:q_{This is quote}\
 :line_ :b_bold, now :i_italics, :u_underline, :d_deleted. That\'s it'

console.log(run(str))

module.exports = run