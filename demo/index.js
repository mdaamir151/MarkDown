const run = require('../main')

const clearSelection = function() {
    if (window.getSelection) {
        if (window.getSelection().empty) {  // Chrome
            window.getSelection().empty();
        } else if (window.getSelection().removeAllRanges) {  // Firefox
            window.getSelection().removeAllRanges();
        }
    } else if (document.selection) {  // IE?
         document.selection.empty();
    }
}

$(() => {

    let editor = $('#editor')[0]
    let view = $('#view')[0]
    let viewContent = $('#view-content')[0]

    editor.addEventListener('paste', (event) => {
        let paste = (event.clipboardData || window.clipboardData).getData('text');
        const selection = window.getSelection();
        if (!selection.rangeCount) return false;
        selection.deleteFromDocument();
        selection.getRangeAt(0).insertNode(document.createTextNode(paste));
        event.preventDefault();
        clearSelection();
    });


    $('#render').on("click", function(e) {
        $(view).fadeToggle("fast")
        $(editor).fadeToggle("fast")
        $('#render-icon').toggleClass('fa-eye-slash fa-eye')
        let content = editor.innerText
        let v = run(content)
        viewContent.innerHTML = ''
        viewContent.appendChild(v)
    })
    
    editor.addEventListener('focusout', function(e){
        if (editor.innerText.trim().length === 0) {
            editor.innerHTML = ""
        }
    });

})
