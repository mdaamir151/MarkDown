const BaseElement = require('../BaseElement')
const { DELIM } = require('../definitions')

class format extends BaseElement {
	static getDefaultDelimiter(elementStr) {
		return DELIM.s
	}

	constructor(parentElement, options, body, elementStr) {
		super(parentElement, options, body, elementStr)
		this.options = options
		this.body = body
		this.elementStr = elementStr
	}

	render() {
		return this.defaultRender('span')
	}
}

module.exports = format