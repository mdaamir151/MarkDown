const BaseElement = require('../BaseElement')
const { DELIM } = require('../definitions')
const AsciiMathParser = require('../asciimath2tex')
const katex = require('../katex/katex.min.js')

const mathParser = new AsciiMathParser()

class math extends BaseElement{
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
		let text = katex.renderToString(mathParser.parse(this.body))
		if (this.options) return `<span${this.parseStyle()}>${text}</span>`
		return text
	}
}

module.exports = math