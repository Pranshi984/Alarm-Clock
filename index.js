// Global variables and objects //

const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var timer =[];
var i = 0;

var alarms_ul = document.getElementById('alarms_ul');


// Display clock function //
let displayClock = () => {
    let today = new Date();
    let hours = today.getHours();
    let minutes = today.getMinutes();
    let seconds = today.getSeconds();
    let format = hours < 12 ?"A.M" :'P.M';
    let clock = document.getElementById('clock');
    let currentHour = hours < 10 ? '0' + hours : hours ;
    //Insert current time to the clock div as innerHTML
    clock.innerHTML = `
    ${hours > 12 ? hours - 12 : currentHour }
    : ${minutes < 10 ? '0' + minutes : minutes}
    : ${seconds < 10 ? '0' + seconds : seconds}
    : ${format}
    `;
    //create a setTimeout to call displayClock function for Working Clock Display
    setTimeout(displayClock,1000);
}

let setAlarm = () => {
    let alarmsInput = document.getElementById('alarm_input');
    let alarm = alarmsInput.value;
    alarmsInput.value="";
    if(alarm!==""){
        let curr_time = new Date();
        //create alarm_time object
        let alarm_time = new Date(alarm);
        let duration = alarm_time - curr_time ;
        if(duration < 0){
            alert('Time has already passed');
        }else{
            displayAlarms(alarm_time);
            // console.log("remaining time in seconds",duration/1000);
            timer[i++] = setTimeout(() => {
            alert('Times up');
            console.log("Alarm Deleted");
             // remove the alarm from dom
             document.getElementById(alarm_time).remove();
             i--;

            },duration);

        }
    }else{
        alert('Select Alarm Time !!!')
    }

}

// Display Alarm List //
let displayAlarms = (time) => {
    
    //clear alarms_ul innerHTml to avoid already appened duplicated lists everytime a new alarm is added
    // create necessary variables for every alarm_time object in the array ...
    let alarmTime = time;
    let hours = alarmTime.getHours();
    let minutes = alarmTime.getMinutes();
    let seconds = alarmTime.getSeconds();
    let format = hours <12 ?"A.M" :'P.M';
    //create newLi tag to append to the alarms List
    let newLi = document.createElement('li');
    newLi.className = "alarms-li";
    newLi.id=  time;
    newLi.innerHTML = `
    <span class="fa-li"><i class="fas fa-bell fa-2x"></i></span>
    ${months[alarmTime.getMonth()]}
    ${alarmTime.getDate()} 
    @ 
    ${hours % 12 < 10 ? ("0" + (hours % 12)): (hours % 12)}:
    ${minutes<10 ? "0"+ minutes : minutes }:
    ${seconds<10 ? "0"+ seconds : seconds }:
    ${format} 
    <button  type="submit" onClick={deleteAlarm(${i})} class='deleteAlarm button'>Delete</button>    
    `;
    alarms_ul.appendChild(newLi);
}

//Delete Alarm function
let deleteAlarm = (index)=> {
   
    clearInterval(timer[index]);    
 
}

function removeAlarm(el){
    // console.log(el);
    if(el.classList.contains('deleteAlarm')){
      el.parentElement.remove();
    }

}
        //  Handle Events //  

//Hanlde DisplayClock
document.addEventListener('DOMContentLoaded ',displayClock());

//handle Add Alarm
document.querySelector('#submit_alarm_time').addEventListener('click',(e)=>{
    e.preventDefault();
    //Call setAlarm function
    setAlarm();
});

//handle delete alarm event for removing the li from thelist
document.getElementById('alarms_ul').addEventListener('click',(e)=>{

    removeAlarm(e.target); 
})
