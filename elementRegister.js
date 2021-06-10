const h = require('./Elements/h')
const f = require('./Elements/format')
const mix = require('./Elements/mix')
const line = require('./Elements/line')
const quote = require('./Elements/quote')
const list = require('./Elements/list')
const link = require('./Elements/link')
const table = require('./Elements/table')
const image = require('./Elements/image')

//key is regex string
const elements = {
	'h|h1|h2|h3' : h,
	'f': f,
	'b|d|u|i|p|c': mix,
	'l': line,
	'q': quote,
	'ol|ul|li': list,
	'ln': link,
	'tb|tr|th': table,
	'im': image,
}

module.exports = elements