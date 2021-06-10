const BaseElement = require('../BaseElement')
const { DELIM } = require('../definitions')

class list extends BaseElement {
	static getDefaultDelimiter(elementStr) {
		if (elementStr === 'li') return DELIM.n
		return DELIM.b
	}
	constructor(parentElement, options, body, elementStr) {
		super(parentElement, options, body, elementStr)
		this.elementStr = elementStr
		this.options = options
		this.body = body
	}

	render() {
		return this.defaultRender(this.elementStr)
	}
}

module.exports = list