import {budget} from '../js/budget.js';


class UXList {
    constructor(_list) {
        this.myList = _list;
        this.itemName = document.getElementById('item-name');
        this.itemPrice = document.getElementById('item-price');
        this.budgetFeedback = document.querySelector(".budget-feedback");
        this.addedGroceries = [];
        this.id = 0;
        this.groceryQuantity = document.getElementById('item-quantity');
    }
    
    // static test function -,-
    static createLiItem(item) {
        const li = document.createElement('li');
        li.textContent = item;

        return li;
    }
    
    submitGrocery = () => {
        const itemNameValue = this.itemName.value;
        const itemPriceValue = this.itemPrice.value;
        
        if (itemNameValue === '' || itemPriceValue === '' || itemPriceValue < 0) {
            this.budgetFeedback.classList.add('showItem');

            setTimeout(() => {
                this.budgetFeedback.classList.remove('showItem');
            }, 4000);
            
        } else {
            this.addItemsToList();

            this.itemPrice.value = '';
            this.itemName.value = '';
            this.groceryQuantity.value = 1;
        }
    }
    
    // push items in arr
    addItemsToList = () => {
        const groceries = {
            id: this.id,
            grocery: this.itemName.value,
            price: this.itemPrice.value * this.groceryQuantity.value,
            quantity:this.groceryQuantity.value
        }
        
        this.id++;
        this.addedGroceries.push(groceries);
        console.log(this.addedGroceries);

        // display all added groceries to UX
        this.appendGroceriesToUx(this.addedGroceries);
    }
    
    
    // UX Groceries function
    appendGroceriesToUx = (list) => {
        const li = document.createElement('li');
        li.classList.add('d-flex', 'justify-content-between', 'mt-3');

        for (const item of list) {
            // this.myList.appendChild(UXList.createLiItem(item.grocery));
            
            li.innerHTML = 
                `
                <div class="d-inline-flex flex-column">
                    <span>Grocery Name: ${item.grocery} </span>
                    <span class="">Grocery Price: $ ${item.price}</span>
                    <span class="">Grocery Quantity: ${item.quantity}</span>
                </div>

                <div>
                    <a href="#" class="edit-icon d-inline-block w-25 text-right mr-3" data-id="${item.id}">
                        <i class="fa fa-edit"></i>
                    </a>

                    <a href="#" class="delete-icon d-inline-block w-25 text-right" data-id="${item.id}">
                        <i class="fa fa-trash"></i>
                    </a>
                </div>
                `
            this.myList.appendChild(li);
        }
    }

    // delete grocery
    deleteGrocery = item => {
        const id = parseInt(item.dataset.id);
        const groceryItem = item.parentElement.parentElement;

        // delete from ux;
        this.myList.removeChild(groceryItem);      
        
        // delete from list arr;
        const tempListGroceries = this.addedGroceries.filter(item => {
            return item.id !== id;
        });

        this.addedGroceries = tempListGroceries;
        console.log(this.addedGroceries);
        
    }

    // edit grocery
    editGrocery = item => {
        // item is the 'a' element
        // item.parentElement.parentElement = li element (childNodes['de care o fi']);
        
        const id = parseInt(item.dataset.id);
        const groceryItem = item.parentElement.parentElement;

        // delete from ux;
        this.myList.removeChild(groceryItem);

        // delete from list arr;
        const tempListGroceries = this.addedGroceries.filter(item => {
            return item.id !== id;
        });
        
        // return the specific item
        const editGrocery  = this.addedGroceries.filter(item => {
            return item.id === id;
        })
        
        // show value
        this.itemName.value = editGrocery[0].grocery;
        this.itemPrice.value = editGrocery[0].price;
        this.groceryQuantity.value = editGrocery[0].quantity

        this.addedGroceries = tempListGroceries;
        console.log(this.addedGroceries);

    }

};


function eventListeners() {
    const actions = document.getElementById('list');
    const addItem = document.getElementById('myForm');
    const list = document.getElementById('list');
  
    // class init
    const ux = new UXList(list, 10);
         

    // append item;
    addItem.addEventListener('submit', function(event){
        event.preventDefault();
        ux.submitGrocery();
    })


    // actions (delete + edit)
    actions.addEventListener('click', function(event){
        if (event.target.parentElement.classList.contains('delete-icon')) {
            ux.deleteGrocery(event.target.parentElement);
        }

        if (event.target.parentElement.classList.contains('edit-icon')) {
            ux.editGrocery(event.target.parentElement);
        }
    });
};

document.addEventListener('DOMContentLoaded', function(){
    eventListeners();
});




export default UXList;