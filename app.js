var uiController = (function () {
  var DOMstrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    addBtn: ".add__btn",
  };
  return {
    getInput: function () {
      return {
        type: document.querySelector(DOMstrings.inputType).value,
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: document.querySelector(DOMstrings.inputValue).value,
      };
    },
    getDOMstrings: function () {
      return DOMstrings;
    },
  };
})();

var financeController = (function () {
  var Income = function (id, desc, value) {
    this.id = id;
    this.description = desc;
    this.value = value;
  };
  var Expense = function (id, desc, value) {
    this.id = id;
    this.description = desc;
    this.value = value;
  };

  var data = {
    allItems: {
      inc: [],
      exp: [],
    },
    totals: {
      inc: 0,
      exp: 0,
    },
  };
})();

var appController = (function (uiController, financeController) {
  var ctrlAddItem = function () {
    console.log(uiController.getInput());
    // oruulah datag delgetsees unshih
    //olj avsa ugugdluudiigsanhuugiin controller damjuulan tend hadgalah
    //web deer tohiroh hesegt ni gargana
    //tusviig tootsoolno
    // etssiin uldegdel tootsoog delgetsend haruulah
  };
  var setupEvents = function () {
    var DOM = uiController.getDOMstrings();
    document.querySelector(DOM.addBtn).addEventListener("click", function () {
      ctrlAddItem();
    });
    document.addEventListener("keypress", function (event) {
      if (event.keyCode === 13 || event.which === 13) ctrlAddItem();
    });
  };

  return {
    init: function () {
      console.log("app starts");
      setupEvents();
    },
  };
})(uiController, financeController);

appController.init();
