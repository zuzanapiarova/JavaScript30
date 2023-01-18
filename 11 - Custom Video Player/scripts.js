// we will do this in 3 steps
//1. get our dom elements
const player = document.querySelector('.player');
const video = document.querySelector('.viewer');
const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.progress__filled')
const playButton = document.querySelector('.toggle');
const fullscreenButton = document.querySelector('.fullscreen');

const ranges = document.querySelectorAll('input[type="range"]');
const skipButtons = document.querySelectorAll('[data-skip]');

//2. build our functions
function togglePlay(){
    if(video.paused){
        video.play()
    } else {
        video.pause()
    };
}

function updateButton(){
    const icon = this.paused ? '►' : '||'
    playButton.innerHTML = icon;
}

function skip(){
    //console.log(this.dataset);
    video.currentTime += parseFloat(this.dataset.skip); //need to parse it from string to number 
}

function handleRangeUpdate(){
    console.log(this.name); //displays what is being updated
    console.log(this.value); //displays current value of the slider to the console
    video[this.name] = this.value; 
    //video elements in HTML have attributes volume and playBackRate that change the videos volume and playbackRate based on their value- <video volume='...' playbackRate='...' />
    //so for our html slider that changes volume, we assign it an attribute of name='volume', so the name matches the videos volume attribute: <input name='volume'/>
    //do the same with playbackRate: <input name='playbackRate'/>
    //so when we want to assign videos volume/playbackRate attribute, we do it like this:
    // video[attributeName] = value;
        //attributeName is the name of the slider that is being updated - this.name
        //value is the concrete value of the slider with corresponding name(volume/playbackSpeed)) - this.value
}

function handleProgress(){
    const videoPercent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${videoPercent}%`; 
}

function handleProgressManually(e){
    console.log(e);
    const manualProgress = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = manualProgress;
}

function fullscreen() {  // this function enters or exits the fullscreen as needed- fire this function on click on the element ou want, in my case fullscreenButton
    var isInFullScreen = (document.fullscreenElement && document.fullscreenElement !== null) ||
        (document.webkitFullscreenElement && document.webkitFullscreenElement !== null) ||
        (document.mozFullScreenElement && document.mozFullScreenElement !== null) ||
        (document.msFullscreenElement && document.msFullscreenElement !== null);

        //player is the element i want to enter fullscreen, it must be defined from the dom somewhere above this function
    if (!isInFullScreen) {
        if (player.requestFullscreen) {
            player.requestFullscreen();
        } else if (player.mozRequestFullScreen) {
            player.mozRequestFullScreen();
        } else if (player.webkitRequestFullScreen) {
            player.webkitRequestFullScreen();
        } else if (player.msRequestFullscreen) {
            player.msRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    }
}  //when requesting fullscreen it must be fired on the element we want in fullscreen, but when exiting fullscreen it must be fired on the entire document

//3. hook our functions to event listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress); //updates the progress bar with time when the video is running, event 'progress' does the same
playButton.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
ranges.forEach(range => range.addEventListener('change', handleRangeUpdate));


progress.addEventListener('click', handleProgressManually);
let mousedown=false;
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
progress.addEventListener('mousemove', (e) => mousedown && handleProgressManually(e)); // this anonymous function checks if the first passed in thing is true - mousedown
                                                                                        //if it is true it moves and executes the second thing - handleProgressManually
                                                                                        //initial handleEventManually requires an event, so we need to pass it into the function and into the event listener that handles it 
fullscreenButton.addEventListener('click', fullscreen);