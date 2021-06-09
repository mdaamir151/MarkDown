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