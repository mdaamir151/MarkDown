const BaseElement = require('../BaseElement')
const { DELIM } = require('../definitions')

const languages = ['c_cpp']
const languageName = ['C/C++']

class Code extends BaseElement {
	static getDefaultDelimiter(elementStr) {
		return DELIM.b
	}
	constructor(parentElement, options, body, elementStr) {
		super(parentElement, options, body, elementStr)
		this.options = options
		this.body = body
		this.elementStr = elementStr
	}

	render() {
		let opt = this.options.trim()
		let lan = 'c_cpp'
		let langIdx = languages.indexOf(opt)
		if (langIdx >= 0) lan = opt
		else langIdx = 0
		return `<div class="ace-container"><div class="ace-header"><span class="lang-tab">${languageName[langIdx]}</span></div><div data-lang='${lan}' class='code-div'>${this.body}</div></div>`
	}
}

module.exports = Code