//Listener for submit
document.querySelector('#calorie-form').addEventListener('submit', function(e) {
    hideResults();
    hideChart();
    displayLoading();
    setTimeout(calculateResults, 2000);
    e.preventDefault();
});

//Calculate daily calorie requirements
function calculateResults() {
    //UI vars
    const height = document.querySelector('#height').value;
    const weight = document.querySelector('#weight').value;
    const age = document.querySelector('#age').value;
    const sex = document.querySelector('#sex').value;
    const activity = document.querySelector('#activity').value;

    //Output vars
    const dailyCalorieRequirements = document.querySelector('#dailyCalorie');
    const daliyProteinIntake = document.querySelector('#dailyProtein');
    const dailyCarbsIntake = document.querySelector('#dailyCarbs');
    const dailyFatIntake = document.querySelector('#dailyFat');

    //calculating basal metabolic rate
    const bmr = ((10 * weight) + (6.25 * height) - (5 * age)) + parseFloat(sex);
 
    if (isFinite(bmr)) {
        let dailyCalorie = bmr * parseFloat(activity);
        dailyCalorieRequirements.value = Math.round(dailyCalorie);
        daliyProteinIntake.value = getAmountOfMacronutrient(dailyCalorieRequirements.value, 25, 'p');
        dailyCarbsIntake.value = getAmountOfMacronutrient(dailyCalorieRequirements.value, 35, 'c');
        dailyFatIntake.value = getAmountOfMacronutrient(dailyCalorieRequirements.value, 40, 'f');
        displayResults();
        hideLoading();
        displayMacrosRatioChart();
    } else {
        showError('!!لطفا مقدار وارد شده را برسی کنید');
    }
}

//Function returns amount of macronutrient in grams
function getAmountOfMacronutrient(dailyCalorie, procent, macro) {
    let caloriePerGram;
    if (macro === 'p' || macro === 'c') {
        caloriePerGram = 4;
    } else if (macro === 'f') {
        caloriePerGram = 9;
    }
    return Math.round((dailyCalorie * (procent / 100)) / caloriePerGram);
}

//Function create div with error message 
function showError(error) {
    hideResults();
    hideLoading();
    const errorDiv = document.createElement('div');
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');
    errorDiv.className = 'alert alert-danger';
    errorDiv.appendChild(document.createTextNode(error));
    card.insertBefore(errorDiv, heading);

    //Clear error after 3 sec
    setTimeout(clearError, 3000);
}

function clearError() {
    document.querySelector('.alert').remove();
}

function displayLoading() {
    document.querySelector('#loading').style.display = 'block';
}

function hideLoading() {
    document.querySelector('#loading').style.display = 'none';
}

function displayResults() {
    document.querySelector('#results').style.display = 'block';
}

function hideResults() {
    document.querySelector('#results').style.display = 'none';
}

function displayMacrosRatioChart() {
    displayChart();
    const caloriesFromProtein = document.querySelector('#dailyProtein').value * 4;
    const caloriesFromCarbs = document.querySelector('#dailyCarbs').value * 4;
    const caloriesFromFat = document.querySelector('#dailyFat').value * 9;
    const myChart = document.querySelector('#macrosRatioChart').getContext('2d');
    
    const macrosRatioChart = new Chart(myChart, {
        type:'pie',
        data:{
            labels:['پروتئین', 'چربی', 'کربوهیدرات'],
            datasets:[{
                label:'Calories',
                data:[caloriesFromProtein, caloriesFromFat, caloriesFromCarbs],
                backgroundColor:[
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(75, 192, 192, 0.6)'
                  ],
                  borderWidth:1,
                  borderColor:'#777',
                  hoverBorderWidth:2,
                  hoverBorderColor:'#000'
                }]
        },
        options:{
            title:{
                display:true,
                text:'نسبت کالری',
                fontSize:25
            }
        }
    });
}

function displayChart() {
    document.querySelector('#chart').style.display = 'block';
}

function hideChart() {
    document.querySelector('#chart').style.display = 'none';
}