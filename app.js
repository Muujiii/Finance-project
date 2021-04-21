// Delgetstei ajillah controller
let uiController = (function() {

    let DOMstrings = {  // private ogogdol
        inputType: ".add__type",
        inputDescription: ".add__description",
        inputValue: ".add__value",
        addBtn: ".add__btn"

    }

    return {
        getInput: function(){ // public service
            return {
                type: document.querySelector(DOMstrings.inputType).value,
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value

            }
        },

        getDOMstrings: function() {  // hoyor doh public service
            return DOMstrings;
        }
    }
})();  // IIFE



// Sanhuutei ajillah controller
let financeController = (function() {
    let Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }
      
    let Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    }

    let data = {
        allItems: {
            inc: [],
            exp: []
        },

        totals: {
            inc: 0,
            exp: 0
        }
    }

})();


// Programmiin holbogch controller
let appController = (function(uiController, financeController) {
    let ctrlAddItem = function() {  // private function
        // 1. Oruulah ogogdliig delgetsnees olj avna.

        console.log(uiController.getInput());
        // 2. Olj avsan ogogdlvvdee Sanhvvgiin controllert damjuulj tend hadgalna
        // 3. Olj avsan ogogdlvvdiig web page deeree tohiroh hesegt gargana
        // 4. Tosviig tootsoolno
        // 5. Etssiin vldegdel , tootsoog delgetsend gargana
    };

    let setupEventListeners = function() {
        let DOM = uiController.getDOMstrings();

        document.querySelector(DOM.addBtn).addEventListener('click', function() {
            ctrlAddItem();
        })
    
    
        document.addEventListener('keypress', function(event) {
            if (event.keyCode === 13 || event.which === 13) {
                ctrlAddItem();
            }
        });
    }

    return {   // public service bolgoj bna. initiig duudahaas naash ajillahgvi
        init: function() {
            console.log("Application started...");
            setupEventListeners();
        }
    }

})(uiController, financeController);

appController.init();