
class ElementFactory {
	constructor() {
		this.classes = []
	}
	registerElement(regex, elementCls) {
		this.classes.push([new RegExp(`^(${regex})$`), elementCls])
	}

	elementRegistered(elementStr) {
		for (let i = this.classes.length - 1; i>=0; --i) {
			let tuple = this.classes[i]
			if (tuple[0].test(elementStr)) return true
		}
		return false
	}

	/**
	 * Check most recent first
	 * */
	getElement(elementStr, options, body, parent) {
		for (let i = this.classes.length - 1; i>=0; --i) {
			let tuple = this.classes[i]
			if (tuple[0].test(elementStr)) return new tuple[1](parent, options || '', body, elementStr)
		}
		return null
	}
	getDefaultDelimiter(elementStr) {
		for (let i = this.classes.length - 1; i>=0; --i) {
			let tuple = this.classes[i]
			if (tuple[0].test(elementStr)) return tuple[1].getDefaultDelimiter(elementStr)
		}
		return null
	}

	getClone() {
		let factory = new ElementFactory()
		factory.classes = this.classes.slice()
		return factory
	}
}

module.exports = ElementFactory