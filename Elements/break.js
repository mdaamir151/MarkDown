const BaseElement = require('../BaseElement')
const { DELIM } = require('../definitions')

class NewLine extends BaseElement {
	static getDefaultDelimiter(elementStr) {
		return DELIM.x
	}
	constructor(parentElement, options, body, elementStr) {
		super(parentElement, options, body, elementStr)
		this.options = options
		this.body = body
		this.elementStr = elementStr
	}

	render() {
		return '<br>'
	}
}

module.exports = NewLine