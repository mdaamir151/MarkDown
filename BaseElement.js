const ElementFactory = require('./ElementFactory')
const { DELIM } = require('./definitions')
const parseOptions = require('./optionParser')

class BaseElement {
	constructor(parentElement, options, body, elementStr) {
		this.parentElement = parentElement
		this.options = options
		this.body = body
		this.elementStr = elementStr
		if (parentElement === null) this.factory = new ElementFactory()
		else this.factory = parentElement.getFactory()
	}

	getStyleComponents() {
		return parseOptions(this.options)
	}

	parseStyle() {
		let st = this.getStyleComponents()
		if (st.length === 0) return ''
		return ' style=' + '"' + st.join('; ') + '"' //ensure space at start
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
		let reg = /(?<![^:](?:::)*|^(?:::)*)([a-z0-9]+?)(\[.*?\])?(\s+|{)/g
		let match, components = [], index = 0, toIndex
		while(match = reg.exec(this.body)) {
			let v = this.body.slice(index, match.index - 1) || ""
			v = v.replace(/^\s+|\s+$/g, '')
			if (match.index > index && v.length > 0) components.push({value: this.body.slice(index, match.index - 1), type: 'text'})
			let elementStr = match[1]
			if (!this.factory.elementRegistered(elementStr)) continue
			let opt = match[2]
			if (opt) opt = opt.slice(1, opt.length - 1)
			else opt = ''
			let delim = (match[3] === '{') && DELIM.b || this.factory.getDefaultDelimiter(elementStr)
			if (delim === DELIM.b) {
				let bReg = /(?<![^:](?:::)*:)}|(?<![^:](?:::)*:){|$/g
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
				let sReg = /\s|$/g
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
			} else if (delim === DELIM.x) {
				index = match.index + match[0].length
				toIndex = index
			} else {
				throw new Error("Invalid delimiter: " + delim + ' or element \'' + elementStr + '\' not defined!')
			}
			components.push({value: elementStr, options: opt, body: this.body.slice(match.index + match[0].length, toIndex), type: 'element'})
			reg.lastIndex = index
		}
		let v = this.body.slice(index) || ""
		v = v.replace(/^\s+|\s+$/g, '')
		if (index < this.body.length && v.length > 0) components.push({value: v, type: 'text'})
		return components
	}

	unscapeText(parsedStr) {
		let s = []
		let index = 0
		for (let i=0; i<parsedStr.length - 1; ++i) {
			if (parsedStr[i] === ':' && [':', '{', '}', '|'].includes(parsedStr[i+1])) {
				s.push(parsedStr.slice(index, i) + parsedStr[i+1])
				index = i+2
				i++
			}
		}
		s.push(parsedStr.slice(index))
		return s.join('')
	}

	trimNewLine(parsedStr) {
		let i = 0, j = parsedStr.length
		while(i<j && parsedStr[i] === '\n') i++
		while(i<j && parsedStr[j-1] === '\n') j--
		if (i === 0 && j === parsedStr.length) return parsedStr
		return parsedStr.slice(i, j)
	}

	parse() {
		let components = this.getComponents()
		let s = ''
		components.forEach(component => {
			if (component.type === 'text') s += this.trimNewLine(this.unscapeText(component.value)).replace(/[\n]/g, '')
			else {
				let element = this.factory.getElement(component.value, component.options, component.body, this)
				if (!element) throw Error('Undefined Element: ' + component.value)
				s += element.render()
			}
		})
		return s.trim()
	}

	defaultRender(elementMarkup) {
		return `<${elementMarkup}${this.parseStyle()}>${this.parse()}</${elementMarkup}>`
	}
}

module.exports = BaseElement