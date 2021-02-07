const inputText = document.getElementById("input-text");
const searchBtn = document.getElementById("search-button")

searchBtn.addEventListener('click', function () {
    const searchItem = inputText.value;
    if (searchItem === "") {
        alert("please enter something")
    } else {
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchItem}`
        fetch(url)
            .then(res => res.json())
            .then(data => displayMeals(data.meals))
            .catch(error => alert("No food found"))
    }

})

const displayMeals = meals => {
    const mealsDiv = document.getElementById('meals');
    meals.forEach(meal => {
        const mealDiv = document.createElement('div');
        mealDiv.className = 'meal';

        const mealInfo = `
            <p hidden>${meal.idMeal}</p>
            <img src='${meal.strMealThumb}'>
            <h3>${meal.strMeal}</h3>
            <button onclick="handleMealInfo('${meal.idMeal}')">details</button>
        `
        mealDiv.innerHTML = mealInfo;
        mealsDiv.appendChild(mealDiv);
    });
}

const handleMealInfo = (id) => {
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    fetch(url)
        .then(res => res.json())
        .then(data => renderMealInfo(data.meals))
}

const renderMealInfo = info => {
    const detailDiv = document.getElementById('meal-details');
    detailDiv.innerHTML = `
        <img src='${info[0].strMealThumb}'>
        <h1>${info[0].strMeal}</h1>
        <h3>Ingredients: </h3>
        <p>${info[0].strIngredient1}</p>
        <p>${info[0].strIngredient2}</p>
        <p>${info[0].strIngredient3}</p>
        <p>${info[0].strIngredient4}</p>
        <p>${info[0].strIngredient5}</p>
        <p>${info[0].strIngredient6}</p>
        <p>${info[0].strIngredient7}</p>
        <p>${info[0].strIngredient8}</p>
    `
}


