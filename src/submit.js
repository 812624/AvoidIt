function submit()
{
            alert("Data Submitted");
            alert("Do not close this Window!!");
	        var arrTime = [];
	        var arr = [];
            var Time = document.getElementById("time").value;
            var H = 0;
            H = parseInt(Time.substr(0, 2));
            var M = 0;
            M = parseInt(Time.substr(3, 2));
            var time = H * 60 * 60 + M * 60;     
            chrome.storage.local.set({'time' : time}, function()
            {});
            var count = 0;
           	chrome.storage.local.set({'count':count}, function() {               
            });             
            console.log(time);
            new1();
}

function new1()
{
            chrome.storage.local.get(['time'], function(data) {
            var time = data.time;
           	var x = "youtube.com";
           	var c = 0;
           	var count = 0;
           	var count24Hours = 0;
            console.log(count);
	        loopFor24Hours = setInterval(lookForTab, 6000);
	        function lookForTab()
	        {
	            console.log("Success");
	            count24Hours += 6;
	                
                chrome.tabs.query({}, function(tabs){
                     for(var i = 0; i < tabs.length; i++){
                            if(tabs[i].url.includes(x))
                            {
                                console.log("found");
                                chrome.storage.local.get(['count'], function(data)
                                {
                                    count = data.count;
                                });
                                    if(count < time-1)
                                      setTimer(time, count);
                                    else{
                                      console.log("Oops!! Time Out1");
                                      chrome.tabs.remove(tabs[i].id); 
                                      notifyTimeout();
                                    }
                                
                            }
                      }
                    });
                    if(count24Hours >= 86400)
                        clearInterval(loopFor24Hours);            
	        }
       });  
}

function startTimer(time, count)
{
    if(count < time-1){
        count += 6;
        console.log(count);
    }
    else
    {
        console.log("Oops!! Time Out2");
    }
    chrome.storage.local.set({'count':count}, function() {               
    });    
}

function setTimer(time, count)
{
    if(count < time-1){
    
        startTimer();
        function startTimer() {
          myInterval = setInterval(timerHandler, 1000);    
        }    
        
        function stopTimer() { 
            console.log("stopping timer");
            clearInterval(myInterval);   
          chrome.storage.local.set({'count':count}, function() {               
          });           
        }      
         
	    function timerHandler() {
              if(count >= time -1){
                stopTimer(); 	
              }
              else{
                  count++;
              }
          chrome.storage.local.set({'count':count}, function() {               
          });            
        }
    
   } 
   else{  
        console.log("Oops!! Time Out2");  
    }    
}
function notifyTimeout()
{
    var message = "Oops TimeOut!!!";
    chrome.notifications.create('REMINDER', {
        type: 'basic',
        iconUrl: 'timer.png',
        title: 'Oops TimeOut!!!',
        message: 'Time Limit has Exhausted'
    }, function(notificationId) {});
}

var e1 = document.getElementById('submit');
if(e1)
{ 
    e1.addEventListener('click', submit);
}

