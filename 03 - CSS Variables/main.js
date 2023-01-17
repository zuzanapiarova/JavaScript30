const inputs = document.querySelectorAll('.controls input');

function handleUpdate(){
    //console.log(this.value); - this statement helped us see the value of each input when it was changed, we dont need it for function logic
    let suffix = this.dataset.sizing || ''; // print data-sizing attribute value or nothing (if we dont add ||'', it would print undefined for the color and we dont want that)
    document.documentElement.style.setProperty(`--${this.name}`, this.value + suffix); // setProperty(propertyName, value)
        //this updates the actual variable to show the change we want:
        //document.documentElement returns the element that is the root of the document 
        //setProperty() method on CSSStyleDeclaration sets a new value for a property on a CSS style declaration object 
}

inputs.forEach(input => input.addEventListener('change', handleUpdate)); // this shows us what value each input has after it was changes
