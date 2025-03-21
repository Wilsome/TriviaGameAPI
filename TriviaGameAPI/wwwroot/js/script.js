//create fields
let btnStart;
let btnExit;
let btnConfirm;
let btnBack;
let btnAnswer;
let btnPlayAgain;
let btnLeave;
let btnResume;
let btnRestart;
let selectList;
let playerCount;
let playerContainer;

//constructor
window.addEventListener('load', function(){
    //init variables
    btnStart = this.document.getElementById('start-button');
    btnExit = this.document.getElementById('exit-button');
    btnConfirm = this.document.getElementById('confirm-button');
    btnBack = this.document.getElementById('back-button');
    btnAnswer = this.document.getElementById('answer-button');
    btnPlayAgain = this.document.getElementById('play-again');
    btnLeave = this.document.getElementById('leave-button');
    btnResume = this.document.getElementById('resume-button');
    btnRestart = this.document.getElementById('restart-button');
    selectList = this.document.getElementById('numPlayers');
    playerCount = 2; //setting to default value
    playerContainer = this.document.getElementById('player-container');

    //log
    console.log(playerContainer);
    
   
    //non button listeners
    selectList.addEventListener('change', getPlayerCount)
    
    
   
   //check if the buttons exist on each page before adding the listeners
   //intro page
   if(btnStart && btnExit){
    //add listeners
    btnStart.addEventListener('click', toPlayerPage);
    btnExit.addEventListener('click', toExitPage);
   }
   //playersetup page
   if(btnConfirm && btnExit){
    btnConfirm.addEventListener('click', toTriviaSetupPage);
    btnExit.addEventListener('click', toExitPage);
   } 
   //triviaSetup page
   if(btnConfirm && btnBack && btnExit){
    btnConfirm.addEventListener('click', toGamePlayPage);
    btnBack.addEventListener('click', toPlayerPage);
    btnExit.addEventListener('click', toExitPage);
   }
   //Game play page
   if(btnAnswer && btnExit){
    btnAnswer.addEventListener('click', btnClicked);
    btnExit.addEventListener('click',  toExitPage);
   }
   //Conclusion page
   if(btnPlayAgain && btnExit){
    btnPlayAgain.addEventListener('click', toPlayerPage);
    btnExit.addEventListener('click', toExitPage);
   }
   //Exit page
   if(btnLeave && btnResume && btnRestart){
    btnLeave.addEventListener('click', toThankyouPage);
    btnResume.addEventListener('click', btnClicked);
    btnRestart.addEventListener('click', toPlayerPage);
   }
})

//Html navigations
function btnClicked(event){
    console.log(event.target.id);  
}

function toPlayerPage(){
    window.location.href = 'PlayerSetup.html';
}

function toTriviaSetupPage(){
    window.location.href = 'TriviaSetup.html';
}

function toGamePlayPage(){
    window.location.href = 'GamePlay.html';
}

function toExitPage(){
    window.location.href = 'Exit.html';
}

function toThankyouPage(){
    window.location.href = 'Thanks.html';
}

function logEvent(event){
    console.log(event.target.value);
    
}

//Captures the number of players
function getPlayerCount(event){
    //update player count
    playerCount = event.target.value;
    console.log(`amount of players is ${playerCount}`);
    
}

//dynamically generate the amount of player inputs needed. 
function playerInputs(){
    
}