const run = require('../main')

window.onload = function() {
    let view = document.getElementById('main-view')
    let editText = document.getElementById('edit-text')
    editText.addEventListener('keydown', function(e) {
        if (e.key == 'Tab') {
            e.preventDefault();
            let start = this.selectionStart;
            let end = this.selectionEnd;
            this.value = this.value.substring(0, start) + "\t" + this.value.substring(end);
            this.selectionStart = this.selectionEnd = start + 1;
        }
    })

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