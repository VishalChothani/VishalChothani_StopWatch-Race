// Declaring class "Timer"
var StopWatch = function()
{     
    var seconds1 = 0;
    var minutes1 = 0;
    var hours1 = 0;
    var day1 = 0;

    var startTime = 0;
    var endTime = 0;

    day1_text = document.getElementById('day1');
    hour1_text = document.getElementById('hour1');
    minute1_text = document.getElementById('minute1');
    second1_text = document.getElementById('second1');

    // Property: Frequency of elapse event of the timer in millisecond
    this.Interval = 1000;
    
    // Property: Whether the timer is enable or not
    this.Enable = new Boolean(false);
    
    // Event: Timer tick
    this.Tick;
    
    // Member variable: Hold interval id of the timer
    var timerId = 0;
    
    // Member variable: Hold instance of this class
    var thisObject;

    var mili_value = 0;
    var log_value = 0;
    
    // Function: Start the timer
    this.Start = function(call_number)
    {                
        this.Enable = new Boolean(true);

        thisObject = this;
        
        if (thisObject.Enable)
        {
            startTime = new Date().getTime();
            
            if(call_number === 1){    

                // Setting interal every 1 sec (1000 ms)
                thisObject.timerId = setInterval(
                function()
                {
                    log_value = seconds1;
                    seconds1++;
                    if (seconds1 >= 60) 
                    {
                        seconds1 = 0;
                        minutes1++;
                        if (minutes1 >= 60) 
                        {
                            minutes1 = 0;
                            hours1++;
                            if (hours1 >= 24) 
                            {
                                hours1 = 0;
                                day1++;
                            }
                        }
                    }

                    day1_text.textContent = day1 ? (day1 > 9 ? day1 : "0" + day1) : "00";
                    hour1_text.textContent = (hours1 ? (hours1 > 9 ? hours1 : "0" + hours1) : "00");
                    minute1_text.textContent = (minutes1 ? (minutes1 > 9 ? minutes1 : "0" + minutes1) : "00");
                    second1_text.textContent = (seconds1 > 9 ? seconds1 : "0" + seconds1);

                }, thisObject.Interval);
            }
        }
    };
    
    // Function: Stops the timer
    this.Stop = function(call_number)
    {           
        endTime = new Date().getTime();
        thisObject.Enable = new Boolean(false);
        clearInterval(thisObject.timerId);
        
        if(call_number === 1)
            this.Log(endTime - startTime);
    };

    // Function: Reset the timer
    this.Clear = function()
    {            

        seconds1 = 0;
        minutes1 = 0;
        hours1 = 0;
        day1 = 0;

        day1_text.textContent = "00";
        hour1_text.textContent = "00";
        minute1_text.textContent = "00";
        second1_text.textContent = "00";

        log_value = 0;

        thisObject.Enable = new Boolean(false);
        clearInterval(thisObject.timerId);        

        this.Log(0);
        
    };

    this.Log = function(new_value){
        
        log_value = log_value + new_value;

        while(log_value>1000){
                log_value = Number(log_value) - 1000;
        }

        document.getElementById("log_text").value = log_value;
    }

    this.RaceLog = function(){
        if(startTime === 0 || endTime === 0){
            return "Not started yet";
        }
        else {
            return(endTime - startTime)/1000;
        }
    }


};

// Intial settings
var obj = new StopWatch();
show("start1");
hide("stop1");
hide("clear1");

hide("stop_summet");
hide("stop_travis");    
hide("stop_harshit");    
    
document.getElementById("start1").addEventListener("click",function(e) {
    obj.Start(1);
    hide("start1");
    show("stop1");
    show("clear1");        
});

document.getElementById("stop1").addEventListener("click",function(e) {
    obj.Stop(1);
    show("start1");
    hide("stop1");
    show("clear1");        
});

document.getElementById("clear1").addEventListener("click",function(e) {
    obj.Clear();
    show("start1");
    hide("stop1");
    hide("clear1");
});

function hide(id){
    document.getElementById(id).disabled = true;
}

function show(id){
    document.getElementById(id).disabled = false;
}


function Racer(name) {
    this.name = name;
    this.StopWatch = new StopWatch();
    Racer.all.push(this);
}

Racer.all = [];
Racer.counter = 0;

Racer.all.start = function() {
    for (var i = 0; i < Racer.all.length; i++) {
        Racer.all[i].start();
    }
};

Racer.all.stop = function(i) {
    console.log(Racer.all[i].name);
    Racer.all[i].stop();
};

Racer.getWinners = function() {
    var found = Racer.all[0];
    
    for (var i = 0; i < Racer.all.length; i++) {
        if (Racer.all[i].log() < found.log()){            
            found = Racer.all[i];            
        }
    }
    return found;  
};

Racer.prototype.start = function(){
    this.StopWatch.Start(2);
    return this;
};

Racer.prototype.stop = function() {
    this.StopWatch.Stop(2);
    return this;
};

Racer.prototype.log = function() {
    return this.StopWatch.RaceLog();
};

Racer.countMembers = function(){
    
    console.log(Racer.counter);
    Racer.counter = Number(Racer.counter) + 1;
    
    if(Racer.counter > 2){
        var getWinner = Racer.getWinners();
        console.log(JSON.stringify(getWinner));
        document.getElementById("winner_log_text").value = getWinner.name;
    }
}


document.getElementById("start_all").addEventListener("click",function(e) {
    sumit = new Racer("Sumit");
    travis = new Racer("Travis");    
    harshit = new Racer("Harshit");

    Racer.all.start();    
    
    show("stop_summet");
    show("stop_travis");    
    show("stop_harshit");    

    document.getElementById("start_all").style.backgroundColor = "#ab6bd0";  
    Racer.counter = 0;  
    document.getElementById("winner_log_text").value = "";

    document.getElementById("stop_summet").style.backgroundColor = "#fff";
    document.getElementById("stop_travis").style.backgroundColor = "#fff";
    document.getElementById("stop_harshit").style.backgroundColor = "#fff";
});

document.getElementById("stop_summet").addEventListener("click",function(e) {
    Racer.all.stop(0);
    document.getElementById("stop_summet").style.backgroundColor = "red";
    hide("stop_summet");
    Racer.countMembers();
});

document.getElementById("stop_travis").addEventListener("click",function(e) {
    Racer.all.stop(1);
    hide("stop_travis");    
    document.getElementById("stop_travis").style.backgroundColor = "red";
    Racer.countMembers();
});

document.getElementById("stop_harshit").addEventListener("click",function(e) {
    Racer.all.stop(2);
    hide("stop_harshit");    
    document.getElementById("stop_harshit").style.backgroundColor = "red";
    Racer.countMembers();
});

