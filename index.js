//npm to install inquirer 
var inquirer = require('inquirer');
//npm to install the isLetter node
var isLetter = require('is-letter');
//linking the word.js file
var Word = require("./Word.js");
//installing the boxen npm
const boxen = require('boxen');
//install figlet npm 
var figlet = require('figlet');

//When the letter is guessed correctly, it will be changed to true
let userRight = "false";
//Setting Answer Array
let wordArray =["Thanos","Star Lord", "Ant Man", "Iron Man", "Captain America","Spider Man", "Hulk", "Thor"];

//Choosing random word from array
let computerWord;
let someWord;

//Setting variables for wins, losses, and guesses remaining
let wins = 0;
let losses = 0;
let guessesRemaining = 10;


//Storing the letters that were already used
let lettersUsed = "";
let lettersUsedArray = [];

let slots = 0;


figlet("Hangman Game", function(err, data) {
    if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
    }
    console.log(data)
    console.log("Welcome to Hangman!");
    console.log("Can you guess the avengers cast?");
    console.log("I promise there is no spoilers!");
    console.log("=======================================================================");
    console.log("Game Rules: ");
    console.log("=======================================================================");
    console.log("Enter a letter to guess the right avenger");
    console.log("Enter a wrong letter and you will lose a life");
    console.log("Enter the right letter, and you will win");
    console.log("=======================================================================");
    console.log("Universe Needs You!");
    console.log("=======================================================================");
    //function startPlay
    startGame(); 
});

//Use Inquirer package to display game confirmation prompt to user.
function startGame() {
	let playerInfo = [
	 {
	 	type: 'text',
	 	name: 'playerInfo',
	 	message: 'What is this brave heroes name??'
     },
     
	 {
	    type: 'confirm',
	    name: 'readyToPlay',
	    message: 'Are you ready to defeat Thanos?',
	    default: true
	  }
	];

	inquirer.prompt(playerInfo).then(answers => {
		//If the user confirms that they want to play, start game.
		if (answers.playerInfo){
			console.log("Lets get ready to Rumble!");
			startPlay();
		}

		else {
			//If the user decides they don't want to play, exit game.
			console.log("Okay, you're probably a DC fan!");
			return;
		}
    });
}

    //Use Inquirer to start the game
function startPlay() {
 //Setting the guesses to 10 when the game starts
 guessesRemaining = 10;
 //picking a random word from the array
 computerWord();
 //When the game is reset, reset the chosen letters
let lettersUsed = "";
let lettersUsedArray = [];
}

function generateRandomWord(){

//Generate a random word to guess
computerWord = wordArray[Math.floor(Math.random() * wordArray.length)].toUpperCase();
//Set the random word into someword from the word.js file
someWord = new Word (randomWord);
//Use the Word constructor in Word.js to split the word and generate letters.
someWord.splitWord();
someWord.generateLetters();
guessLetter();
}
function guessLetter()
{
    //Using the inquirer npm to prompt the user to guess a letter
if (slots < someWord.letters.length || guessesRemaining > 0) {
        inquirer.prompt([
      { 
        name: "letter",
        message: "Guess a letter:",
        //Check if value is a letter and not a word using isLetter npm
        validate: function(value) {
            if(isLetter(value)){
              return true;
            } 
            else {
              return false;
            }
          }
      }
    ]).then(function(guess) {
    //convert guessed letters to uppercase
    guess.letter.toUpperCase();
    console.log("You guessed: " + guess.letter.toUpperCase());
    userRight = false;
    //if letters were duplicate
    if (lettersUsedArray.indexOf(guess.letter.toUpperCase()) > -1) {
		//If user already guessed a letter, run inquirer again to prompt them to enter a different letter.
        console.log("You already guessed that letter. Enter another one.");
        guessLetter()
}
//If the letters enter were not guessed
if (lettersUsedArray.indexOf(guess.letter.toUpperCase()) === -1) {
    //Adding letters to the guessed list
    lettersUsed  = lettersUsed.concat(" " + guess.letter.toUpperCase());
    lettersUsedArray.push(guess.letter.toUpperCase());
    //Showing the letters to the user
    console.log(boxen("letters already used are: ") + lettersUsedArray,{padding: 1});
    
    //create a loop to see which letters match the word
    for (i=0; i < someWord.letters.length; i++) {
if (guess.letter.toUpperCase() === someWord.letters[i].character && someWord.letters[i].userRight === false) {
    someWord.letters[i].userRight === true;
    userRight = true;
    someWord.underscores[i] = guess.letter.toUpperCase()
    slots++
}
}

    console.log("Guess a word to defeat Thanos!")
    someWord.splitWord();
	someWord.generateLetters();

    //If the letter is guessed correctly 
        if(userRight){
        console.log("You are close to defeating Thanos!")
        checkIfCorrect();
        }
        else{
            console.log("Dont be a Star-Lord! Make the right decision!")
            guessesRemaining --;
            console.log("Guesses Left: " + guessesRemaining);
            checkIfCorrect();
        }
    }
    });
}
}
//Function is used to see if the user won or lost to Thanos
function checkIfCorrect() {
    //If the guesses are down to zero
    if (guessesRemaining === 0) {
        console.log("Thanos just snapped his fingers!")
        losses ++;
        //Displaying wins and losses
        console.log("wins: " + wins);
        console.log("losses: " + losses);
        replay();

}
    else if (slots === someWord.letters.length) {
        console.log("You just saved the world "+ answers.playerName +"!");
        wins++;
        //Displaying wins and losses
        console.log("wins: " + wins);
        console.log("losses: " + losses);
        replay();
}
    else {
        guessLetter("");
    }

function replay(){
    
    let playAgain = [
    {
        type: 'confirm',
	    name: 'playAgain',
	    message: 'Do you want to play again?',
	    default: true
	  }
	];
    inquirer.prompt(playGameAgain).then(userChoice => {
        if (userWantsTo.playAgain){
            lettersUsed = "";
            lettersUsedArray=[];
            slots = 0;
            startPlay();
    }
    else{
        console.log("Thanos just snapped his fingers. I guess your gone!");
        return;
    }
});
}
}




    











