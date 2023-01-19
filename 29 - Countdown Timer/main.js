let countdown;
const timeLeft = document.querySelector('.display__time-left');
const timeEnd = document.querySelector('.display__time-end');
const timerButtons = document.querySelectorAll('[data-time]');

function timer(seconds){  //do it like this with setInterval inside for the function to run also when you leave the window for a longer time
    //clear any existing running timers before any timer is set
    clearInterval(countdown);
    const now = Date.now();
    console.log(seconds);
    const then = now + seconds * 1000;
    displayTimeLeft(seconds); //fire the function once right after we start the timer
    displayEndTime(then);

    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        if(secondsLeft < 0){
            clearInterval(countdown);
            return;
        }
        console.log(secondsLeft)
        displayTimeLeft(secondsLeft); //fire the function one second later also because the setInterval makes it start only one second later
    })
};

function displayTimeLeft(seconds){
    const minutes = Math.floor(seconds / 60);
    const secondsRemaining = seconds % 60;
    const timeDisplay = `${minutes < 10 ? '0' : ''}${minutes}:${secondsRemaining < 10 ? '0' : ''}${secondsRemaining}`;
    timeLeft.textContent = timeDisplay;
    document.title = timeDisplay;
}

function displayEndTime(timestamp){
    const end = new Date(timestamp);
    const hours = end.getHours();
    const minutes = end.getMinutes();
    timeEnd.textContent = `Be back at ${hours}:${minutes}`;
}

function startTimer(){
    //console.log(this.dataset.time); //this.dataset.time shows number of seconds we set for each button
    const timerSeconds = parseInt(this.dataset.time);
    console.log(timerSeconds);
    timer(timerSeconds);

}

timerButtons.forEach(button => button.addEventListener('click', startTimer));

document.customForm.addEventListener('submit', function(e){
    e.preventDefault();
    const mins = this.minutes.value; //must enter a number lol
    timer(mins * 60);
    this.reset();
})