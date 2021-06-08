const BaseElement = require('../BaseElement')
const { DELIM } = require('../definitions')

class s extends BaseElement {
	static DEFAULT_DELIMITER = DELIM.s
	constructor(parentElement, options, body) {
		super(parentElement, options, body)
		this.options = options
		this.body = body
	}

	render() {
		return this.defaultRender('span')
	}
}

module.exports = s