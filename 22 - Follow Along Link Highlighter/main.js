const links = document.querySelectorAll('a');
const highlight = document.createElement('span');
highlight.classList.add('highlight');
document.body.append(highlight);

function highlightLink(){
    const linkPosition = this.getBoundingClientRect();//this method gives us information about where on the page the link is positioned
    //console.log(linkPosition); //variable linkPosition saved the data about links position on page, so log it to see what all information it stores
    //but as we scroll down the top/bottom -their x changes so we need to account for that:
    // run this in console to see the offset from top: window.scrollY
    const highlightPosition = {
        width: linkPosition.width,
        height: linkPosition.height,
        top: linkPosition.top + window.scrollY,
        left: linkPosition.left + window.scrollX
    }
    
    highlight.style.width = `${highlightPosition.width}px`;//the highlight on each element must be as wide and high as each element
    highlight.style.height = `${highlightPosition.height}px`;
    highlight.style.transform =`translate(${highlightPosition.left}px, ${highlightPosition.top}px)`; //ensure smooth transition when going form link to link

}

function wait(){
    console.log('i waited');
}

links.forEach(link => link.addEventListener('mouseenter', highlightLink));