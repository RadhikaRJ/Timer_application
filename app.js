//watch is Javascript object that has the initialisation as well as all the control functions defined in it.
//Execution begins when window.addEventListener has completed the load action & gives a call to the watch.init function
//Watch. initi function, based on user action, performs the start & stop actions.
var watch = { 

 timeDisplay : null,
 btnReset : null,
 btnStartStop : null,

 //initialization
 init : function(){

    //establish reference with HTML element IDs
    watch.timeDisplay = document.getElementById("displayTime");
    watch.btnReset = document.getElementById("reset");
    watch.btnStartStop = document.getElementById("start-stop");

    //Enable the button controls
    watch.btnStartStop.addEventListener("click", watch.start);
    watch.btnStartStop.disabled = false;

    watch.btnReset.addEventListener("click", watch.reset);
    watch.btnReset.disabled = false;
 },

 //timerAction
 timer : null,
 now :0,
 tick: function(){
     watch.now++;
     var remain = watch.now;

     //calculate seconds in terms of hours
     var hours = Math.floor( remain/3600);
     //calculate seconds remained after hours are extracted from it
     remain -= hours * 3600;
     
     //calculate minutes after hours are extracted from the remaining seconds
     var mins = Math.floor(remain/60);
     //calculate seconds remaining after minutes are extracted
     remain -= mins *60;

    //assign remaining seconds to secs variable 
     var secs = remain;

     //Display update
     if(hours<10) {
         hours = "0"+hours;
     }
     if(mins<10){
         mins = "0"+mins;
     }
     if(secs<10){
         secs="0"+secs;
     }

     //display in HTML
     watch.timeDisplay.innerHTML = hours + ":" + mins + ":" + secs;

 },

 start : function(){
     watch.timer = setInterval(watch.tick,1000);
     watch.btnStartStop.innerHTML = "Stop";
     watch.btnStartStop.removeEventListener("click",watch.start);
     watch.btnStartStop.addEventListener("click",watch.stop);
 },

 stop : function(){
     clearInterval(watch.timer);
     watch.timer = null;
     watch.btnStartStop.innerHTML ="Start";
     watch.btnStartStop.removeEventListener("click",watch.stop);
     watch.btnStartStop.addEventListener("click", watch.start);
 },

 reset : function(){
     if(watch.timer!=null){
         watch.stop();
     }
     watch.now=-1;
     watch.tick();
 }

};

window.addEventListener("load",watch.init);