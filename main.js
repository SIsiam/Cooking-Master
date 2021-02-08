const searchFood = () => {
    const userSearch = document.getElementById('search-box').value;
    const myUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${userSearch}`

    // My Food Loading Data

    fetch(myUrl)
        .then(respo => respo.json())
        .then(myJsonData => displayMeal(myJsonData.meals))
        .catch(error => displayError('Oppps!! Please try again later!'));
}


const displayMeal = MyFood => {

    const foodContainer = document.getElementById('Meals-container');
    foodContainer.innerHTML = '';
    MyFood.forEach(food => {
        const everyFoodDiv = document.createElement('div');
        everyFoodDiv.className = 'every-Meals';
        everyFoodDiv.innerHTML = `

             <div onclick = "ingredients('${food.idMeal}')" class="food-details">
                 <img src="${food.strMealThumb}" width="200" />
                    <div class="details">
                        <h1>${food.strMeal}</h1>
                     </div>
             </div>
            `;
        foodContainer.appendChild(everyFoodDiv);
    })
}


// Food Click when User Click anyFood item 

const ingredients = async (id) => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`

    console.log(url);

    try {
    const res = await fetch(url);
    const data = await res.json();
    displaySelectedFood(data.meals[0]);
    }
    catch (error) {
        displayError('Sorry! I failed to load lyrics, Please try again later!!!')
    }

}

const displaySelectedFood = selectFood => {
    const ingredientsDiv = document.getElementById('food-details');
    ingredientsDiv.innerHTML = '';
    ingredientsDiv.className = "select-food"
    ingredientsDiv.innerHTML = `
                <div class="col-md-9">
                <h2>${selectFood.strMeal}</h2>
                <img src="${selectFood.strMealThumb}" >
                </div>
                <div class="card-body second-div">
                <h4> The ingredients </h4>
                <li> <i class="fas fa-check-square fa-2x"> ${selectFood.strIngredient1} </i> </li>
                <li> <i class="fas fa-check-square fa-2x"> ${selectFood.strIngredient2} </i> </li>
                <li> <i class="fas fa-check-square fa-2x"> ${selectFood.strIngredient3} </i> </li>
                <li> <i class="fas fa-check-square fa-2x"> ${selectFood.strIngredient4} </i> </li>
                <li> <i class="fas fa-check-square fa-2x"> ${selectFood.strMeasure1} </i> </li>
                <li> <i class="fas fa-check-square fa-2x"> ${selectFood.strMeasure2} </i> </li>
                <li> <i class="fas fa-check-square fa-2x"> ${selectFood.strMeasure3} </i> </li>
                <li> <i class="fas fa-check-square fa-2x"> ${selectFood.strMeasure4} </i> </li>
          </div>
    `

}

const displayError = error => {
    const errorMsg = document.getElementById('err-Msg');
    errorMsg.innerText = error;
}