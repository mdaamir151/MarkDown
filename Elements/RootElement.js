const BaseElement = require('../BaseElement')

class RootElement extends BaseElement {
	constructor(options, body) {
		super(null, options, body)
		this.options = options
		this.body = body
	}

	render() {
		return '<div>' + this.parse() + '</div>'
	}
}

module.exports = RootElement