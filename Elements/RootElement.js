const BaseElement = require('../BaseElement')

class RootElement extends BaseElement {
	constructor(options, body, elementStr) {
		super(null, options, body, elementStr)
		this.options = options
		this.body = body
		this.elementStr = elementStr
	}

	render() {
		let divEle = document.createElement('div')
		divEle.innerHTML = this.parse()
		return divEle
	}
}

module.exports = RootElement