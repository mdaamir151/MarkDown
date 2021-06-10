const BaseElement = require('../BaseElement')
const { DELIM } = require('../definitions')

class table extends BaseElement {
	static getDefaultDelimiter(elementStr) {
		if (elementStr === 'th' || elementStr === 'tr') return DELIM.n
		return DELIM.b
	}

	constructor(parentElement, options, body, elementStr) {
		super(parentElement, options, body, elementStr)
		this.elementStr = elementStr
		this.options = options
		this.body = body
	}

	getStyleClasses() {
		let opts = this.options.split(' ')
		let clz = []
		if (opts.includes('striped')) clz.push('striped')
		if (clz.length === 0) return ''
		return ' class="' + clz.join(' ') + '"'
	}

	render() {
		if (this.elementStr === 'th' || this.elementStr === 'tr') {
			let cell = 'td'
			if (this.elementStr === 'th') cell = 'th'
			let s = ''
			this.body.split(/(?<![^:](?:::)*:)\|/).forEach(data=>{
				let td = new BaseElement(this, '', data, '')
				s += td.defaultRender(cell)
			})
			return `<tr${this.parseStyle()}>${s.trim()}</tr>`
		}

		return `<table${this.parseStyle()}${this.getStyleClasses()}>${this.parse()}</table>`
	}
}

module.exports = table