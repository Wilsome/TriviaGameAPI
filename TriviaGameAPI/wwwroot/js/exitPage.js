// Fields
let btnLeave;
let btnResume;
let btnRestart;

// Constructor
window.addEventListener('load', function () {
    // Initialize fields
    btnLeave = document.getElementById('leave-button');
    btnResume = document.getElementById('resume-button');
    btnRestart = document.getElementById('restart-button');

    // Add listeners
    btnLeave.addEventListener('click', GameApp.toThankyouPage);
    //btnResume.addEventListener('click', GameApp.btnClicked);
    btnRestart.addEventListener('click', GameApp.toPlayerPage);
});
