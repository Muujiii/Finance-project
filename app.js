// Delgetstei ajillah controller
let uiController = (function() {


})();  // IIFE



// Sanhuutei ajillah controller
let financeController = (function() {

})();


// Programmiin holbogch controller
let appController = (function(uiController, financeController) {
    let ctrlAddItem = function() {
        // 1. Oruulah ogogdliig delgetsnees olj avna.
        console.log("Delgetsees ogogdloo avah heseg");
        // 2. Olj avsan ogogdlvvdee Sanhvvgiin controllert damjuulj tend hadgalna
        // 3. Olj avsan ogogdlvvdiig web page deeree tohiroh hesegt gargana
        // 4. Tosviig tootsoolno
        // 5. Etssiin vldegdel , tootsoog delgetsend gargana
    };

    document.querySelector('.add__btn').addEventListener('click', function() {
        ctrlAddItem();
    })


    document.addEventListener('keypress', function(event) {
        if (event.keyCode === 13 || event.which === 13) {
            ctrlAddItem();
        }
    });

})(uiController, financeController);
