const addItems = document.querySelector('.add-items');
const itemsList = document.querySelector('.tapasItems');
const itemsArray = JSON.parse(localStorage.getItem('items')) || [];

function addItem(e){
    e.preventDefault();
    const tapasItem = this.querySelector('.tapas-item').value; //itemName variable will save whatever the user typed in but only until the page refreshes
                    // we can call .this because the event targets the form, so .this will be the form
                    // .value is the html value saved in form in element with class tapas-item
    const item = {   //this item will save the thing user typed in and also if it is checked (originally it is not checked)
        itemName: tapasItem,
        isChecked: false
    }

    itemsArray.push(item); //add the typed in thing into an array of all typed in things before
    populateList(itemsArray, itemsList); //everytime we add an item, it will run populateList function that adds the item into html so the item will show thanks to this function
    localStorage.setItem('items', JSON.stringify(itemsArray)); //this will save our items 
    this.reset(); // reset will reset the whole form when clicked submit
}

function populateList(dishes = [], dishesList){  //populateList visually updates the html with save itemsArray
    dishesList.innerHTML = dishes.map((dish, i) => {
        return ` 
            <li>
                <input type='checkbox' data-index='${i}' id='item${i}' ${dish.isChecked ? 'checked' : ''}/>
                <label for='item${i}'>${dish.itemName}</label> 
            </li>
        `;         //input with id=item(i) and label with for=item(i) make possible to link the input to the label
    }).join('');
}

//event delegation - rather than making the children listen for an event, make the poarent listen for the event because they are 'more responsible' and when the parent hears an event it tells the children and the child does an action

function toggleCheck(e){
    const targetedElement = e.target;
    if(!targetedElement.matches('input')) return; //if the target does not match element 'input', the function does nothing
    const index = targetedElement.dataset.index;
    itemsArray[index].isChecked = !itemsArray[index].isChecked; //set teh isChecked to opposite of what it is now
    localStorage.setItem('items', JSON.stringify(itemsArray));
    populateList(itemsArray, itemsList);
}  
addItems.addEventListener('submit', addItem);
itemsList.addEventListener('click', toggleCheck);


populateList(itemsArray, itemsList);