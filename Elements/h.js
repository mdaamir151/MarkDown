const BaseElement = require('../BaseElement')
const { DELIM } = require('../definitions')

class h extends BaseElement {
	static getDefaultDelimiter(elementStr) {
		return DELIM.n
	}
	constructor(parentElement, options, body, elementStr) {
		super(parentElement, options, body, elementStr)
		this.options = options
		this.body = body
		this.elementStr = elementStr
		if (elementStr === 'h') this.elementStr = 'h1'
	}

	render() {
		return this.defaultRender(this.elementStr)
	}
}

module.exports = h