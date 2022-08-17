document.querySelector('button').addEventListener('click', getFetch);

let drinkChoiceArr = [];
let nIntervId = 0;

let ingredientItem = document.createElement('li');

function getFetch(){
  const choice = document.querySelector('input').value;
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='+choice;
  
  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        console.log(data);
        drinkChoiceArr = data.drinks;

        document.querySelector('h2').innerText = `Name: ${drinkChoiceArr[0].strDrink}`;
        document.getElementById('drink-glass').innerText = `Type of Glass: ${drinkChoiceArr[0].strGlass}`;
        document.querySelector('h3').innerText = `Instructions: ${drinkChoiceArr[0].strInstructions}`;
        document.querySelector('img').src = drinkChoiceArr[0].strDrinkThumb;
      })
      .catch(err => {
          console.log(`error ${err}`)
      })

      nIntervId = 0;

      nIntervId = setInterval(displayNextDrink, 5000);
      
      nIntervId;

      document.querySelector('img').style.display = 'block';
};

document.getElementById('back-arrow').addEventListener('click', displayPreviousDrink);
document.getElementById('right-arrow').addEventListener('click', displayNextDrink);
document.getElementById('pause-button').addEventListener('click', pauseDrinkDisplay);
document.getElementById('resume-button').addEventListener('click', resumeDrinkDisplay);

let currentDrink = 0;

function displayPreviousDrink() {

  if (currentDrink === 0) {
    currentDrink = drinkChoiceArr.length;
  } else {
    currentDrink--;
  }

  document.querySelector('h2').innerText = `Name: ${drinkChoiceArr[currentDrink].strDrink}`;
  document.querySelector('img').src = drinkChoiceArr[currentDrink].strDrinkThumb;
  document.querySelector('h3').innerText = `Instructions: ${drinkChoiceArr[0].strInstructions}`;
  document.getElementById('drink-glass').innerText = `Type of Glass: ${drinkChoiceArr[currentDrink].strGlass}`;
}

function pauseDrinkDisplay() {
  clearInterval(nIntervId);
  // release our intervalID from the variable
  nIntervId = null;
}

function resumeDrinkDisplay() {
  nIntervId = setInterval(displayNextDrink, 5000);
}

function displayNextDrink() {
  if (currentDrink === drinkChoiceArr.length) {
    currentDrink = 0;
  } else {
    currentDrink++;
  }

  document.querySelector('h2').innerText = `Name: ${drinkChoiceArr[currentDrink].strDrink}`;
  document.querySelector('img').src = drinkChoiceArr[currentDrink].strDrinkThumb;
  document.querySelector('h3').innerText = drinkChoiceArr[currentDrink].strInstructions;
}