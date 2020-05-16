var uiController = (function () {
  var DOMstrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    addBtn: ".add__btn",
    incomeList: ".income__list",
    expenseList: ".expenses__list",
  };
  return {
    getInput: function () {
      return {
        type: document.querySelector(DOMstrings.inputType).value,
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: parseInt(document.querySelector(DOMstrings.inputValue).value),
      };
    },
    getDOMstrings: function () {
      return DOMstrings;
    },
    clearFields: function () {
      var fields = document.querySelectorAll(
        DOMstrings.inputDescription + "," + DOMstrings.inputValue
      );
      //convert list to array
      var fieldArr = Array.prototype.slice.call(fields);
      fieldArr.forEach(function (el, index, array) {
        el.value = "";
      });
      fieldArr[0].focus();
      // for (var i = 0; i < fieldArr.length; i++) {
      //   fieldArr[i].value = '';
      // }
    },
    addListItem: function (item, type) {
      //orlogo zarlagiin element aguulsan html g beltgene
      var html, list;
      if (type === "inc") {
        list = DOMstrings.incomeList;
        html =
          '<div class="item clearfix" id="income-%id%"><div class="item__description">$$DESCRIPTION$$</div><div class="right clearfix"><div class="item__value">$$VALUE$$</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else {
        list = DOMstrings.expenseList;
        html =
          '<div class="item clearfix" id="expense-%id%"><div class="item__description">$$DESCRIPTION$$</div>          <div class="right clearfix"><div class="item__value">$$VALUE$$</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn">                <i class="ion-ios-close-outline"></i></button></div></div></div>';
      }
      //beldsen html dotroo orlogo zarlagin utguudiig replace ashiglaj uurchlunu
      html = html.replace("%id%", item.id);
      html = html.replace("$$DESCRIPTION$$", item.description);
      html = html.replace("$$VALUE$$", item.value);
      //beltgesen html ee DOM ruu hiih
      document.querySelector(list).insertAdjacentHTML("beforeend", html);
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
  var calculateTotal = function (type) {
    var sum = 0;
    data.item[type].forEach(function (el) {
      sum = sum + el.value;
    });
    data.totals[type] = sum;
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
    tusuv: 0,
    huvi: 0,
  };
  return {
    tusuvTootsooloh: function () {
      //niit zardal, orlogiin niilber
      calculateTotal("inc");
      calculateTotal("exp");
      //tusviig tootsooloh
      data.tusuv = data.totals.inc - data.totals.exp;
      //orlogo,zarlagiin huviig tootsoolno
      data.huvi = Math.round((data.totals.exp / data.totals.inc) * 100);
    },
    tusviigAvah: function () {
      return {
        tusuv: data.tusuv,
        huvi: data.huvi,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp,
      };
    },
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
      return item;
    },
    // seeData: function () {
    //   return data;
    // },
  };
})();
//app holbogch controller
var appController = (function (uiController, financeController) {
  var ctrlAddItem = function () {
    // oruulah datag delgetsees unshih
    var input = uiController.getInput();
    if (input.description !== "" && input.value !== "") {
      //olj avsa ugugdluudiigsanhuugiin controller damjuulan tend hadgalah
      var item = financeController.addItem(
        input.type,
        input.description,
        input.value
      );
      //web deer tohiroh hesegt ni gargana
      uiController.addListItem(item, input.type);
      uiController.clearFields();

      //tusviig tootsoolno
      financeController.tusuvTootsooloh();
      // etssiin uldegdel tootsoog delgetsend haruulah
      var tusuv = financeController.tusviigAvah();
      console.log(tusuv);
    }
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
