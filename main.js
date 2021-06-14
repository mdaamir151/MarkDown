const RootElement = require('./Elements/RootElement')
const elements = require('./elementRegister')

const checkCode = function() {
	let codeDivs = document.getElementsByClassName('code-div')
	for(let i=0; i<codeDivs.length; ++i) {
		let codeElement = codeDivs[i]
		ace.edit(codeElement, {mode: `ace/mode/${codeElement.dataset.lang}`, maxLines: 100, theme: '../ace-src-min/textmate', readOnly:true})
	}
}

const run = function run(rawStr) {
	let root = new RootElement(null, rawStr, 'root')
	for (const [regex, elementClass] of Object.entries(elements)) {
  		root.registerElement(regex, elementClass)
	}
	let rootElement = root.render()
	setTimeout(checkCode, 0)
	return rootElement
}

module.exports = run