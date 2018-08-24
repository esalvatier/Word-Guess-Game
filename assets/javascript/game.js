var wins = 0;
var losses = 0;
var words = [
  {author: "tolkien", 
  hint: "Definitely NOT allegorical."}, 

  {author: "stephenson", 
  hint: "Lives in Seattle. Likes swords!"}, 

  {author: "sanderson", 
  hint: "A Mormon." },

  {author: "gladstone", 
  hint: "Not Gladwell."},

  {author: "moon", 
  hint:"She's definitely not made of cheese."},

  {author: "herbert", 
  hint: "Oregon's 'moving dunes' inspired his most famous novel."},

  {author: "stross", 
  hint: "Stress? Ooooooooooooh!"},

  {author: "vernon",
  hint: "That Pear with the Teeth? She drew that."},

  {author: "jacques",
   hint: "For Crimsonpartition! Wait, that's not quite right."},

  {author: "adams",
   hint: "The answers' not the interesting part, the question is. So they needed a bigger computer."}
];
var word;
var currentHint;
var guessesLeft;
var lettersGuessed;
//contains the word to for displaying to player
var unguessedLetters;
// variable to check if the this is the first time the game has been played
var gameStarted = false;
var userGuess;
//for storing the hint to give the user
var hintForUser;

// resets the variables and fills the array representing the word to the player with underscores('_')
var reset = function() {
  //generates random number
  var index = Math.floor(Math.random() * words.length);
  //grabs the author name at the index
  word = words[index].author;
  //grabs the hint at the index
  currentHint = words[index].hint;
  unguessedLetters = [];
  guessesLeft = 8;
  lettersGuessed = [];
  //resets hint
  hintForUser = "Nothing until you have 4 or less guesses left."
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
  // checks howmany guesses the user has made and gives them a hint if they have less than 5
  if (guessesLeft < 5){
    hintForUser = currentHint;
  }
  // checks if the game has been won or lost
  if (guessesLeft === 0 && unguessedLetters.indexOf("_") > -1) {
    reset();
    losses++;
  } else if (unguessedLetters.indexOf("_") < 0) {
    reset();
    wins++;
  }
  var html = "<div class= \"row\">" +
    "<div class=\"border-right border-dark col-6\">" +
    "<p class=\"text-center mt-3\">Wins " + wins + "</p>" +
    "<p class=\"text-center\">Losses " + losses + "</p>" +
    "<p class=\"text-center\">Word: " + unguessedLetters + "</p>" +
    "<p class=\"text-center\">You have " + guessesLeft + " guesses left</p>" +
    "<p class=\"text-center\">Guessed Letters: " + lettersGuessed + "</p>" +
    "</div><div class=\"border-left border-dark col-6\"> <p class=\"text-center mt-3\">Hint: </p>" + 
    "<p class=\"text-center\">" + hintForUser + "</p></div></div>";
  //eliminates commas between lettersin the unguessedLetters array
  document.querySelector("#game").innerHTML = html.replace(/,/g , " ");
}