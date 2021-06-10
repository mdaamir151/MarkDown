const BaseElement = require('../BaseElement')
const { DELIM } = require('../definitions')

class image extends BaseElement {
	static getDefaultDelimiter(elementStr) {
		return DELIM.s
	}

	constructor(parentElement, options, body, elementStr) {
		super(parentElement, options, body, elementStr)
		this.elementStr = elementStr
		this.options = options
		this.body = body
	}

	getStyleComponents() {
		let keyWords = this.options.split(' ')
		let st = super.getStyleComponents()
		keyWords.forEach(word=>{
			if (word === 'im-left') st.push('float: left')
			else if (word === 'im-right') st.push('float: right')
			else if (/^\d+w$/.test(word)) st.push(`max-width: ${word.slice(0, word.length-1)}%`)
			else if (/^\d+h$/.test(word)) st.push(`max-height: ${word.slice(0, word.length-1)}%`)
		})
		return st
	}

	render() {
		let source = "#"
		this.options.split(' ').forEach(opt=>{
			if (opt.startsWith('http')) {
				source = opt
				return
			}
		})
		return `<img src="${source}"${this.parseStyle()} title="${this.parse()}">`
	}
}

module.exports = image