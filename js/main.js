document.querySelector('button').addEventListener('click', getFetch);

let drinkChoiceArr = [];

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
};

document.getElementById('previous-button').addEventListener('click', displayPreviousDrink);
document.getElementById('pause-button').addEventListener('click', pauseDrinkDisplay);
document.getElementById('next-button').addEventListener('click', displayNextDrink);

let currentDrink = 0;

function displayPreviousDrink() {

  currentDrink--;

  document.querySelector('h2').innerText = drinkChoiceArr[currentDrink].strDrink;
  document.querySelector('img').src = drinkChoiceArr[currentDrink].strDrinkThumb;
  document.querySelector('h3').innerText = drinkChoiceArr[currentDrink].strInstructions;
}

function pauseDrinkDisplay() {

}

function displayNextDrink() {
  currentDrink++;

  document.querySelector('h2').innerText = drinkChoiceArr[currentDrink].strDrink;
  document.querySelector('img').src = drinkChoiceArr[currentDrink].strDrinkThumb;
  document.querySelector('h3').innerText = drinkChoiceArr[currentDrink].strInstructions;
}