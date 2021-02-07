// First step : ES6 Variable declare with querySelector class target 

const mainUrl = "https://www.themealdb.com/api/json/v1/1/";

const inputSearch = document.querySelector(".input-search");

const searchButton = document.querySelector(".search-button");;

const mealsContainerDisp = document.querySelector(".Meals-container");

const containersDetails = document.querySelector(".Meals-details");;


// Second Step : When Users search button click Then Display This Outpoot Code is here


searchButton.addEventListener("click", () => MealSearch(inputSearch.value));

// Search meal by name or any keyword
const MealSearch = keyword => {
    if (keyword != "") {
        searchMsg(mealsContainerDisp, true);

        const url = `${mainUrl}search.php?s=${keyword}`;

        fetch(url)
            .then(data => data.json())
            .then(data => {
                searchMsg(mealsContainerDisp, false);
                displayMeals(data);
            });
    } else {
        mealsContainerDisp.innerHTML = "";
    }
}

// step-3 : display All meals To search result

const displayMeals = data => data.meals != null ? mealsContainerDisp.innerHTML = createDiv(data) : notMatchingAlert();

const createDiv = data => {

    const sectionMeals = data.meals;

    let str = "";
    sectionMeals.forEach(data => {

        str = str + `<div class="food-item" onclick="divClickd(${data.idMeal})">

                        <div class="every-Meals">
                            <img src="${data.strMealThumb}"/>
                             <h3 class = f-name>${data.strMeal}</h3>
                              </div>

                         </div>`;

    });

    return str;
}




// step-4: Meal Details if You any Select Food

const divClickd = id => {

    const myUrl = `${mainUrl}lookup.php?i=${id}`;

    fetch(myUrl)

        .then(data => data.json())
        .then(data => {

            const foodDetails = data.meals[0];

            containersDetails.innerHTML = `

            <div class ="clicked-Div-details">

                    <div class = first-div>
                       <h4> ${foodDetails.strMeal} </h4>
                      <img class="card-img-top details-image" src="${foodDetails.strMealThumb}">
                     </div>

                     <div class="card-body second-div">
                            <h4> The ingredients </h4>
                            <li> ${foodDetails.strMeasure1} </li>
                            <li> ${foodDetails.strMeasure2} </li>
                            <li> ${foodDetails.strMeasure3} </li>
                            <li> ${foodDetails.strMeasure4} </li>
                            <li> ${foodDetails.strMeasure5} </li>
                            <li> ${foodDetails.strMeasure6} </li>
                      </div>
            </div>
         `;
        });
}

/* When Display search True Or false Then Show This Outpoot.
1.If arguments false Then show not matching massage. 
2.But when The outpoot is True then work This Code  */

const searchMsg = (div, order) => order ? div.innerHTML = `<div></div>` : "";





// last Step : Not matching any Meal Then User recommend Alert and Suggest msg for Right Word search
const notMatchingAlert = () => mealsContainerDisp.innerHTML = `
            <div class = not-match>
                <h2>Opps! Try Again Please</h2>
                <h5> Suggest This Word: S, sea , A a B, b</h5>
            </div>
            `;
