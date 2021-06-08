const ElementFactory = require('./ElementFactory')
const { DELIM } = require('./definitions')

class BaseElement {
	constructor(parentElement, options, body) {
		this.parentElement = parentElement
		this.options = options
		this.body = body
		if (parentElement === null) this.factory = new ElementFactory()
		else this.factory = parentElement.getFactory()
	}

	createOwnFactory() {
		this.factory = new ElementFactory()
	}

	/**
	* If this element is not root element and new elements are registered, don't change root factory
	* */
	registerElement(regex, elementCls) {
		if (this.parentElement && this.factory === this.parentElement.getFactory()) {
			this.factory = this.factory.getClone()
		}

		this.factory.registerElement(regex, elementCls)
	}

	getFactory() {
		return this.factory
	}

	getComponents() {
		let reg = /(?<!:):([a-z0-9]+?)({.*?})?_({)?/g
		let match, components = [], index = 0, toIndex
		while(match = reg.exec(this.body)) {
			if (match.index > index) components.push({value: this.body.slice(index, match.index), type: 'text'})
			let elementStr = match[1]
			let optStr = match[2]
			if (optStr) optStr = optStr.replace(/([a-zA-Z#-]+)/g, (match, p)=>{
				return '"' + p + '"'
			})
			let opt = optStr && JSON.parse(optStr) || JSON.parse('{}')
			let delim = match[3] && DELIM.b || this.factory.getDefaultDelimiter(elementStr)
			if (delim === DELIM.b) {
				let bReg = /(?<!:)}|{/g
				let _c = 0, bMatch
				bReg.lastIndex = match.index + match[0].length
				while (bMatch = bReg.exec(this.body)) {
					if (bMatch[0] === '{') _c++
					else _c--
					if (_c < 0) {
						index = bMatch.index + 1
						toIndex = bMatch.index
						break
					}
				}
			} else if (delim === DELIM.s) {
				let sReg = /\s+?/g
				sReg.lastIndex =  match.index + match[0].length
				let sMatch = sReg.exec(this.body)
				index = sMatch.index
				toIndex = sMatch.index
			} else if (delim === DELIM.n) {
				let idx =  match.index + match[0].length
				while(idx < this.body.length && this.body[idx] != '\n') idx++
				index = idx + 1
				toIndex = idx
			} else if (delim === DELIM.e) {
				index = this.body.length
				toIndex = index
			} else {
				throw new Error("Invalid delimiter: " + delim)
			}
			components.push({value: elementStr, options: opt, body: this.body.slice(match.index + match[0].length, toIndex), type: 'element'})
			reg.lastIndex = index
		}

		if (index < this.body.length) components.push({value: this.body.slice(index), type: 'text'})
		return components
	}
	parse() {
		let components = this.getComponents()
		let s = ''
		components.forEach(component => {
			if (component.type === 'text') s += component.value
			else {
				let element = this.factory.getElement(component.value, component.options, component.body, this)
				s += element.render()
			}
		})
		return s
	}
	getOptionsString() {
		let formatArr = []
		if (this.options.tc) formatArr.push('color: ' + this.options.tc)
		if (this.options.ts) formatArr.push('font-size: ' + this.options.ts)
		if (this.options.bc) formatArr.push('background-color: ' + this.options.bc)
		if (this.options.fw) formatArr.push('font-weight: ' + this.options.fw)
		if (this.options.fs) formatArr.push('font-style: ' + this.options.fs)
		if (formatArr.length === 0) return ''
		return 'style=' + '"' + formatArr.join('; ') + '"'
	}

	defaultRender(elementMarkup) {
		return `<${elementMarkup} ${this.getOptionsString()}> ${this.parse()}</${elementMarkup}>`
	}
}

module.exports = BaseElement