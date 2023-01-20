const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
const startButton = document.querySelector('#start-game')
let lastHole;
let timeUp;
let score = 0;

function randomTime(min, max){
    return Math.round(Math.random() * ( max - min) + min);
}

function randomHole(holes){
    const randomIndex = Math.floor(Math.random() * holes.length);
    const hole = holes[randomIndex];
    if(hole === lastHole){
       return randomHole(holes); // if we got the same random number twice in a row don't save it just run the function again so we get a new number
    }

    lastHole = hole;
    return hole; // at the end of every function save the hole we got as a last hole
}

function moleOut(){
    const time = randomTime(200, 1000); //for this many milliseconds wil the mole be out
    const hole = randomHole(holes); //out of this hole the mole will peep out
    //console.log(time, hole);
    hole.classList.add('moleUp'); //this will trigger the css to move the mole out of the hole
    setTimeout(() => {
        hole.classList.remove('moleUp');  // after the time has passed put the mole back down by css
        if(!timeUp) moleOut();// AND after the time passed also run the function again, but only if the time is not up
    }, time);
}

function startGame(){
    scoreBoard.textContent = 0;//reset the score board
    timeUp = false;
    score = 0; //make sure the score is 0 each time the game is started
    moleOut();
    setTimeout(() => timeUp = true, 10000); // after 10 seconds stop the game
}

function hit(e){
    console.log(e);
    if(!e.isTrusted) return;// isTrusted is event property and when it is true it means click was real and not faked using javascript - so we do not count simulated clicks - fake clicks have isTrusted=false
    score++; //after you click on the mole increase the score by 1
    this.classList.remove('moleUp'); //hide the mole the second it is clicked
    scoreBoard.textContent = score;

}


moles.forEach( mole => mole.addEventListener('click', hit))
startButton.addEventListener('click', startGame);

//how to improve the game: add a score out of ... - count how many moles showed during those 10 seconds the game lasted or add levels where the time for each mole out is lower or save the scoreboard and name of player into some storage