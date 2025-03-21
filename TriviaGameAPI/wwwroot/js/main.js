//for shared logics across pages

// Define a single global object for shared logic and methods
const GameApp = {
    //api base url
    apiBaseUrl: 'https://localhost:7047/api',
    // Navigation Methods
    toPlayerPage: function() {
        window.location.href = 'PlayerSetup.html';
    },
    toTriviaSetupPage: function() {
        window.location.href = 'TriviaSetup.html';
    },
    toGamePlayPage: function() {
        window.location.href = 'GamePlay.html';
    },
    toExitPage: function() {
        window.location.href = 'Exit.html';
    },
    toThankyouPage: function() {
        window.location.href = 'Thanks.html';
    },

    // Utility Methods
    getPlayerCount: function(event) {
        // Update the player count based on the dropdown value
        GameApp.playerCount = event.target.value;
        console.log(`Amount of players is ${GameApp.playerCount}`);
    },

    apiRequest: async function(endpoint, method = "GET", body = null) {
        try {
            console.log(`API Request URL: ${GameApp.apiBaseUrl}${endpoint}`);

            const response = await fetch(`${GameApp.apiBaseUrl}${endpoint}`, {
                method: method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: body ? JSON.stringify(body) : null
            });

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || "Unknown error occurred");
            }

            return await response.json();
        } catch (error) {
            console.error("API Request Error:", error);
            throw error;
        }
    },

    btnClicked: function(event) {
        // Log the button ID for debugging purposes
        console.log(event.target.id);
    },

};
