const triggers = document.querySelectorAll('.navOptions > .option')//will trigger the white background to unfold with options
const whiteBackground = document.querySelector('.whiteBackground');
const nav = document.querySelector('nav');

function handleEnter(){
    this.classList.add('trigger-enter');
    setTimeout(() => this.classList.contains('trigger-enter') && this.classList.add('trigger-enter-active'), 200);
    whiteBackground.classList.add('open');

    const dropdown = this.querySelector('.dropdown');
    const dropdownDimensions = dropdown.getBoundingClientRect();
    const navDimensions = nav.getBoundingClientRect();

    const backgroundDimensions = {
        height: dropdownDimensions.height,
        width: dropdownDimensions.width,
        top: dropdownDimensions.top - navDimensions.top,
        left: dropdownDimensions.left - navDimensions.left 
    };

    whiteBackground.style.setProperty('width', `${backgroundDimensions.width}px`);
    whiteBackground.style.setProperty('height', `${backgroundDimensions.height}px`);
    whiteBackground.style.setProperty('transform', `translate(${backgroundDimensions.left}px, ${backgroundDimensions.top}px)`);
   

};

function handleLeave(){
    this.classList.remove('trigger-enter', 'trigger-enter-active');    
    whiteBackground.classList.remove('open');
}

triggers.forEach(trigger => trigger.addEventListener('mouseover', handleEnter));
triggers.forEach(trigger => trigger.addEventListener('mouseout', handleLeave));