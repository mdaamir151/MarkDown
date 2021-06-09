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