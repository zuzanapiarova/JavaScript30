const text = document.querySelector('.text');
const innerText = text.querySelector('h1');
const shadowLength = 10; //100px is the shadow distance from top to bottom

function throwShadow(e){
    //const height = text.offsetHeight;
    //const width = text.offsetWidth; //we can type it together in one line like this:
    const { offsetWidth: width, offsetHeight: height } = text; //we will be taking the variable offsetWidth from text and saving it into width, same with offsetHeight
    let { offsetX: x, offsetY: y} = e;
    console.log(x,y); 

    // x,y su suradnice nasej mysky na text elemente ALE ked je myska zaroven na h1 elemente ktory je child text elementu, zrazu su x,y surandice mysky na tom h1 elemente, nie na text elemente ktory chceme
    //tato if statement zakaze myske brat suradnice z h1 elementu aj ked je nad nim, size jej prikazeme necg stale berie suradnice z text elementu
    if(this !== e.target){
        x = x + e.target.offsetLeft;
        y = y + e.target.offsetTop;
    }

    //these coordinates make the shadow be always the same height for top and bottom AND the shadow is closer when mouse is closer and further when mouse is further
    const shadowDistanceX = Math.round((x / width * shadowLength) - (shadowLength / 2));
    const shadowDistanceY = Math.round((y / height * shadowLength) - (shadowLength / 2));
    console.log(shadowDistanceX, shadowDistanceY);

    //now just assign the shadow into the style of our innerText element:
    //innerText.style.textShadow = (x coordinate of the shadow) (y coordinate of the shadow) blur color;
    innerText.style.textShadow = `${shadowDistanceX}px ${shadowDistanceY}px 0 red, ${shadowDistanceX * -1}px ${shadowDistanceY * -1}px 0 blue`;
};

text.addEventListener('mousemove', throwShadow);

