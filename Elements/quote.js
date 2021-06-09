const BaseElement = require('../BaseElement')
const { DELIM } = require('../definitions')

class quote extends BaseElement {
	static DEFAULT_DELIMITER = DELIM.n
	constructor(parentElement, options, body, elementStr) {
		super(parentElement, options, body, elementStr)
		this.elementStr = elementStr
		this.options = options
		this.body = body
	}

	render() {
		return this.defaultRender('blockquote')
	}
}

module.exports = quote