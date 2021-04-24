// Delgetstei ajillah controller
let uiController = (function() {

    let DOMstrings = {  // private ogogdol
        inputType: ".add__type",
        inputDescription: ".add__description",
        inputValue: ".add__value",
        addBtn: ".add__btn",
        incomeList: ".income__list",
        expenseList: ".expenses__list",
        tusuvLabel: ".budget__value",
        incomeLabel: ".budget__income--value",
        expenseLabel: ".budget__expenses--value",
        percentageLabel: ".budget__expenses--percentage",
        containerDiv: ".container"
    };

    return {
        getInput: function(){ // public service
            return {
                type: document.querySelector(DOMstrings.inputType).value, // exp or inc butsaana
                description: document.querySelector(DOMstrings.inputDescription).value,
                value: parseInt( document.querySelector(DOMstrings.inputValue).value )

            };
        },

        getDOMstrings: function() {  // hoyor doh public service
            return DOMstrings;
        },

        
        clearFields: function() {
            let fields = document.querySelectorAll(DOMstrings.inputDescription + ", " + DOMstrings.inputValue);

            // Convert List to Array
            let fieldsArr = Array.prototype.slice.call(fields);
            
            fieldsArr.forEach((element, index, array) => {
                    element.value = "";
            });

            fieldsArr[0].focus();
            // for (let i=0; i < fieldsArr.length; i++) {
            //     fieldsArr[i].value = "";
            // }
        },
        // tusuv: data.tusuv,
        // huvi: data.huvi,
        // totalInc: data.totals.inc,
        // totalExp: data.totals.exp

        tusviigUzuuleh: function(tusuv) {
            document.querySelector(DOMstrings.tusuvLabel).textContent = tusuv.tusuv;
            document.querySelector(DOMstrings.incomeLabel).textContent = tusuv.totalInc;
            document.querySelector(DOMstrings.expenseLabel).textContent = tusuv.totalExp;

            if (tusuv.huvi !== 0){
                document.querySelector(DOMstrings.percentageLabel).textContent = tusuv.huvi + "%";
            } else {
                document.querySelector(DOMstrings.percentageLabel).textContent = tusuv.huvi;
            }
        },


        deleteListItem: function(id) {
            let el = document.getElementById(id);
            el.parentNode.removeChild(el);
        },


        addListItem: function(item, type) {
            // Orlogo zarlagiin elementiig aguulsan HTML-ig beltgene.
            let html, list;
            if (type === "inc"){
                list = DOMstrings.incomeList;
                html = '<div class="item clearfix" id="inc-%id%"><div class="item__description">%%DESCRIPTION%%</div><div class="right clearfix"><div class="item__value">%%VALUE%%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
            } else {
                list = DOMstrings.expenseList;
                html = '<div class="item clearfix" id="exp-%id%"><div class="item__description">%%DESCRIPTION%%</div><div class="right clearfix"><div class="item__value">%%VALUE%%</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
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

    let calculateTotal = function(type) {
        let sum = 0;
        data.items[type].forEach(function(el) {
            sum += el.value;
        });

        data.totals[type] = sum;
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
        },

        tusuv: 0,
        huvi: 0
    };

    // private datag public service bolgohiin tuld butsaaj ogno.
    // Dotoroo closure-toi object butsaah zamaar shiidne
    return {
        tusuvTootsooloh: function() {
            // Niit orlogiin niilber
            calculateTotal("inc");

            // Niit Zarlagiin niilber
            calculateTotal("exp");

            // Tusviig shineer tootsoolno
            data.tusuv = data.totals.inc - data.totals.exp;

            // Orlogo zarlagiin huviig tootsoolno
            data.huvi = Math.round(data.totals.exp / data.totals.inc*100);
        },

        tusviigAvah: function() {
            return {
                tusuv: data.tusuv,
                huvi: data.huvi,
                totalInc: data.totals.inc,
                totalExp: data.totals.exp
            }
        },


        deleteItem: function(type, id) {
            let ids = data.items[type].map(function(el){
                return el.id;
            });

            let index = ids.indexOf(id);

            if( index !== -1){
                data.items[type].splice(index, 1);
            }
        },


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
        
        if(input.description !== "" && input.value !== ""){
            // 2. Olj avsan ogogdlvvdee Sanhvvgiin controllert damjuulj tend hadgalna
            let item = financeController.addItem(input.type, input.description, input.value);
            
            // 3. Olj avsan ogogdlvvdiig web page deeree tohiroh hesegt gargana
            uiController.addListItem(item, input.type);
            uiController.clearFields();

            // 4. Tosviig tootsoolno

            financeController.tusuvTootsooloh();


            // 5. Etssiin vldegdel , tootsoog delgetsend gargana
            let tusuv = financeController.tusviigAvah();

            // 6. Tusviin tootsoog delgetsend gargana
            uiController.tusviigUzuuleh(tusuv);
   
        }
    

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

        document.querySelector(DOM.containerDiv).addEventListener('click', function(event){
            let id = event.target.parentNode.parentNode.parentNode.parentNode.id; // inc-1 , exp-2 gej irne

            if(id) {
                let arr = id.split("-");  // inc-2
                let type = arr[0];
                let itemId = parseInt(arr[1]);  // "2"
                console.log(type + '===>' + id);

                // 1. Sanhvvgiin modulias type, id ashiglaad ustgana.
                financeController.deleteItem(type, itemId);

                // 2. Delgets deerees ene elementiig ustgana
                uiController.deleteListItem(id);

                // 3. Vldegedel tootsoog shinechlej haruulna.

            }
        });
    };

    return {   // public service bolgoj bna. initiig duudahaas naash ajillahgvi
        init: function() {
            console.log("Application started...");
            uiController.tusviigUzuuleh({
                tusuv: 0,
                huvi: 0,
                totalInc: 0,
                totalExp: 0
            });
            setupEventListeners();
        }
    }

})(uiController, financeController);

appController.init();