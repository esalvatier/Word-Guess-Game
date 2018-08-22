var wins = 0;
var losses = 0;
var words = ["apple", 
  "banana", 
  "pineapple", 
  "strawberry",
  "passionfruit",
  "tomato"
];
var word;
var guessesLeft;
var lettersGuessed;
//contains the word to for displaying to player
var unguessedLetters;
// variable to check if the this is the first time the game has been played
var gameStarted = false;
var userGuess;

// resets the variables and fills the array representing the word to the player with underscores('_')
var reset = function() {
  //grabs random word from array
  word = words[Math.floor(Math.random() * words.length)];
  unguessedLetters = [];
  guessesLeft = 8;
  lettersGuessed = [];
  for (var i = 0; i < word.length; i++) {
    unguessedLetters.push("_");
  }
}

reset();

document.onkeyup = function(event) {
  userGuess = event.key;
  // checks if the game has been started, second statement checks if the keypressed is asingle character in the alphabet
  if (gameStarted === false) {
    gameStarted = true;
  } else if (/^[a-z]{1}/.test(userGuess)){
    //checks if the guess in part of the word, second statement checks if the letter hasn't already been guessed
    if (word.indexOf(userGuess) > -1) {
      for (var j = 0; j < word.length; j++) {
        if (word.indexOf(userGuess, j) > -1){
          j = word.indexOf(userGuess, j);
          unguessedLetters[j] = userGuess;
        }
      }
    } else if (lettersGuessed.indexOf(userGuess) == -1) {
      guessesLeft--;
      lettersGuessed.push(userGuess);
    }
  }
  // checks if the game has been won or lost
  if (guessesLeft === 0 && unguessedLetters.indexOf("_") > -1) {
    reset();
    losses++;
  } else if (guessesLeft === 0 || unguessedLetters.indexOf("_") < 0) {
    reset();
    wins++;
  }
  var html = "<p>Wins " + wins + "</p>" +
    "<p>Losses " + losses + "</p>" +
    "<p>Word: " + unguessedLetters + "</p>" +
    "<p>Guessed Letters: " + lettersGuessed + "</p>" +
    "<p>You have " + guessesLeft + " guesses left</p>";
  //eliminates commas between lettersin the unguessedLetters array
  document.querySelector("#game").innerHTML = html.replace(/,/g , " ");
}