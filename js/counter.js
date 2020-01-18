import UXList from '../js/app.js';

class Counter extends UXList{
    constructor() {
        super();
        this.inputCounter = document.getElementById('item-quantity');
        this.min = this.inputCounter.getAttribute('min');
        this.max = this.inputCounter.getAttribute('max');
        this.add = null;
        this.substract = null;
    }

    
    appendQuantityInput = () =>{
        const parentQuantityElement = this.groceryQuantity.parentNode;
        const div = document.createElement('div');
              div.classList.add('quantity-nav');
        
        const innerElement = `
            <div class="quantity-button quantity-up">+</div>
            <div class="quantity-button quantity-down">-</div>
        `

        div.innerHTML = innerElement;
        parentQuantityElement.insertBefore(div, this.groceryQuantity.nextSibling);
    }
 
    addCounter = () => {
        var oldV = parseFloat(this.inputCounter.value);
        var newV = oldV;
            newV++;

        if (newV >= this.max) {
            newV = this.max;
        }
        
        this.inputCounter.value = newV;
    }

    substractCounter = () => {
        var oldV = parseFloat(this.inputCounter.value);
        var newV = oldV;
            newV--;

        if (newV <= this.min) {
            newV = this.min;
        }
        console.log(newV);
        this.inputCounter.value = newV;
    }
}


function eventListeners() { 
    // class init
    
    const cntr = new Counter();
    cntr.appendQuantityInput();

    const add = document.querySelector('.quantity-up');
    const substract = document.querySelector('.quantity-down');

    add.addEventListener('click', function(){
        cntr.addCounter();
    });

    substract.addEventListener('click', function(){
        cntr.substractCounter();
    });
}

document.addEventListener('DOMContentLoaded', function(){
    eventListeners();
});
