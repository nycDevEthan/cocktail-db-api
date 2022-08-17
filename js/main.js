document.querySelector('button').addEventListener('click', getFetch);

let drinkChoiceArr = [];
let nIntervId = 0;

function getFetch(){
  const choice = document.querySelector('input').value;
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='+choice;
  
  fetch(url)
      .then(res => res.json()) // parse response as JSON
      .then(data => {
        drinkChoiceArr = data.drinks;

        document.querySelector('h2').innerText = drinkChoiceArr[0].strDrink;
        document.querySelector('img').src = drinkChoiceArr[0].strDrinkThumb;
        document.querySelector('h3').innerText = drinkChoiceArr[0].strInstructions;
      })
      .catch(err => {
          console.log(`error ${err}`)
      })

      nIntervId = setInterval(displayNextDrink, 3000);
      
      nIntervId;

      document.querySelector('img').style.display = 'block';
};

document.getElementById('previous-button').addEventListener('click', displayPreviousDrink);
document.getElementById('pause-button').addEventListener('click', pauseDrinkDisplay);
document.getElementById('resume-button').addEventListener('click', resumeDrinkDisplay);
document.getElementById('next-button').addEventListener('click', displayNextDrink);

let currentDrink = 0;

function displayPreviousDrink() {

  if (currentDrink === 0) {
    currentDrink = drinkChoiceArr.length;
  } else {
    currentDrink--;
  }

  document.querySelector('h2').innerText = drinkChoiceArr[currentDrink].strDrink;
  document.querySelector('img').src = drinkChoiceArr[currentDrink].strDrinkThumb;
  document.querySelector('h3').innerText = drinkChoiceArr[currentDrink].strInstructions;
}

function pauseDrinkDisplay() {
  clearInterval(nIntervId);
  // release our intervalID from the variable
  nIntervId = null;
}

function resumeDrinkDisplay() {
  nIntervId = setInterval(displayNextDrink, 3000);
}

function displayNextDrink() {
  if (currentDrink === drinkChoiceArr.length) {
    currentDrink = 0;
  } else {
    currentDrink++;
  }

  document.querySelector('h2').innerText = drinkChoiceArr[currentDrink].strDrink;
  document.querySelector('img').src = drinkChoiceArr[currentDrink].strDrinkThumb;
  document.querySelector('h3').innerText = drinkChoiceArr[currentDrink].strInstructions;
}