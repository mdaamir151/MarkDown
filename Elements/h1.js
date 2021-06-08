const BaseElement = require('../BaseElement')
const { DELIM } = require('../definitions')

class h1 extends BaseElement {
	static DEFAULT_DELIMITER = DELIM.n
	constructor(parentElement, options, body) {
		super(parentElement, options, body)
		this.options = options
		this.body = body
	}

	render() {
		return this.defaultRender('h1')
	}
}

module.exports = h1