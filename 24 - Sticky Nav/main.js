const nav = document.getElementById('navbar');
const navTop = nav.offsetTop; //vzdialenost vrchnej hrany navbar od vrchnej hrany stranky 
//window.scrollY je vzdialenost nasej polohy na stranke po scrollovani od vrchu stranky 
//ak je navTop od vrchu menej ako currentTop od vrchu, 

function stickNav(){
    const currentTop = window.scrollY;
    if(currentTop >= navTop){
        nav.classList.add('sticky');  //if i added the class sticky on the body encompasing everything, i could be changing also other elements when the navbar is sticky
    } else {
        nav.classList.remove('sticky');
    }
}


window.addEventListener('scroll', stickNav);
