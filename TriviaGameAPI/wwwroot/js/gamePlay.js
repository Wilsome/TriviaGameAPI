// Fields
let btnAnswer, btnExit;
let triviaQuestions, currentQuestionIndex;
let container, playerRoundContainer, currentPlayerDisplay, currentRoundDisplay, totalRoundDisplay;
let questionContainer, questionDisplay, answerContainer, feedbackDisplay, feedbackText, buttonContainer, leaderboardContainer;

// Constructor
document.addEventListener('DOMContentLoaded', async function () {
    initializeFields();
    loadTriviaQuestions();

    console.log("Loaded Trivia Questions:", JSON.stringify(triviaQuestions, null, 2));

    try {
        // Start the game (initialize the backend state)
        console.log("Attempting to start the game...");
        await fetch('https://localhost:7047/api/Game/startGame', { method: 'POST' })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Failed to start game. Status: ${response.status}`);
                }
                console.log("Game started successfully!");
            });

        // After starting the game, fetch the current turn
        fetchCurrentTurn();
    } catch (error) {
        console.error("Error starting the game:", error);
    }

    // Add listeners
    btnAnswer.addEventListener('click', getUsersAnswer);
    btnExit.addEventListener('click', GameApp.toExitPage);
});

// Initialize DOM fields
function initializeFields() {
    btnAnswer = document.getElementById('answer-button');
    btnExit = document.getElementById('exit-button');
    container = document.getElementById('container');
    playerRoundContainer = document.getElementById('player-round-container');
    currentPlayerDisplay = document.getElementById('current-player');
    currentRoundDisplay = document.getElementById('current-round');
    totalRoundDisplay = document.getElementById('total-rounds');
    questionContainer = document.getElementById('question-container');
    questionDisplay = document.getElementById('question-display');
    answerContainer = document.getElementById('answer-container');
    feedbackDisplay = document.getElementById('feedback');
    feedbackText = document.getElementById('feedback-text');
    buttonContainer = document.getElementById('button-container');
    leaderboardContainer = document.getElementById('leaderboard-container');
    currentQuestionIndex = 0;
}


// Load trivia questions from session storage
function loadTriviaQuestions() {
    const storedQuestions = sessionStorage.getItem('triviaQuestions');
    if (storedQuestions) {
        const parsedData = JSON.parse(storedQuestions);
        triviaQuestions = parsedData.questions || []; // Extract the questions array
    } else {
        triviaQuestions = []; // Default to an empty array if nothing is stored
    }

    if (!triviaQuestions || triviaQuestions.length === 0) {
        console.error("No trivia questions found in session storage.");
    }
}

// Display the current question and options
function displayCurrentQuestion() {
    if (currentQuestionIndex >= triviaQuestions.length) {
        console.log("All questions have been displayed. End of game.");
        alert("Game Over!");
        return;
    }

    const currentQuestion = triviaQuestions[currentQuestionIndex];
    console.log(`Displaying Question Index: ${currentQuestionIndex}`);
    console.log("Current Question:", currentQuestion);

    // Display question text
    questionDisplay.textContent = currentQuestion.questionText;

    // Render answer options
    renderAnswerOptions(currentQuestion);

    currentQuestionIndex++;
}

// Render the answer options as radio buttons
function renderAnswerOptions(question) {
    console.log("Rendering Answer Options for Question:", question); // Debugging

    // Validate question and possibleAnswers
    if (!question || !Array.isArray(question.possibleAnswers)) {
        console.error("Invalid question object passed to renderAnswerOptions:", question);
        return;
    }

    const answerOptions = document.getElementById('answer-options');
    answerOptions.innerHTML = ""; // Clear previous options

    question.possibleAnswers.forEach((answer, index) => {
        const label = document.createElement("label");
        const input = document.createElement("input");

        input.type = "radio";
        input.name = "answer";
        input.value = answer;
        input.id = `answer-${index}`;

        label.setAttribute("for", input.id);
        label.textContent = decodeHtmlEntities(answer);

        // Append input and label to container
        answerOptions.append(input, label, document.createElement("br"));
    });
}

// Capture the user's answer and provide feedback
async function getUsersAnswer() {
    const selectedOption = document.querySelector('input[name="answer"]:checked');

    if (!selectedOption) {
        showFeedback("Please select an answer!", "red");
        return;
    }

    const userAnswer = selectedOption.value;
    const playerName = document.getElementById("current-player").textContent;

    try {
        // Submit the answer to the backend
        const result = await GameApp.apiRequest('/game/submitAnswer', 'POST', {
            PlayerName: playerName,
            Answer: userAnswer
        });

        console.log("API Response:", result);

        // Show feedback based on correctness
        //const color = result.isCorrect ? "green" : "red";
        //showFeedback(`${result.message} Correct Answer: ${result.correctAnswer}`, color);
        // Simplify feedback display
        const feedbackMessage = result.isCorrect 
            ? "Correct!" 
            : `Incorrect! Correct Answer: ${result.correctAnswer}`;
        const feedbackColor = result.isCorrect ? "green" : "red";

        showFeedback(feedbackMessage, feedbackColor);

        // Update the player's score dynamically
        const currentScoreElement = document.getElementById("current-score");
        if (currentScoreElement && result.UpdatedScore !== undefined) {
            currentScoreElement.textContent = result.UpdatedScore;
        }

        // Advance the turn
        advanceTurn();

    } catch (error) {
        console.error("Error submitting answer:", error);
    }
}

// Display feedback to the user
function showFeedback(message, color) {
    feedbackText.textContent = message;
    feedbackText.style.color = color;
    feedbackDisplay.style.display = "block";
}

// Fetch the current player's turn and display it
function fetchCurrentTurn() {
    console.log("Starting fetchCurrentTurn...");

    // Retrieve and parse player count
    const playerCount = parseInt(sessionStorage.getItem("playerCount"), 10);
    console.log("Player Count from sessionStorage:", playerCount);

    fetch('https://localhost:7047/api/game/currentTurn')
    .then(response => {
        console.log("API Response Status:", response.status);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log("Full API Response:", data); // Log the entire response object
        console.log("Game Summary from API before storing=========================:", data.GameSummary);

        let myData = data;

        if (data.message === "Game Over!") {
            console.log("Game Over detected in current turn.");
           
            console.log("Game Summary from API:", data); // Log GameSummary directly
            const gameSummary = myData || { Players: [], TotalQuestions: 0 };
            sessionStorage.setItem('gameSummary', JSON.stringify(gameSummary));
            console.log("SessionStorage before redirect==========================:", sessionStorage.getItem('gameSummary'));

            window.location.href = "conclusion.html";
            return;
        }
        
            // Validate required fields in backend response
            if (!data.question || !Array.isArray(data.possibleAnswers)) {
                console.error("Invalid data received from /currentTurn. Full data:", data);
                return;
            }

            // Map backend response fields
            const questionText = data.question;
            const possibleAnswers = data.possibleAnswers;

            // Log mapped variables for easier debugging
            console.log("Mapped Question Text:", questionText);
            console.log("Mapped Possible Answers:", possibleAnswers);

            // Calculate the current round dynamically
            const currentRound = Math.floor(data.currentQuestionIndex / playerCount) + 1;

            // Safely update UI elements
            document.getElementById("current-player").textContent = data.player || "Unknown Player";
            document.getElementById("question-display").textContent = questionText;
            document.getElementById("current-round").textContent = currentRound;

            // Render answer options
            renderAnswerOptions({
                questionText: questionText,
                possibleAnswers: possibleAnswers
            });
        })
        .catch(error => {
            console.error("Error fetching current turn:", error);
            alert("An error occurred while fetching the current turn. Please try again.");
        });
}


// Advance the turn to the next player or question
function advanceTurn() {
    console.log("Advancing turn...");
    const url = `${GameApp.apiBaseUrl}/game/nextTurn`;

    fetch(url, { method: 'POST' })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (data.IsGameOver) {
                console.log("Game Over: Redirecting to conclusion page.");
                // Redirect to conclusion.html
                window.location.href = "conclusion.html";
                return;
            }

            console.log("Turn advanced successfully.");
            fetchCurrentTurn(); // Fetch the next turn
        })
        .catch(error => console.error("Error advancing turn:", error));
}

// Utility to decode HTML entities
function decodeHtmlEntities(text) {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = text;
    return textarea.value;
}
