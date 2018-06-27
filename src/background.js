chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
    if(request.message == "submit")
    {
        submit();
    }
});

