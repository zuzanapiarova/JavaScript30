//!!! when working with canvas always make sure the html canvas is loaded BEFORE the javascript - by defer or scripting js lower that canvas tag
const canvas = document.getElementById('canvas');
const context = canvas.getContext("2d"); //in html canvas we work with the context of the canvas, it can be 2d or 3d so we must set it 

canvas.width = window.innerWidth; //canvas is by default hardcoded in html so we change it here to fit the window
canvas.height = window.innerHeight; 

//setting properties for our drawing line/brush, you can browse different options for lineJoin and lineCap:
context.strokeStyle = '#BADA55'; //initial color of the line, can be changed after
context.lineJoin = 'round';  //when we end our line we want it to be round not square
context.lineCap = 'round'; //when our line crosses other line we want it to be rounded as well
context.lineWidth = 30;

let isDrawing = false; // means initially our cursor is not drawing when its not doing any action like click etc
let lastX = 0;  // a line needs two coordinates [x, y] for its start and end, so here we declare the end coordinates for the line
let lastY = 0;
let hue = 0;
let direction = true;

function draw(e){ //function draw takes in an event
    if(!isDrawing) return; //this will stop the function from executing if person is not drawing
    context.strokeStyle = `hsl(${hue}, 100%, 50%)`;
    context.beginPath();
    context.moveTo(lastX, lastY);
    context.lineTo(e.offsetX, e.offsetY); //offsetX, offsetY are coordinates coming from the actual event mousemove firing
    context.stroke();
    [lastX, lastY] = [e.offsetX, e.offsetY]; //same as if we set lastX = e.offsetX, lastY = e.offsetY;, must be here also
    
    //playing around with stroke color and width
    hue++;
    if(hue >= 360){
        hue = 0;
    };

    if(context.lineWidth >= 40 ||context.lineWidth <= 1){
        direction = !direction;
    };

    if(direction){
        context.lineWidth++;
    } else {
        context.lineWidth--;
    }

};

canvas.addEventListener('mousedown', (e) => {
    isDrawing = true;
    [lastX, lastY] = [e.offsetX, e.offsetY]; //must be also here to update everytime the mouse is pressed down, before the draw function starts

});

canvas.addEventListener('mousemove', draw);  //each mouse move has coordinates that we need if we want to declare start and end of the line
canvas.addEventListener('mouseup', () => isDrawing = false);
canvas.addEventListener('mouseout', () => isDrawing = false);
