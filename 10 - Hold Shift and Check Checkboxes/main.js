const checkboxes = document.querySelectorAll('input[type="checkbox"]');
//console.log(checkboxes);

let lastChecked;
function handleShift(e){
    //console.log(e);
    //TASK: check if they hold down shift AND are checking, not unckecking the field
    let isBetween = false;
    if(e.shiftKey && this.checked){
        checkboxes.forEach(checkbox => {
            //console.log(checkbox);
            if(checkbox == this || checkbox == lastChecked){
                isBetween = !isBetween;
            };
            if(isBetween){
                checkbox.checked = true;
            }
        })
    }
    lastChecked = this;
    //console.log(lastChecked);
}

checkboxes.forEach(checkbox => checkbox.addEventListener('click', handleShift));


