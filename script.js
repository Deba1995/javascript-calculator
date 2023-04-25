//Selecting the display screen
const screen = document.querySelector('.screen');
const history = document.querySelector('.history');
//Selecting calculator buttons
const buttons = document.querySelector('.calculator_buttons');
const keys = document.querySelectorAll('.btn');

const light = document.querySelector('#light');
const dark = document.querySelector('#dark');
const time = document.querySelector('#time');


function startTime() {
  const today = new Date();
  let h = today.getHours();
  let m = today.getMinutes();

  m = checkTime(m);

  time.innerHTML = h + ":" + m;
  setTimeout(startTime, 1000);
}

function checkTime(i) {
  if (i < 10) { i = "0" + i };  // add zero in front of numbers < 10
  return i;
}

startTime();

light.addEventListener('click', function() {
  document.documentElement.style.setProperty('--primary-screen', 'white');
  document.documentElement.style.setProperty('--box-shadow', 'black');
  // document.documentElement.style.setProperty('--keys-operator', 'red');
  // document.documentElement.style.setProperty('--active', 'limegreen');
  document.documentElement.style.setProperty('--icon-sun', 'yellow');
  document.documentElement.style.setProperty('--icon-moon', 'black');
  document.documentElement.style.setProperty('--icon-nav', 'black');
});

dark.addEventListener('click', function() {
  document.documentElement.style.setProperty('--primary-screen', '#282A3A');
  document.documentElement.style.setProperty('--box-shadow', '#34364a');
  // document.documentElement.style.setProperty('--keys-operator', '#F45050');
  // document.documentElement.style.setProperty('--active', 'limegreen');
  document.documentElement.style.setProperty('--icon-sun', 'black');
  document.documentElement.style.setProperty('--icon-moon', 'white');
  document.documentElement.style.setProperty('--icon-nav', 'white');
});



let firstValue = "";
let isFirstValue = false;
let secondValue = "";
let isSecondValue = false;
let operator = "";
let isOperator = false;
let screenValue = "_";
let decimalAllowed = true;
let hist = "";


//Get the first value
function getFirstValue(elem) {
  screen.innerHTML = "_";
  firstValue += elem;
  if (firstValue.length <= 9) {
    // console.log(firstValue);
    if (firstValue.length === 2 && (firstValue[0] + firstValue[1] === "00")) {
      firstValue = "";
      screen.innerHTML = "0"
    }
    else {
      history.innerHTML += elem;
      screen.innerHTML = firstValue;
    }
  }
  else {
    firstValue = firstValue.slice(0, 10);
    history.innerHTML = firstValue;
    screen.innerHTML = firstValue;
  }
  // console.log(firstValue);
}

//Get the second value
function getSecondValue(elem) {
  if (firstValue != "" && operator != "") {
    secondValue += elem;
    if (secondValue.length <= 9) {
      if (secondValue.length === 2 && (secondValue[0] + secondValue[1] === "00")) {
        secondValue = "";
        history.innerHTML += "0";
        screen.innerHTML = "0";
      } else {
        history.innerHTML += elem;
        screen.innerHTML = secondValue;
      }

    }
    else {
      secondValue = secondValue.slice(0, 10);
      history.innerHTML = secondValue;
      screen.innerHTML = secondValue;
    }

  }
}


//Check result length
function checkResultLength() {
  if (screenValue.toString().length >= 8) {
    history.innerHTML = screenValue.toString();
    screen.innerHTML = Number.parseFloat(screenValue).toFixed(5);
    firstValue = screenValue.toString();
    secondValue = "";
    isOperator = false;
    decimalAllowed = true;
    // console.log(`---${firstValue}`);
  }
  else {

    firstValue = screenValue.toString();
    history.innerHTML = firstValue;
    screen.innerHTML = firstValue;
    secondValue = "";
    isOperator = false;
    decimalAllowed = true;
    operator = "";
  }

}

//Active button
function isActive(elem) {
  keys.forEach((key) => key.classList.remove('active'));
  elem.classList.add('active');
}

//clear function

function clear() {
  history.innerHTML = "";
  screen.innerHTML = "_";
  firstValue = "";
  isFirstValue = false;
  isOperator = false;
  secondValue = "";
  isSecondValue = false;
  // operator = "";
  screenValue = "_";
  decimalAllowed = true;
}

//Selecting Each button using event delegation pattern

buttons.addEventListener('click', (e) => {

  if (e.target.classList.contains('number')) {
    // console.log(e.target)
    isActive(e.target);
    const id = e.target.dataset.number;
    if (isFirstValue === false) {
      getFirstValue(id);
    }

    if (isSecondValue === false) {
      getSecondValue(id);
    }
  }

  if (e.target.classList.contains('operator')) {
    // console.log(e.target)
    isActive(e.target);
    if (firstValue != "" && isOperator === false) {
      operator = e.target.dataset.number;
      history.innerHTML += operator;
      isFirstValue = true;
      isOperator = true;
      decimalAllowed = true;

    }
  }

  if (e.target.classList.contains('equal')) {
    // console.log(e.target)
    isActive(e.target);
    if (!history.innerHTML.includes('=')) {
      history.innerHTML += "=";
    }
    if (firstValue != "" && operator != "" && isOperator === true && secondValue != "") {
      screen.innerHTML = "_";
      if (operator === "+") {
        screenValue = Number.parseFloat(firstValue) + Number.parseFloat(secondValue);
      } else if (operator === "-") {
        screenValue = Number.parseFloat(firstValue) - Number.parseFloat(secondValue);
      } else if (operator === "*") {
        screenValue = Number.parseFloat(firstValue) * Number.parseFloat(secondValue);
      } else if (operator === "/") {
        screenValue = Number.parseFloat(firstValue) / Number.parseFloat(secondValue);
      }

      checkResultLength();
    }
  }

  if (e.target.classList.contains('negative')) {
    // console.log(e.target)
    isActive(e.target);
    screen.innerHTML = "_";
    if (firstValue != "") {
      screenValue = -firstValue;
      firstValue = screenValue;
    }

    if (firstValue != "" && secondValue != "" && operator != "") {
      screenValue = -screenValue;
    }
    history.innerHTML += screenValue;
    screen.innerHTML = screenValue;
  }

  if (e.target.classList.contains('percent')) {
    // console.log(e.target)
    isActive(e.target);
    screen.innerHTML = "_";
    if (firstValue != "") {
      screenValue = firstValue / 100;
      firstValue = screenValue;
    }

    if (firstValue != "" && secondValue != "" && operator != "") {
      screenValue = screenValue / 100;
    }

    checkResultLength()
    // screen.innerHTML = screenValue;
  }

  if (e.target.classList.contains('delete')) {
    // console.log(e.target)
    isActive(e.target);
    if (firstValue != "" && operator != "" && secondValue != "") { // 8 + 33
      // console.log(secondValue);
      secondValue = secondValue.slice(0, -1); // 8 + 3
      if (secondValue === "") {
        screenValue = "";
        hist = history.innerHTML.slice(0, -1);
        history.innerHTML = hist;
        screen.innerHTML = screenValue;
      }
      else {
        //3
        screenValue = secondValue; // h = 8 + 3    s = 3
        hist = history.innerHTML.slice(0, -1);
        history.innerHTML = hist;
        screen.innerHTML = screenValue;
      }
      // screenValue = firstValue + operator + secondValue;

    }
    else if (firstValue != "" && operator != "") {
      // console.log(operator);
      operator = "";
      isOperator = false;
      screenValue = firstValue;
      hist = history.innerHTML.slice(0, -1);
      history.innerHTML = hist;
      screen.innerHTML = screenValue;

    }
    else if (firstValue != "") {
      // console.log(firstValue);
      firstValue = firstValue.slice(0, -1);
      if (firstValue === "") {
        screenValue = "_"
        history.innerHTML = "";
        screen.innerHTML = screenValue;
        clear();
      } else {
        screenValue = firstValue;
        // console.log(history.innerHTML)
        hist = history.innerHTML.slice(0, -1);
        history.innerHTML = hist;
        screen.innerHTML = screenValue;
      }
    }
  }

  if (e.target.classList.contains('clear')) {
    isActive(e.target);
    clear();
  }

  if (e.target.classList.contains('decimal')) {
    // console.log(e.target)
    isActive(e.target);
    if (decimalAllowed === true && firstValue != "" && isOperator == false) {
      if (firstValue.includes('.')) {
        decimalAllowed = false;
      } else {
        firstValue += ".";
        screen.innerHTML = firstValue;
      }
    }

    if (decimalAllowed === true && operator != "" && secondValue != "") {
      if (secondValue.includes('.')) {
        decimalAllowed = false;
      } else {
        secondValue += ".";
        screen.innerHTML = secondValue;
      }
    }
  }

});
