// Fields
let btnConfirm;
let btnBack;
let btnExit;
let selectCategory;
let selectQuestionCount;
let categorySpan;
let roundSpan;
let playerCount;
let totalQuestions;

// Constructor
window.addEventListener('load', function () {
    // Initialize fields
    btnConfirm = document.getElementById('confirm-button');
    btnBack = document.getElementById('back-button');
    btnExit = document.getElementById('exit-button');
    selectCategory = this.document.getElementById('category-select');
    selectQuestionCount = this.document.getElementById('round-select');
    categorySpan = this.document.getElementById('category-span');
    roundSpan = this.document.getElementById('round-span');
    playerCount = playerCount = parseInt(sessionStorage.getItem("playerCount"), 10);
    totalQuestions = 0;

    //log
    console.log(`your player count is ${playerCount}`);
    console.log(`Initial category: ${selectCategory}`);
    console.log(`Initial question count: ${selectQuestionCount}`);
    
    // Add listeners
    //btnConfirm.addEventListener('click', GameApp.toGamePlayPage);
    btnConfirm.addEventListener('click', handleConfirmClick);
    btnBack.addEventListener('click', GameApp.toPlayerPage);
    btnExit.addEventListener('click', GameApp.toExitPage);
    selectCategory.addEventListener('change', updateInputs);
    selectQuestionCount.addEventListener('change', updateInputs);

});

/*
function getTotalQuestions(event){
    let questionAmount = event.target.value;
    //update totalQuestions
    totalQuestions = questionAmount * playerCount;
    console.log(`amount of questions needed is ${totalQuestions}`);
}

function getValue(event){
    //clear spans
    categorySpan.textContent = '';
    roundSpan.textContent = '';
    console.log(event.target.value);
    console.log(event.target);
    if(event.target.id === 'category-select'){
        console.log('the catergory-select target was changed.');
        
    }
    else{
        console.log('the round select was changed.');
        let questionAmount = event.target.value;
    //update totalQuestions
    totalQuestions = questionAmount * playerCount;
    console.log(`amount of questions needed is ${totalQuestions}`);
    }
    
    
}

function validateInputs(event){
    //clear spans
    categorySpan.textContent = '';
    roundSpan.textContent = '';
    if(event.target.id === 'category-select'){
        console.log('the catergory-select target was changed.');
        //update category value
        selectCategory = event.target.value;
        console.log(`select category value is ${selectCategory}`);
    }
    if(event.target.id ==='round-select'){
        console.log('the round-select target was changed.');
        //update round value
        selectQuestionCount = event.target.value;
        console.log(`select question value is ${selectQuestionCount}`);  
    }

    // Check if a valid category and round number are selected
    if (!selectCategory || !selectQuestionCount) {
        alert("Please select both a category and the number of rounds.");
        return false; // Validation failed
    }

    return { selectCategory, selectQuestionCount }; // Return the values if validation passes
}*/

/*
function updateInputs(event) {
    // Clear validation spans
    categorySpan.textContent = '';
    roundSpan.textContent = '';

    // Update values based on the changed dropdown
    if (event.target.id === 'category-select') {
        selectCategory = event.target.value;
        console.log(`Category selected: ${selectCategory}`);
    }
    if (event.target.id === 'round-select') {
        selectQuestionCount = event.target.value;
        console.log(`Number of rounds selected: ${selectQuestionCount}`);
    }
}

function validateTriviaInputs() {
    // Clear the validation spans
    categorySpan.textContent = '';
    roundSpan.textContent = '';

    let isValid = true;

    // Check if a valid category is selected
    /*if (!selectCategory.value) {
        categorySpan.textContent = 'Please select a category.';
        isValid = false;
    }

    if (!isNaN(selectCategory.value)) {
        categorySpan.textContent = 'Please select a category.';
        isValid = false;
    }

    // Check if a valid number of rounds is selected
    if (!isNaN(selectQuestionCount.value)) {
        roundSpan.textContent = 'Please select the number of rounds.';
        isValid = false;
    }

    if (!isValid) {
        console.log('Validation failed: Ensure all inputs are properly selected.');
        return false; // Validation failed
    }

    console.log('Inputs are valid.');
    return { category: selectCategory.value, rounds: selectQuestionCount.value }; // Return valid inputs
}*/

/*
function validateTriviaInputs() {
    // Clear the validation spans
    categorySpan.textContent = '';
    roundSpan.textContent = '';
    categorySpan.style.color = ''; // Reset color
    roundSpan.style.color = ''; // Reset color

    let isValid = true;

    // Check if a valid category is selected
    if (!selectCategory.value || isNaN(parseInt(selectCategory.value, 10))) {
        categorySpan.textContent = 'Please select a valid category.';
        categorySpan.style.color = 'red'; // Set text color to re
        isValid = false;
    }

    // Check if a valid number of rounds is selected
    if (!selectQuestionCount.value || isNaN(parseInt(selectQuestionCount.value, 10))) {
        roundSpan.textContent = 'Please select a valid number of rounds.';
        roundSpan.style.color = 'red'; // Set text color to red
        isValid = false;
    }

    if (!isValid) {
        console.log('Validation failed: Ensure all inputs are properly selected.');
        return false; // Validation failed
    }

    console.log('Inputs are valid.');
    
    return {
        category: parseInt(selectCategory.value, 10),
        rounds: parseInt(selectQuestionCount.value, 10)
    }; // Return parsed inputs
}


function handleConfirmClick(){
    console.log('Confirm button clicked.');

    //validate inputs
    let validatedInputs = validateTriviaInputs(); // Checks inputs and updates spans
    if (!validatedInputs) {
        console.log('Inputs are missing. User cannot proceed.');
        return; // Stop here if validation fails
    }

    //calculate total questions
    totalQuestions = selectCategory * selectQuestionCount;
    console.log(`total question count is ${totalQuestions}`);

    //package data for api call
    let requestData = {
        numberOfQuestions: totalQuestions,
        category: selectCategory,
    }
    
    console.log(`Data: ${requestData}`);

    //make Api call
    GameApp.apiRequest('/Trivia/Setup', 'POST', requestData)
    .then(response =>{
        console.log(`Questions received:`, response);
        
        //store questions in sesson 
        sessionStorage.setItem('triviaQuestions', JSON.stringify(response));
        //navigate
        GameApp.toGamePlayPage();
    })
    .catch(error =>{
        console.error('Error during TriviaSetup API call:', error);
            roundSpan.textContent = 'Error fetching trivia. Please try again.';
    });
    
}
*/

function updateInputs(event) {
    // Clear validation spans
    categorySpan.textContent = '';
    roundSpan.textContent = '';

    // Update values based on the changed dropdown
    if (event.target.id === 'category-select') {
        selectCategory = parseInt(event.target.value, 10) || ""; // Parse value or reset to empty
        console.log(`Category selected: ${selectCategory}`);
    }
    if (event.target.id === 'round-select') {
        selectQuestionCount = parseInt(event.target.value, 10) || ""; // Parse value or reset to empty
        console.log(`Number of rounds selected: ${selectQuestionCount}`);
    }
}

function validateTriviaInputs() {
    // Clear the validation spans
    categorySpan.textContent = '';
    roundSpan.textContent = '';
    categorySpan.style.color = ''; // Reset color
    roundSpan.style.color = ''; // Reset color

    let isValid = true;

    // Check if a valid category is selected
    if (!selectCategory || isNaN(selectCategory)) {
        categorySpan.textContent = 'Please select a valid category.';
        categorySpan.style.color = 'red'; // Set text color to red
        isValid = false;
    }

    // Check if a valid number of rounds is selected
    if (!selectQuestionCount || isNaN(selectQuestionCount)) {
        roundSpan.textContent = 'Please select a valid number of rounds.';
        roundSpan.style.color = 'red'; // Set text color to red
        isValid = false;
    }

    if (!isValid) {
        console.log('Validation failed: Ensure all inputs are properly selected.');
        return false; // Validation failed
    }

    console.log('Inputs are valid.');
    return {
        category: selectCategory,
        rounds: selectQuestionCount
    }; // Return parsed inputs
}


function handleConfirmClick() {
    console.log('Confirm button clicked.');

    // Validate inputs
    const validatedInputs = validateTriviaInputs();
    if (!validatedInputs) {
        console.log('Inputs are missing or invalid. User cannot proceed.');
        return; // Stop if validation fails
    }

    // Calculate total questions
    const { category, rounds } = validatedInputs; // Use validated values
    totalQuestions = rounds * playerCount; // Calculate totalQuestions
    console.log(`Total question count is ${totalQuestions}`);

    // Package data for API call
    const requestData = {
        numberOfQuestions: totalQuestions,
        category: category,
        difficulty: "easy", // Default for now
        type: "" // Default for now
    };

    console.log('Data prepared for API:', requestData);

    // Make API call
    const endpoint = "/TriviaSetup/Setup";

    GameApp.apiRequest(endpoint, 'POST', requestData)
        .then(response => {
            console.log('Questions received:', response);

            // Store questions in session
            sessionStorage.setItem('triviaQuestions', JSON.stringify(response));

            // Navigate
            GameApp.toGamePlayPage();
        })
        .catch(error => {
            console.error('Error during TriviaSetup API call:', error);
            roundSpan.textContent = 'Error fetching trivia. Please try again.';
        });
}



