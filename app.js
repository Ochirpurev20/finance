var uiController = (function () {
  var DOMstrings = {
    inputType: ".add__type",
    inputDescription: ".add__description",
    inputValue: ".add__value",
    addBtn: ".add__btn",
    incomeList: ".income__list",
    expenseList: ".expenses__list",
    tusuvLabel: ".budget__value",
    incomeLabel: ".budget__income--value",
    expenseLabel: ".budget__expenses--value",
    percentLabel: ".budget__expenses--percentage",
    conternerDiv: ".container",
    expensePercentLabel: ".item__percentage",
    dateLabel: ".budget__title--month",
  };
  var nodeListForeach = function (list, callback) {
    for (var i = 0; i < list.length; i++) {
      callback(list[i], i);
    }
  };
  return {
    displayDate: function () {
      var unuudur = new Date();

      document.querySelector(DOMstrings.dateLabel).textContent =
        unuudur.getFullYear() + " " + unuudur.getMonth() + " сарын ";
    },
    getInput: function () {
      return {
        type: document.querySelector(DOMstrings.inputType).value,
        description: document.querySelector(DOMstrings.inputDescription).value,
        value: parseInt(document.querySelector(DOMstrings.inputValue).value),
      };
    },
    displayPercentages: function (allPercentages) {
      var elements = document.querySelectorAll(DOMstrings.expensePercentLabel);
      //element bolgonii huvid massiv s avch shivj oruulah
      nodeListForeach(elements, function (el, index) {
        el.textContent = allPercentages[index];
      });
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
    },

    tusuvUzuuleh: function (tusuv) {
      document.querySelector(DOMstrings.tusuvLabel).textContent = tusuv.tusuv;
      document.querySelector(DOMstrings.incomeLabel).textContent =
        tusuv.totalInc;
      document.querySelector(DOMstrings.expenseLabel).textContent =
        tusuv.totalExp;
      if (tusuv.huvi !== 0) {
        document.querySelector(DOMstrings.percentLabel).textContent =
          tusuv.huvi + "%";
      } else {
        document.querySelector(DOMstrings.percentLabel).textContent =
          tusuv.huvi;
      }
    },
    deleteListItem: function (id) {
      var el = document.getElementById(id);
      el.parentNode.removeChild(el);
    },
    addListItem: function (item, type) {
      //orlogo zarlagiin element aguulsan html g beltgene
      var html, list;
      if (type === "inc") {
        list = DOMstrings.incomeList;
        html =
          '<div class="item clearfix" id="inc-%id%"><div class="item__description">$$DESCRIPTION$$</div><div class="right clearfix"><div class="item__value">$$VALUE$$</div><div class="item__delete"><button class="item__delete--btn"><i class="ion-ios-close-outline"></i></button></div></div></div>';
      } else {
        list = DOMstrings.expenseList;
        html =
          '<div class="item clearfix" id="exp-%id%"><div class="item__description">$$DESCRIPTION$$</div>          <div class="right clearfix"><div class="item__value">$$VALUE$$</div><div class="item__percentage">21%</div><div class="item__delete"><button class="item__delete--btn">                <i class="ion-ios-close-outline"></i></button></div></div></div>';
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
    this.percentage = -1;
  };
  Expense.prototype.calcPercantage = function (totalIncome) {
    if (totalIncome > 0)
      this.percentage = Math.round((this.value / totalIncome) * 100);
    else this.percentage = 0;
  };
  Expense.prototype.getPercentage = function () {
    return this.percentage;
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
      if (data.totals.inc > 0)
        data.huvi = Math.round((data.totals.exp / data.totals.inc) * 100);
      else data.huvi = 0;
    },
    calculatePercentages: function () {
      data.item.exp.forEach(function (el) {
        el.calcPercantage(data.totals.inc);
      });
    },
    getPercentage: function () {
      var allPercentages = data.item.exp.map(function (el) {
        return el.getPercentage();
      });
      return allPercentages;
    },
    tusviigAvah: function () {
      return {
        tusuv: data.tusuv,
        huvi: data.huvi,
        totalInc: data.totals.inc,
        totalExp: data.totals.exp,
      };
    },
    deleteItem: function (type, id) {
      var ids = data.item[type].map(function (el) {
        return el.id;
      });
      var index = ids.indexOf(id);
      if (index !== -1) {
        data.item[type].splice(index, 1);
      }
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
    seeData: function () {
      return data;
    },
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
      updateTusuv();
    }
  };
  var updateTusuv = function () {
    //tusviig tootsoolno
    financeController.tusuvTootsooloh();
    // etssiin uldegdel tootsoog delgetsend haruulah
    var tusuv = financeController.tusviigAvah();
    uiController.tusuvUzuuleh(tusuv);
    //console.log(tusuv);
    //elementuudiin huviig tootsoolno
    financeController.calculatePercentages();
    //tootsoolson huviig huleej avna
    var allPercentages = financeController.getPercentage();
    //edgeeriig huviig update hiine
    uiController.displayPercentages(allPercentages);
    console.log(allPercentages);
  };
  var setupEvents = function () {
    var DOM = uiController.getDOMstrings();
    document.querySelector(DOM.addBtn).addEventListener("click", function () {
      ctrlAddItem();
    });
    document.addEventListener("keypress", function (event) {
      if (event.keyCode === 13 || event.which === 13) ctrlAddItem();
    });
    document
      .querySelector(DOM.conternerDiv)
      .addEventListener("click", function (e) {
        var id = e.target.parentNode.parentNode.parentNode.parentNode.id;
        if (id) {
          var arr = id.split("-");
          var type = arr[0];
          var itemId = parseInt(arr[1]);
          // sanhuugiin module s utgana
          financeController.deleteItem(type, itemId);
          //delgetse deerees ustgana
          uiController.deleteListItem(id);
          //uldegdel tootsoog shinechilne
          updateTusuv();
        }
      });
  };

  return {
    init: function () {
      console.log("app starts");
      setupEvents();
      uiController.displayDate();
      uiController.tusuvUzuuleh({
        tusuv: 0,
        huvi: 0,
        totalInc: 0,
        totalExp: 0,
      });
    },
  };
})(uiController, financeController);

appController.init();
