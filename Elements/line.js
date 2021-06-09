const BaseElement = require('../BaseElement')
const { DELIM } = require('../definitions')

class line extends BaseElement {
	static DEFAULT_DELIMITER = DELIM.x
	constructor(parentElement, options, body, elementStr) {
		super(parentElement, options, body, elementStr)
		this.elementStr = elementStr
		this.options = options
		this.body = body
	}

	render() {
		return '<hr>'
	}
}

module.exports = line