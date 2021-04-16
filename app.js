//
let searchResult = document.querySelector('.search-result');
const items = document.querySelector('.items')

const callMeal = () => {
  let searchValue = document.getElementById('search-form').value;

  if (searchValue === '') {
    alert("Please type item name & try again")
  } else {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchValue}`

    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data.meals) {
          data.meals.forEach(meal => {
            let itemsHtml = document.createElement('div');
            console.log(meal);
            let itemHtml = `
          <button onclick="handelMealDetail('${meal.idMeal}')" class='view-button'>
              <div class="items">
                  <img src="${meal.strMealThumb}" alt="">
                  <div class="flex-container">
                    <h1 class="menu-title">${meal.strMeal}</h1>
                  </div>
              </div>
            </button>
        `
            itemsHtml.innerHTML = itemHtml;
            searchResult.appendChild(itemsHtml);
          })
          itemsHtml.innerHTML = "";
          // remove error
          const error = document.getElementById('error');
          error.classList.add('display')

        } else {
          searchResult.innerHTML = `
              <h1 id="error">
                404! <br> Sorry meal Not Found !
              </h1>
          `
        }
      });
  }
}

document.getElementById('search-icon').addEventListener('click', function () {
  callMeal();
  searchResult.innerHTML = "";
  const heightDetails = document.querySelector('.meal-details');
  heightDetails.innerHTML = "";
})



const handelMealDetail = meals => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meals}`
  fetch(url)
    .then(res => res.json())
    .then(data => showDetail(data.meals[0]));
}
const showDetail = meal => {
  const detailsDiv = document.querySelector('.meal-details');
  detailsDiv.innerHTML = `
  <div class="displayDetails">
      <img src="${meal.strMealThumb}" alt="">
      <h1>
          ${meal.strMeal}
      </h1>
      <ul>
          <li>
              ${meal.strArea}
          <li>
              ${meal.strMeasure4}
          </li>
          <li>
             ${meal.strCategory}
          </li>
          <li>
              ${meal.strIngredient11}
          </li>
          <li>
              ${meal.strIngredient9}
          </li>
      </ul>
      <br>
      <p><strong>Details</strong></p>
      <br>
      <p> 
        ${meal.strInstructions}
      </p>
  </div>
  `
}