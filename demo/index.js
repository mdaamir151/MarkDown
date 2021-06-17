const run = require('../main')

$(() => {

	let editor = $('#editor')[0]
    let view = $('#view')[0]
    let viewContent = $('#view-content')[0]
    console.log(editor)
    console.log(view)

    $('#editor').on("paste", function(e) {
        e.preventDefault();
        var text = e.originalEvent.clipboardData.getData("text/plain");
        console.log(text)
    })

    $('#render').on("click", function(e) {
        $(view).fadeToggle("fast")
        $(editor).fadeToggle("fast")
        $('#render-icon').toggleClass('fa-eye-slash fa-eye')
        let content = editor.innerText
        let v = run(content)
        view.innerHTML = ''
        view.appendChild(v)
    })

})