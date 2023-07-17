const getMealButton = document.querySelector('.btn-meal');

const url = 'https://www.themealdb.com/api/json/v1/1/random.php';

// const url = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=52996';

const getMealData = async () => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data.meals[0];
  } catch (err) {}
};

const getIngredientNames = (meal) => {
  const names = [];
  for (const item in meal) {
    if (
      item.includes('strIngredient') &&
      meal[item] != '' &&
      meal[item] != null
    ) {
      names.push(meal[item]);
    }
  }
  return names;
};

const getIngredientMeasures = (meal) => {
  const names = [];
  for (const item in meal) {
    if (item.includes('strMeasure') && meal[item] != '' && meal[item] != null) {
      names.push(meal[item]);
    }
  }
  return names;
};

const createIngredientList = (ingredientNames, ingredientMeasures) => {
  const ingredients = [];
  ingredientNames.forEach((item, index) => {
    console.log(ingredientMeasures[index].length);
    ingredients.push(
      `<li class = 'ingredient-list-item'>${item} ${
        ingredientMeasures[index] != undefined &&
        ingredientMeasures[index] != ' '
          ? `(${ingredientMeasures[index]})`
          : ''
      }</li>`
    );
  });
  return ingredients.join('');
};

const displayMeal = async () => {
  const meal = await getMealData();

  console.log(meal.idMeal);
  const ingredientNames = getIngredientNames(meal);
  const ingredientMeasures = getIngredientMeasures(meal);

  createIngredientList(ingredientNames, ingredientMeasures);

  //   createIngredientList();

  const mainDiv = document.querySelector('.main-container');
  mainDiv.innerHTML = `
    <section class="image-ingredients">
    <div class="image">
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
    </div>
    <div class="ingredients">
    <div class = ingredients-container>  
      <h2 class="meal-name">${meal.strMeal}</h2>
      <h3 class="ingredients-title">Ingredients</h3>
      <ul class="ingredients-list">${createIngredientList(
        ingredientNames,
        ingredientMeasures
      )}</ul>
    </div>
    </div>
  </section>
  <section class="instructions-details">
  <div><h3 class="instructions-title">Cooking Instructions</h3><p>${
    meal.strInstructions
  }</p></div>
  </section>
    `;
};

getMealButton.addEventListener('click', displayMeal);

document.addEventListener('DOMContentLoaded', displayMeal);
