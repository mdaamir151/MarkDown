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