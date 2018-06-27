function edit() {

            var url = chrome.extension.getURL("ex.html");
            window.open(url);    
}

function check() {
    var url = chrome.extension.getURL("ex1.html");
    window.open(url);
}

var e1 = document.getElementById('edit');

if(e1)
{ 
    e1.addEventListener('click', edit);
}

var e2 = document.getElementById('check');
if(e2)
{ 
    e2.addEventListener('click', check);
}
