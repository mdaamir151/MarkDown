const BaseElement = require('../BaseElement')

class RootElement extends BaseElement {
	constructor(options, body, elementStr) {
		super(null, options, body, elementStr)
		this.options = options
		this.body = body
		this.elementStr = elementStr
	}

	render() {
		return '<div>' + this.parse() + '</div>'
	}
}

module.exports = RootElement