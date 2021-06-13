const BaseElement = require('../BaseElement')
const { DELIM } = require('../definitions')

const languages = ['c_cpp']

class Code extends BaseElement {
	static uniqueId = 10
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
		if (languages.includes(opt)) lan = opt
		Code.uniqueId++
		return `<div data-lang='${lan}' class='code-div'>${this.body}</div>`
	}
}

module.exports = Code