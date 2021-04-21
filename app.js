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
                type: document.querySelector(DOMstrings.inputType).value, // exp or inc butsaana
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: document.querySelector(DOMstrings.inputValue).value

            }
        },

        getDOMstrings: function() {  // hoyor doh public service
            return DOMstrings;
        },

        addListItem: function(item, type) {
            // Orlogo zarlagiin elementiig aguulsan HTML-ig beltgene.
            let html, list;
            if (type === "inc"){
                list = ".income__list";
                html = '<div class="item clearfix" id="income-%id%"><div class="item__description">%%DESCRIPTION%%</div><div class="right clearfix"><div class="item__value">%%VALUE%%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else {
                list = ".expenses__list";
                html = '<div class="item clearfix" id="expense-%id%"><div class="item__description">%%DESCRIPTION%%</div><div class="right clearfix"><div class="item__value">%%VALUE%%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            }
            // Ter HTML dotroo orlogo zarlagiin utguudiig REPLACE ashiglaj oorchilj ogno
            html = html.replace('%id%', item.id);
            html = html.replace("%%DESCRIPTION%%", item.description);
            html = html.replace("%%VALUE%%", item.value);


            // Beltgesen HTML -ee DOM ruu hiij ogno
            document.querySelector(list).insertAdjacentHTML("beforeend", html);

        }

    }
})();  // IIFE



// Sanhuutei ajillah controller
let financeController = (function() {
    // private fn
    let Income = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };
    // private fn
    let Expense = function(id, description, value) {
        this.id = id;
        this.description = description;
        this.value = value;
    };

    // private data
    let data = {
        items: {
            inc: [],
            exp: []
        },

        totals: {
            inc: 0,
            exp: 0
        }
    };

    // private datag public service bolgohiin tuld butsaaj ogno.
    // Dotoroo closure-toi object butsaah zamaar shiidne
    return {
        addItem: function(type, desc, val) {
            let item, id;
            // identification ID
            if (data.items[type].length === 0) {
                id = 1;
            } else {
                id = data.items[type][data.items[type].length - 1].id + 1;
            }

            if (type === "inc") {
                item = new Income(id, desc, val);
            } else {
                item = new Expense(id, desc, val);
            }

            data.items[type].push(item);

            return item;
        },

        seeData: function(){
            return data;
        }
    }

})();


// Programmiin holbogch controller
let appController = (function(uiController, financeController) {
    let ctrlAddItem = function() {  // private function
        // 1. Oruulah ogogdliig delgetsnees olj avna.
        let input = uiController.getInput();  
        

        // 2. Olj avsan ogogdlvvdee Sanhvvgiin controllert damjuulj tend hadgalna
        let item = financeController.addItem(input.type, input.description, input.value);
        
        // 3. Olj avsan ogogdlvvdiig web page deeree tohiroh hesegt gargana
        uiController.addListItem(item, input.type);
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