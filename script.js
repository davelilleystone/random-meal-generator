const getMealButton = document.querySelector('.btn-meal');

const url = 'https://www.themealdb.com/api/json/v1/1/random.php';

const getMealData = async () => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.meals[0];
  } catch (err) {}
};

const displayMeal = async () => {
  const meal = await getMealData();

  const mainDiv = document.querySelector('.main-container');
  mainDiv.innerHTML = `
  <section class="image-ingredients">
  <div class="image">
    <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
  </div>
  <div class="ingredients">
    <h2 class="meal-name">${meal.strMeal}</h2>
    <ul class="ingredients-list"></ul>
  </div>
</section>
<section class="instructions"></section>
  `;
};

getMealButton.addEventListener('click', displayMeal);

document.addEventListener('DOMContentLoaded', displayMeal);
