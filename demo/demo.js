const run = require('../main')

window.onload = function() {
	let view = document.getElementById('main-view')
	let editText = document.getElementById('edit-text')

	const updateView = function() {
		let content = editText.value
 		let v = run(content)
 		view.innerHTML = ''
 		view.appendChild(v)
	}

	editText.addEventListener('blur', (event) => {
 		updateView()
	});

	updateView()
}