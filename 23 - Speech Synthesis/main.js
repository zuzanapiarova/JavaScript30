//speech synthesis API comes in most browsers
//speechSynthesis() returns an object that allows the browser to read a text
//but this text must have some speech properties, and we set these properties with SpeechSynthesisUtterance()
const msg = new SpeechSynthesisUtterance(); 
//console.log(msg) to see all different properties of SpeechSynthesisUtterance object
// we care about the text and voice properties of SpeechSynthesisUtterance

let voices = []; // we will populate this with all different kinds of voices available
const voicesSelection = document.querySelector('[name="voice"]');
const options = document.querySelectorAll('[type="range"], [name="text"]');
const speakButton = document.querySelector('#speak');
const stopButton = document.querySelector('#stop');

//set the text property of the speech synthesis object to what is typed in our textarea field
msg.text = document.querySelector('[name="text"]').value;

function populateVoices(){
    voices = this.getVoices(); //speechSynthesis.voices property will get all possible voices that the browser offers
    console.log(voices);
    const voiceOptions = voices.map(voice => `<option value=${voice.name}>${voice.name} (${voice.lang})</option>`).join('');
    voicesSelection.innerHTML = voiceOptions;
}

function setSelectedVoice(){
    msg.voice = voices.find( voice => voice.name === this.value);
    toggle();
}

function toggle(startOver = true){
    speechSynthesis.cancel();
    if(startOver){
    speechSynthesis.speak(msg);
    }
}

speechSynthesis.addEventListener('voiceschanged', populateVoices);
voicesSelection.addEventListener('change', setSelectedVoice);