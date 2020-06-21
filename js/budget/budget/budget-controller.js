const REMOVE_GROCERIES_BTN = document.getElementById('remove-all-groceries');


class BudgetController {
    constructor(_list) {
        this.addedGroceries = [];
        this.id = 0;
        this.CURRENT_TOTAL = 0;

        this.myList = _list;
        this.itemName = document.getElementById('item-name');
        this.itemPrice = document.getElementById('item-price');
        this.budgetFeedback = document.querySelector(".budget-feedback");
        this.groceryQuantity = document.getElementById('item-quantity');
        this.groceriesHolder = document.getElementById('list');
        this.sumHolder = document.getElementById('total');
    }
    
    // static test function -,-
    static createLiItem(item) {
        const li = document.createElement('li');
        li.textContent = item;

        return li;
    }
    
    removeAllGroceriesBtn = () => {
        this.groceriesHolder.innerHTML = '';
        this.addedGroceries = [];
        this.id = 0;

        if (this.addedGroceries.length == 0) {
            REMOVE_GROCERIES_BTN.classList.add('d-none');
        }
        this.CURRENT_TOTAL = 0;
        this.sumHolder.innerHTML = `TOTAL: <b>$${this.CURRENT_TOTAL}</b>`;
    }

    submitGrocery = () => {
        const itemNameValue = this.itemName.value;
        const itemPriceValue = this.itemPrice.value;
        
        if (itemNameValue === '' || itemPriceValue === '' || itemPriceValue < 0) {
            this.budgetFeedback.classList.remove('d-none');

            setTimeout(() => {
                this.budgetFeedback.classList.add('d-none');
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

        // display all added groceries to budget
        this.appendGroceriesTobudget(this.addedGroceries);

        // calculate TOTAL
        this.addSumGroceries();
        
    }
    
    
    // budget Groceries function
    appendGroceriesTobudget = (list) => {
        const li = document.createElement('li');
        li.classList.add('d-flex', 'justify-content-between', 'mt-3', 'grocery-item', 'border-bottom');
        
        for (const item of list) {
            // this.myList.appendChild(budgetList.createLiItem(item.grocery));
            
            li.innerHTML = 
                `
                <div class="d-inline-flex flex-column">
                    <span><b>${item.grocery}</b> </span>
                    <span class="">x <b>${item.quantity}</b></span>
                    <span class=""> <b>$${item.price}</b></span>
                </div>
                
                <div>
                    <a href="#" class="edit-icon d-inline-block w-25 text-right mr-3" data-id="${item.id}">
                        <i class="fa text-dark fa-edit fa-x"></i>
                    </a>

                    <a href="#" class="delete-icon d-inline-block w-25 text-right" data-id="${item.id}">
                        <i class="fa fa-trash text-danger fa-x"></i>
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

        if (budget.addedGroceries.length == 0) {
            REMOVE_GROCERIES_BTN.classList.add('d-none');
        }

        // delete from budget;
        this.myList.removeChild(groceryItem);      
        
        // delete from list arr;
        const tempListGroceries = this.addedGroceries.filter(item => {

            // delete individual grocery price
            if (item.id == id) {
                this.substractSumGroceries(item);
            }
            
            return item.id !== id;
        });
        
        this.addedGroceries = tempListGroceries;
    }

    // edit grocery
    editGrocery = item => {
        // item is the 'a' element
        // item.parentElement.parentElement = li element (childNodes['de care o fi']);
        
        const id = parseInt(item.dataset.id);
        const groceryItem = item.parentElement.parentElement;

        // delete from budget;
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
    }
    
    addSumGroceries = () => {
        let sum = this.addedGroceries.reduce((acc, curr) => {
            return acc + curr.price;
        },0);
        
        this.CURRENT_TOTAL = sum;
        this.sumHolder.innerHTML = `TOTAL: <b>$${this.CURRENT_TOTAL}</b>`;
    }

    substractSumGroceries =(item) => {
        this.CURRENT_TOTAL -= item.price;
        this.sumHolder.innerHTML = `TOTAL: <b>$${this.CURRENT_TOTAL}</b>`;
    }
};


function eventListeners() {
    const actions = document.getElementById('list');
    const addItem = document.getElementById('myForm');
    const list = document.getElementById('list');

    
    // class init
    const budget = new BudgetController(list, 10);

    // remove all groceries
    REMOVE_GROCERIES_BTN.addEventListener('click', budget.removeAllGroceriesBtn);

    // append item;
    addItem.addEventListener('submit', function(event){
       
        event.preventDefault();
        budget.submitGrocery();

        if (budget.addedGroceries.length > 0) {
            REMOVE_GROCERIES_BTN.classList.remove('d-none');
        }
    })


    // actions (delete + edit)
    actions.addEventListener('click', function(event){
        if (event.target.parentElement.classList.contains('delete-icon')) {
            budget.deleteGrocery(event.target.parentElement);
        }

        if (event.target.parentElement.classList.contains('edit-icon')) {
            budget.editGrocery(event.target.parentElement);
        }
    });

   
};

document.addEventListener('DOMContentLoaded', function(){
    eventListeners();
});



export default BudgetController;