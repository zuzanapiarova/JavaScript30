//also run this at a local host: go to this directory in command line > npm install > npm start > local host > index.html
//speech recognition is a global variable that lives in the browser on top of the window html element
//as we learned before with the video player in each browser it can live somewhere else not directly in window so put webkit there to apply this to other browsers
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition; 

//create new instances of speech recognition:
const recognition = new SpeechRecognition();
recognition.interimResults = true; //must be true so the speech is showing as we speak and not only after we are finished speaking

//a longer pause separates different recognitions and each recognition is going to be saved in a separate paragraph
let newPara = document.createElement('p');
const words = document.getElementById('words');
words.appendChild(newPara);//words is a div enclosing all p children, and when new speech is detected it will add a new p in words

recognition.addEventListener('result', (e) => {
    //console.log(e.results); //results is a event property that displays in this case result of speech recognition
    //e.results will give us a result list, what is similar to array but not the same methods - like a nodelist
    //after you open it enough times you will see the recorded speech under key 'transcription'
    //and we can also see confidence in % and based on that isFinal - the browser decides if the detected speech has enough credibility
    //tall possible detected results are stored in an array - so we can access them by indexes
    const transcript = Array.from(e.results)//converting the result list into an array
    //map over the result to get whatever nested property we want
    .map( result => result[0]) //select the first detected item
    .map( result => result.transcript) //select the transcript property that saves the actual words
    .join(''); //join the array of final words into a string
    newPara.textContent = transcript;

    if(e.results[0].isFinal){ //if the person stopped speaking
        newPara = document.createElement('p');// create a new paragraph for when person speaks again
        words.appendChild(newPara);
    }
    
    //here we can actually listen for specific things a person says !!!! and do different things based on that
    if(transcript.includes('dog')){
        newPara.style.backgroundColor = 'brown';
    };
    if(!transcript.includes('dog')){
        newPara.style.backgroundColor = '';
    }
    //or even hook it up with functions ets
    //this is how SIRI and ALEXA work!!!
})

recognition.addEventListener('end', recognition.start); //so when w stop speaking, start new speech recognition

recognition.start(); // we start the speech detection process