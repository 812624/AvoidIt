function display()
{
        var count;   
        chrome.storage.local.get(['count', 'time'], function(data){
        count = data.count;
        time = data.time;
        document.getElementById("result").innerHTML = "Time left for YouTube is " + (time-count) + " seconds";
        });    
}


document.addEventListener('DOMContentLoaded', display, false);
