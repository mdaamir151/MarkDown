(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
		let reg = /(?<!:):([a-z0-9]+?)(\[[a-z0-9\.\s]*?\])?_[ ]*({)?/g //ignore first space
		let match, components = [], index = 0, toIndex
		while(match = reg.exec(this.body)) {
			if (match.index > index) components.push({value: this.body.slice(index, match.index), type: 'text'})
			let elementStr = match[1]
			let opt = match[2]
			if (opt) opt = opt.slice(1, opt.length - 1)
			let delim = match[3] && DELIM.b || this.factory.getDefaultDelimiter(elementStr)
			if (delim === DELIM.b) {
				let bReg = /(?<!:)}|(?<!:){|$/g
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
				let sReg = /\s+?|$/g
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

		if (index < this.body.length) components.push({value: this.body.slice(index), type: 'text'})
		return components
	}

	unscapeString(parsedStr) {
		let s = []
		let index = 0
		for (let i=0; i<parsedStr.length - 1; ++i) {
			if (parsedStr[i] === ':' && [':', '{', '}'].includes(parsedStr[i+1])) {
				s.push(parsedStr.slice(index, i) + parsedStr[i+1])
				index = i+2
				i++
			}
		}
		s.push(parsedStr.slice(index))
		return s.join('')
	}

	parse() {
		let components = this.getComponents()
		let s = ''
		components.forEach(component => {
			if (component.type === 'text') s += this.unscapeString(component.value)
			else {
				let element = this.factory.getElement(component.value, component.options, component.body, this)
				if (!element) throw Error('Undefined Element: ' + component.value)
				s += element.render()
			}
		})
		return s
	}

	defaultRender(elementMarkup) {
		return `<${elementMarkup}${parseOptions(this.options)}>${this.parse()}</${elementMarkup}>`
	}
}

module.exports = BaseElement
},{"./ElementFactory":2,"./definitions":10,"./optionParser":14}],2:[function(require,module,exports){

class ElementFactory {
	constructor() {
		this.classes = []
	}
	registerElement(regex, elementCls) {
		this.classes.push([new RegExp(regex), elementCls])
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
			if (tuple[0].test(elementStr)) return tuple[1].DEFAULT_DELIMITER
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
},{}],3:[function(require,module,exports){
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
},{"../BaseElement":1}],4:[function(require,module,exports){
const BaseElement = require('../BaseElement')
const { DELIM } = require('../definitions')

class format extends BaseElement {
	static DEFAULT_DELIMITER = DELIM.s
	constructor(parentElement, options, body, elementStr) {
		super(parentElement, options, body, elementStr)
		this.options = options
		this.body = body
		this.elementStr = elementStr
	}

	render() {
		return this.defaultRender('span')
	}
}

module.exports = format
},{"../BaseElement":1,"../definitions":10}],5:[function(require,module,exports){
const BaseElement = require('../BaseElement')
const { DELIM } = require('../definitions')

class h extends BaseElement {
	static DEFAULT_DELIMITER = DELIM.n
	constructor(parentElement, options, body, elementStr) {
		super(parentElement, options, body, elementStr)
		this.options = options
		this.body = body
		this.elementStr = elementStr
	}

	render() {
		return this.defaultRender(this.elementStr)
	}
}

module.exports = h
},{"../BaseElement":1,"../definitions":10}],6:[function(require,module,exports){
const BaseElement = require('../BaseElement')
const { DELIM } = require('../definitions')

class line extends BaseElement {
	static DEFAULT_DELIMITER = DELIM.x
	constructor(parentElement, options, body, elementStr) {
		super(parentElement, options, body, elementStr)
		this.elementStr = elementStr
		this.options = options
		this.body = body
	}

	render() {
		return '<hr>'
	}
}

module.exports = line
},{"../BaseElement":1,"../definitions":10}],7:[function(require,module,exports){
const BaseElement = require('../BaseElement')
const { DELIM } = require('../definitions')

class mix extends BaseElement {
	static DEFAULT_DELIMITER = DELIM.s
	constructor(parentElement, options, body, elementStr) {
		super(parentElement, options, body, elementStr)
		this.elementStr = elementStr
		this.options = options
		this.body = body
		if (this.elementStr === 'd') this.elementStr = 'del'
	}

	render() {
		return this.defaultRender(this.elementStr)
	}
}

module.exports = mix
},{"../BaseElement":1,"../definitions":10}],8:[function(require,module,exports){
const BaseElement = require('../BaseElement')
const { DELIM } = require('../definitions')

class p extends BaseElement {
	static DEFAULT_DELIMITER = DELIM.n
	constructor(parentElement, options, body, elementStr) {
		super(parentElement, options, body, elementStr)
		this.elementStr = elementStr
		this.options = options
		this.body = body
	}

	render() {
		return this.defaultRender('p')
	}
}

module.exports = p
},{"../BaseElement":1,"../definitions":10}],9:[function(require,module,exports){
const BaseElement = require('../BaseElement')
const { DELIM } = require('../definitions')

class quote extends BaseElement {
	static DEFAULT_DELIMITER = DELIM.n
	constructor(parentElement, options, body, elementStr) {
		super(parentElement, options, body, elementStr)
		this.elementStr = elementStr
		this.options = options
		this.body = body
	}

	render() {
		return this.defaultRender('blockquote')
	}
}

module.exports = quote
},{"../BaseElement":1,"../definitions":10}],10:[function(require,module,exports){

const DELIM = {b: '{', n: '\n', s: ' ', e: '\0', x: ''}

module.exports = { DELIM }
},{}],11:[function(require,module,exports){
const run = require('../main')

window.onload = function() {
	let view = document.getElementById('main-view')
	let editText = document.getElementById('edit-text')

	const updateView = function() {
		console.log('update')
		let content = editText.value
 		let s = run(content)
 		view.innerHTML = s
	}

	editText.addEventListener('blur', (event) => {
 		updateView()
	});

	updateView()
}
},{"../main":13}],12:[function(require,module,exports){
const h = require('./Elements/h')
const f = require('./Elements/format')
const mix = require('./Elements/mix')
const p = require('./Elements/p')
const line = require('./Elements/line')
const quote = require('./Elements/quote')

//key is regex string
const elements = {
	'h1|h2|h3' : h,
	'f': f,
	'b|d|u|i': mix,
	'p': p,
	'l': line,
	'q': quote,
}

module.exports = elements
},{"./Elements/format":4,"./Elements/h":5,"./Elements/line":6,"./Elements/mix":7,"./Elements/p":8,"./Elements/quote":9}],13:[function(require,module,exports){
const RootElement = require('./Elements/RootElement')
const elements = require('./elementRegister')

const run = function run(rawStr) {
	let root = new RootElement(null, rawStr, 'root')
	for (const [regex, elementClass] of Object.entries(elements)) {
  		root.registerElement(regex, elementClass)
	}
	return root.render()
}

let str = ':h1[red]_{This :::{is title}\nCheck :b_ this string and :p_:f[bold blue hlt italic 1.5s]_this is other string.:q_{This is quote}\
 :line_ :b_bold, now :i_italics, :u_underline, :d_deleted. That\'s it'

console.log(run(str))

module.exports = run
},{"./Elements/RootElement":3,"./elementRegister":12}],14:[function(require,module,exports){
//example: 1.5s uline/strike bold italic center/left/right
const styles = {
	'red' : 'color: red', 'yellow' : 'color: yellow', 'blue' : 'color: blue', 'green': 'color: green', 'black': 'color: black',
	'uline': 'text-decoration: underline', 'strike': 'text-decoration: line-through',
	'bold': 'font-weight: bold', 'italic': 'font-style: italic',
	'center': 'text-align: center', 'left': 'text-align: left', 'right': 'text-align: right',
	'hlt': 'background-color: yellow',
}

const parseOptions = function(optionsStr) {
	let opts = optionsStr.split(' ')
	let st = []
	for (let s of opts) {
		if (styles[s]) st.push(styles[s])
		else if (s.endsWith('s') && Number(s.substring(0, s.length-1))) st.push('font-size: ' + s.substring(0, s.length-1) + 'em')
	}
	if (st.length === 0) return ''
	return ' style=' + '"' + st.join('; ') + '"' //ensure space at start
}

module.exports = parseOptions
},{}]},{},[11]);
