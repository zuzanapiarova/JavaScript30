//the carousel should move left-right based on the movement of the mouse
//the mouse must be clicked in order to move the carousel

const slider = document.querySelector('.items');
let isDown = false;
let startX; //startX will save the initial click down of the mouse and count distance to the left/right of this point
let scrollLeft;

slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.classList.add('active');
    startX = e.pageX  - slider.offsetLeft; //this saves the position of the mouse every time it clicks
    scrollLeft = slider.scrollLeft;

});
slider.addEventListener('mouseleave', () => {
    isDown = false;
    slider.classList.remove('active');

} );
slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.classList.remove('active');

} );
slider.addEventListener('mousemove', (e) => {
    if(!isDown) return; //stop the function from running if the mouse is now clicked down
    e.preventDefault(); //will stop any default behavior that teh browser does at this event - so prevent any behavior when moving the mouse like highlighting the text
    const x = e.pageX  - slider.offsetLeft; //this saves the position of the mouse every time it moves
    console.log({startX, x});
    let movedDistance = x - startX; //how many pixels to the right we moved from the initial click(to the left are -)
    movedDistance = movedDistance * 3; // for every 1px moved by mouse the slider will move 3px not 1px
    console.log(movedDistance);
    slider.scrollLeft = scrollLeft - movedDistance;
});
