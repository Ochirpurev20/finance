var uiController = (function () {})();

var financeController = (function () {})();

var appController = (function (uiController, financeController) {
  var ctrlAddItem = function () {
    alert("hadgalah func");
    // oruulah datag delgetsees unshih
    //olj avsa ugugdluudiigsanhuugiin controller damjuulan tend hadgalah
    //web deer tohiroh hesegt ni gargana
    //tusviig tootsoolno
    // etssiin uldegdel tootsoog delgetsend haruulah
  };
  document.querySelector(".add__btn").addEventListener("click", function () {
    ctrlAddItem();
  });
  document.addEventListener("keypress", function (event) {
    if (event.keyCode === 13) ctrlAddItem();
  });
})(uiController, financeController);
