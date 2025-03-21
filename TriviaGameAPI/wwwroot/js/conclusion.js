// Fields
let btnPlayAgain;
let btnExit;

// Constructor
window.addEventListener('load', function () {
    // Initialize fields
    btnPlayAgain = document.getElementById('play-again');
    btnExit = document.getElementById('exit-button');

    // Populate game stats
    displayGameStats();

    // Add listeners
    btnPlayAgain.addEventListener('click', GameApp.toPlayerPage);
    btnExit.addEventListener('click', GameApp.toThankyouPage);
    console.log("SessionStorage on conclusion page:", sessionStorage.getItem('gameSummary'));

});


function displayGameStats() {
    console.log("Displaying game stats...");

    // Retrieve and parse the stored game summary
    const storedSummary = sessionStorage.getItem('gameSummary');
    if (!storedSummary) {
        console.error("No game summary found in session storage.");
        return;
    }

    const parsedSummary = JSON.parse(storedSummary);
    const gameSummary = parsedSummary.gameSummary || {}; // Access the nested gameSummary object

    // Safely extract players and totalQuestions
    const players = gameSummary.players || [];
    const totalQuestions = gameSummary.totalQuestions || 0;

    console.log("Game Summary Data:", { players, totalQuestions });

    // Access DOM elements
    const totalQuestionsElement = document.getElementById('total-questions');
    const playerCountElement = document.getElementById('player-count');
    const leaderboardContainer = document.getElementById('leaderboard-container');
    const winnerTextElement = document.getElementById('winner-text');

    if (totalQuestionsElement) {
        totalQuestionsElement.textContent = totalQuestions;
    } else {
        console.error("Element with ID 'total-questions' not found.");
    }

    if (playerCountElement) {
        playerCountElement.textContent = players.length;
    } else {
        console.error("Element with ID 'player-count' not found.");
    }

    if (!leaderboardContainer) {
        console.error("Element with ID 'leaderboard-container' not found.");
        return;
    }

    // Determine the winner(s) and sort the standings
    players.sort((a, b) => b.score - a.score); // Sort players by score (descending)
    const highestScore = players[0]?.score || 0;
    const winners = players.filter(player => player.score === highestScore); // Identify all players with the highest score

    // Announce the winner(s)
    if (winnerTextElement) {
        if (winners.length > 1) {
            const tiedNames = winners.map(player => player.name).join(", ");
            winnerTextElement.textContent = `It's a tie! Winners: ${tiedNames} with ${highestScore} points each!`;
        } else if (winners.length === 1 && highestScore > 0) {
            winnerTextElement.textContent = `Winner: ${winners[0].name} with ${highestScore} points!`;
        } else {
            winnerTextElement.textContent = `No winners this time.`;
        }
    }

    // Populate the leaderboard dynamically
    leaderboardContainer.innerHTML = ""; // Clear any existing content
    players.forEach((player, index) => {
        const playerStats = document.createElement('div');
        playerStats.className = "player-stats";

        // Highlight the winners
        const isWinner = winners.includes(player);

        playerStats.innerHTML = `
            <p class="${isWinner ? 'winner' : ''}">Player: ${player.name || "Unknown"}</p>
            <p>Score: ${player.score || 0}</p>
            <p>Percentage Correct: ${player.percentageCorrect || 0}%</p>
            <p>Standing: ${index + 1}</p>
        `;

        leaderboardContainer.appendChild(playerStats);
    });
}
