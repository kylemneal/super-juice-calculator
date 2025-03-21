// Data for recipes
const recipes = {
    lime: { peels: 100, citric: 44, malic: 7, water: 1000 },
    lemon: { peels: 100, citric: 47, malic: 9, water: 1000 },
    orange: { peels: 100, citric: 23, malic: 2, sugar: 70, water: 1000 },
    grapefruit: { peels: 100, citric: 15, malic: 2, sugar: 70, msg: 4, water: 1000 }
};

// Elements
const recipeSelect = document.getElementById('recipe-select');
const inputSection = document.getElementById('input-section');
const peelWeightInput = document.getElementById('peel-weight');
const calculateBtn = document.getElementById('calculate-btn');
const resultSection = document.getElementById('result-section');
const resultList = document.getElementById('result-list');

// Show input section on recipe selection
recipeSelect.addEventListener('change', () => {
    inputSection.style.display = 'block';
    resultSection.style.display = 'none';

    // Get the title element and the calculate button
    const title = document.querySelector('h1');
    let selectedColor;

    // Determine the color based on the selected recipe
    switch (recipeSelect.value) {
        case 'lime':
            selectedColor = 'green';
            break;
        case 'lemon':
            selectedColor = '#d4af37';
            break;
        case 'orange':
            selectedColor = 'orange';
            break;
        case 'grapefruit':
            selectedColor = 'pink';
            break;
        default:
            selectedColor = '#0073e6'; // default blue color
    }

    // Update the title text color and button background color
    title.style.color = selectedColor;
    calculateBtn.style.backgroundColor = selectedColor;
});


// Helper function to format numbers
const formatNumber = (number) => {
    return number % 1 === 0 ? number.toFixed(0) : number.toFixed(2);
};

// Helper function to format water
const formatWater = (waterAmount) => {
    if (waterAmount < 1000) {
        return `${formatNumber(waterAmount)} mL`;
    } else {
        return `${formatNumber(waterAmount / 1000)} L`;
    }
};

// Function to calculate and display results
const calculateResults = () => {
    const selectedRecipe = recipeSelect.value;
    const peelWeight = parseFloat(peelWeightInput.value);

    if (!peelWeight || peelWeight <= 0) {
        alert('Please enter a valid peel weight.');
        return;
    }

    const recipe = recipes[selectedRecipe];
    resultList.innerHTML = ''; // Clear previous results

    for (const [ingredient, amount] of Object.entries(recipe)) {
        const scaledAmount = (peelWeight / recipe.peels) * amount;

        if (ingredient === 'water') {
            resultList.innerHTML += `<li>${ingredient}: ${formatWater(scaledAmount)}</li>`;
        } else {
            const unit = 'g';
            resultList.innerHTML += `<li>${ingredient}: ${formatNumber(scaledAmount)} ${unit}</li>`;
        }
    }

    resultSection.style.display = 'block';
};

// Trigger calculation when the calculate button is clicked
calculateBtn.addEventListener('click', calculateResults);

// Trigger calculation when "Enter" key is pressed
peelWeightInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        calculateResults();
    }
});
