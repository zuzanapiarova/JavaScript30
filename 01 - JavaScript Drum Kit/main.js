function playSound(e) {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`); 
    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`); 
    if(!audio) return; //stop the function from executin when there is no audio for that key, bs keys with no audio will show null
    key.classList.add('playing');
    audio.currentTime = 0;  // always rewinds the audio to start when hitting the key 
    audio.play();
}

function removeTransition(e){
    if(e.propertyName !== 'transform') return; //skip if it not a transform css property
    this.classList.remove('playing');
}

const keys = Array.from(document.querySelectorAll('.key'));
keys.forEach(key => key.addEventListener('transitionend', removeTransition));
console.log(keys);

window.addEventListener('keydown', playSound); // no () after calling the function in event listeners!! 