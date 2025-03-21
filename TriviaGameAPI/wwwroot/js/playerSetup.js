// Fields
let btnConfirm;
let btnExit;
let playerContainer;
let playerSelect;
let playerCount;
let playerList;

// Constructor
window.addEventListener('load', function () {
    // Initialize fields
    btnConfirm = document.getElementById('confirm-button');
    btnExit = document.getElementById('exit-button');
    playerContainer = document.getElementById('player-container');
    playerSelect = this.document.getElementById('player-select');
    playerCount = 0;
    playerList = [];

    //log
   

    // Add listeners
    btnConfirm.addEventListener('click', validatePlayerInputs);
    btnExit.addEventListener('click', GameApp.toExitPage);
    playerSelect.addEventListener('change', createPlayerInputs);
    
});

//dynamically create x number of input for players names
function createPlayerInputs() {
    playerContainer.style.display = 'block';

    // Clear existing inputs in the container
    playerContainer.innerHTML = '';

    // Get the number of players
    playerCount = playerSelect.value;

    // Loop to create input elements
    for (let i = 0; i < playerCount; i++) {
        // Create the input element
        let inputElement = document.createElement('input');
        inputElement.id = `player${i + 1}`;
        inputElement.placeholder = `Player ${i + 1} name`;

        // Create a span for validation messages
        let validationSpan = document.createElement('span');
        validationSpan.id = `validation${i + 1}`; // Unique ID for each span
        validationSpan.style.color = 'red'; // Optional: Make validation messages visible

        // Add event listener for real-time validation
        inputElement.addEventListener('input', function () {
            validatePlayerName(inputElement.value, validationSpan);
        });

        // Attach elements to the parent container
        playerContainer.appendChild(inputElement);
        playerContainer.appendChild(validationSpan);
    }
}


//validate players name
function validatePlayerName(playerName, validationSpan) {
    // Check if the name length is valid
    if (playerName.length >= 3 && playerName.length <= 20) {
        validationSpan.textContent = ''; // Clear error message if valid
    } else {
        validationSpan.textContent = 'Name must be between 3-20 characters.'; // Display error
    }
}

//final validation and add players to list
function validatePlayerInputs() {
    let isValid = true; // Track overall validity
    playerList = []; // Reset the player list

    for (let i = 0; i < playerCount; i++) {
        // Get the input element by ID
        const inputElement = document.getElementById(`player${i + 1}`);
        const validationSpan = document.getElementById(`validation${i + 1}`);
        const playerName = inputElement.value.trim();

        // Validate the player name
        if (playerName.length >= 3 && playerName.length <= 20) {
            validationSpan.textContent = ''; // Clear validation message
            playerList.push(playerName); // Add to the player list
        } else {
            validationSpan.textContent = 'Name must be between 3-20 characters.';
            isValid = false; // Mark as invalid
        }
    }

    //store player count in session storage 
    sessionStorage.setItem("playerCount", playerList.length);


    // If valid, proceed to API call
    if (isValid) {
        sendPlayerDataToApi();
    } else {
        console.log('Validation failed. Please check the inputs.');
    }
}

//send player data to the Api
/*function sendPlayerDataToApi() {
    const apiEndpoint = 'https://localhost:7047/api/Player'; // Replace with your actual API URL
    
    // Map playerList into an array of objects with the expected format
    const requestData = playerList.map(name => ({ Name: name }));

    fetch(apiEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestData),
    })
    .then(async response => {
        if (!response.ok) {
            const errorText = await response.text(); // Await the error text
            throw new Error(errorText); // Throw the error for catch to handle
        }
        return await response.json(); // Await the parsed JSON response
    })
    .then(data => {
        console.log('Players successfully added:', data);
        //window.location.href = "/TriviaGameAPI/wwwroot/html/TriviaSetup.html"; // Navigate to the next page
        GameApp.toTriviaSetupPage();
    })
    .catch(error => {
        alert(`Error: ${error.message}`); // Display the error message to the user
        console.error('API Error:', error);
    });
    
    
}*/

/*
function sendPlayerDataToApi() {
    // Map playerList into an array of objects with the expected format
    const requestData = playerList.map(name => ({ Name: name }));

    // Use GameApp.apiRequest for the API call
    GameApp.apiRequest("/Player", "POST", requestData) // Pass the endpoint, method, and data
        .then(data => {
            console.log('Players successfully added:', data); // Log the successful response
            GameApp.toTriviaSetupPage(); // Navigate to the next page
        })
        .catch(error => {
            alert(`Error: ${error.message}`); // Show error to the user
            console.error('API Error:', error); // Log error for debugging
        });
}
*/
function sendPlayerDataToApi() {
    // Build the request payload in the correct format
    const requestData = {
        playerNames: playerList // Send as a list of strings (names only)
    };

    // Use GameApp.apiRequest for the API call
    GameApp.apiRequest("/Player/addPlayers", "POST", requestData)
        .then(data => {
            console.log('Players successfully added:', data); // Log the successful response
            GameApp.toTriviaSetupPage(); // Navigate to the next page
        })
        .catch(error => {
            alert(`Error: ${error.message}`); // Show error to the user
            console.error('API Error:', error); // Log error for debugging
        });
}

