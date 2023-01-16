let secondHand = document.querySelector('.second');
let minuteHand = document.querySelector('.minute');
let hourHand = document.querySelector('.hour');

let digitalTime = document.querySelector('.digital--time');

function setDate(){
    let now = new Date();  //new Date() creates a new date object with current date and time

    let seconds = now.getSeconds();
    let secondsDegrees = (seconds * 360) / 60;
    secondHand.style.transform = `rotate(${secondsDegrees}deg)`;
    if (secondsDegrees === 0) {
        secondHand.style.transition = 'all 0s'
    };

    let minutes = now.getMinutes();
    let minuteDegrees = (minutes * 360 / 60) + (seconds * (360 / 60) / 60); //turns minute hand smoothly not as ticks every minute
    minuteHand.style.transform = `rotate(${minuteDegrees}deg)`;
    if (minuteDegrees === 0) {   //makes the second hand not jump when transitioning from 0 sec to 1 sec ( 360 deg to 6 deg )
        minuteHand.style.transition = 'all 0s'
    };

    let hours = now.getHours();
    let hourDegrees = (hours * 360 / 12) + (minutes * (360 / 60) / 12); //turns hour hand smoothl not as ticks every hour
    hourHand.style.transform = `rotate(${hourDegrees}deg)`;
    if (hourDegrees === 0) {
        hourHand.style.transition = 'all 0s'
    };


    let secondsString = seconds.toString();
    if(secondsString.length === 1){
        secondsString = `0${secondsString}`
    };
    let minutesString = minutes.toString();
    if(minutesString.length === 1){
        minutesString = `0${minutesString}`
    };
    let hoursString = hours.toString();
    if(hoursString.length === 1){
        hoursString = `0${hoursString}`
    };

    digitalTime.innerHTML = `${hoursString}:${minutesString}:${secondsString}`;
}

setInterval(setDate, 1000); //gets current time every 1 second

setDate();