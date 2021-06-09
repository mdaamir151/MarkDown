const BaseElement = require('../BaseElement')
const { DELIM } = require('../definitions')

class h extends BaseElement {
	static DEFAULT_DELIMITER = DELIM.n
	constructor(parentElement, options, body, elementStr) {
		super(parentElement, options, body, elementStr)
		this.options = options
		this.body = body
		this.elementStr = elementStr
	}

	render() {
		return this.defaultRender(this.elementStr)
	}
}

module.exports = h