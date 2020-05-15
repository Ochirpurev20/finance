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
    item: {
      inc: [],
      exp: [],
    },
    totals: {
      inc: 0,
      exp: 0,
    },
  };
  return {
    addItem: function (type, desc, val) {
      console.log("item added");
      var item, id;
      if (data.item[type].length === 0) id = 1;
      else id = data.item[type][data.item[type].length - 1].id + 1;

      if (type === "inc") {
        item = new Income(id, desc, val);
      } else {
        item = new Expense(id, desc, val);
      }
      data.item[type].push(item);
    },
    seeData: function () {
      return data;
    },
  };
})();

var appController = (function (uiController, financeController) {
  var ctrlAddItem = function () {
    // oruulah datag delgetsees unshih
    var input = uiController.getInput();
    //olj avsa ugugdluudiigsanhuugiin controller damjuulan tend hadgalah
    financeController.addItem(input.type, input.description, input.value);
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
