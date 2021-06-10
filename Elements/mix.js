const BaseElement = require('../BaseElement')
const { DELIM } = require('../definitions')

class mix extends BaseElement {
	static getDefaultDelimiter(elementStr) {
		if (elementStr === 'p') return DELIM.n
		return DELIM.s
	}

	constructor(parentElement, options, body, elementStr) {
		super(parentElement, options, body, elementStr)
		this.elementStr = elementStr
		this.options = options
		this.body = body
		if (this.elementStr === 'd') this.elementStr = 'del'
	}

	render() {
		return this.defaultRender(this.elementStr)
	}
}

module.exports = mix