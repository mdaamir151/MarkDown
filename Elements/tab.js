const BaseElement = require('../BaseElement')
const { DELIM } = require('../definitions')

class NewLine extends BaseElement {
	static getDefaultDelimiter(elementStr) {
		return DELIM.x
	}
	constructor(parentElement, options, body, elementStr) {
		super(parentElement, options, body, elementStr)
		this.options = options
		this.body = body
		this.elementStr = elementStr
	}

	render() {
		let n = 1
		this.options.split(' ').forEach(nTabs=>{
			if (/\d{1,2}/.test(nTabs)) {
				n = Number(nTabs)
				return
			}
		})
		return Array(n+1).join('&emsp;')
	}
}

module.exports = NewLine