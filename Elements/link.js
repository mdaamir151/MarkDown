const BaseElement = require('../BaseElement')
const { DELIM } = require('../definitions')

class link extends BaseElement {
	static getDefaultDelimiter(elementStr) {
		return DELIM.s
	}
	constructor(parentElement, options, body, elementStr) {
		super(parentElement, options, body, elementStr)
		this.options = options
		this.body = body
		this.elementStr = elementStr
	}

	render() {
		let target = "#"
		this.options.split(' ').forEach(opt=>{
			if (opt.startsWith('http')) {
				target = opt
				return
			}
		})
		return `<a href="${target}" target="blank" ${this.parseStyle()}>${this.parse().trim()}</a>`
	}
}

module.exports = link