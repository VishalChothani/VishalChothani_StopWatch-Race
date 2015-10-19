var seconds1 = 0;
var minutes1 = 0;
var hours1 = 0;
var day1 = 0;

function initalize()
{

    document.getElementById('stop1').disabled = true;    
    document.getElementById('clear1').disabled = true;

    day1_text = document.getElementById('day1');
    hour1_text = document.getElementById('hour1');
    minute1_text = document.getElementById('minute1');
    second1_text = document.getElementById('second1');
    
    start1 = document.getElementById('start1');
    stop1 = document.getElementById('stop1');
    clear1 = document.getElementById('clear1');

    t1 = null;

    /* Start button */
    start1.onclick = function() 
    {
        timer1();
        document.getElementById('start1').disabled = true;
        document.getElementById('stop1').disabled = false;
        document.getElementById('clear1').disabled = false;
    }

    /* Stop button */
    stop1.onclick = function() 
    {
        clearTimeout(t1);
        document.getElementById('stop1').disabled = true;
        document.getElementById('start1').disabled = false;
        document.getElementById('clear1').disabled = false;
    }

    /* Clear button */
    clear1.onclick = function() 
    {
        day1 = 0; seconds1 = 0; minutes1 = 0; hours1 = 0;
        clearTimeout(t1);
        document.getElementById('start1').disabled = false;
        document.getElementById('clear1').disabled = true;
    }

    function validNumeric(input)  
    {  
        var numbers = /^[0-9]+$/;  
        if(input.match(numbers))  
        {  
            return true;  
        }  
        else  
        {                          
            return false;  
        }  
    }       

    
}



function add() 
{        
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
    
    timer1();
}



function timer1() 
{
    t1 = setTimeout(add, 1000);
}
