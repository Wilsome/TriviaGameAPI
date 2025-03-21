// Fields
let btnStart;
let btnExit;

// Constructor
window.addEventListener('load', function () {
    // Initialize fields
    btnStart = document.getElementById('start-button');
    btnExit = document.getElementById('exit-button');

    // Add listeners
    btnStart.addEventListener('click', GameApp.toPlayerPage);
    btnExit.addEventListener('click', GameApp.toExitPage);
});
