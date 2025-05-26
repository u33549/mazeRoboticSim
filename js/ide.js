const cEditor = ace.edit("editor");
cEditor.setTheme("ace/theme/twilight");
cEditor.session.setMode("ace/mode/javascript");
cEditor.session.setUseSoftTabs(true);
cEditor.resize()




// function init(){
    
   
// }
// window.addEventListener("load", init, false);

function reloadElement() {
    var elementToReload = document.getElementById("reloadable-element");

    var newElement = elementToReload.cloneNode(true);
    elementToReload.parentNode.replaceChild(newElement, elementToReload);
} 
function runCode(){
    var code = cEditor.getValue();
    const runScript = document.querySelector("#runCodeScript");

    // console.log(code);
    // eval(code);

    console.log(runScript)
    // runScript.textContent =`<;>${code}</script>`;
    runScript.textContent =code;



    
}