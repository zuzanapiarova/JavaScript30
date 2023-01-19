const speed = document.querySelector('.speed');
const speedBar = document.querySelector('.speed-bar');
const video = document.querySelector('video');

function handleMove(e){
    const currentYPosition = e.pageY - this.offsetTop; //starting position of the mouse
    const speedHeight = this.getBoundingClientRect().height;
    const currentPercentage = Math.round((currentYPosition / speedHeight) * 100);
    speedBar.style.height = `${currentPercentage}%`;

    const minSpeed = 0.4; //minimum speed it can have
    const maxSpeed = 4; //max speed it can have
    console.log((currentPercentage/100) * (maxSpeed - minSpeed) + minSpeed)
    //round to one decimal place by toFixed(how many decimal places we want) or (Math.round(n * 10) / 10)
    const currentSpeed =  ((currentPercentage/100) * (maxSpeed - minSpeed) + minSpeed).toFixed(1);
    speedBar.textContent = `${currentSpeed}x`;
    video.playbackRate = currentSpeed

}

speed.addEventListener('mousemove', handleMove);


