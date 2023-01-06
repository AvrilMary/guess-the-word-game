//  ----------------Global Variables -------------------//

//<-- Unordered list where guesses appear -->
const guessedLetters = document.querySelector(".guessed-letters");
// <-- Button where the text Guess is -->
const guessButton = document.querySelector(".guess");
// <-- Text input where the player will guess the letter -->
const guessInput = document.querySelector(".letter");
// <-- Empty paragraph where the word in progress is -->
const wordInProgress = document.querySelector(".word-in-progress")
// <-- Paragraph where remaining guesses are -->
const paragraph = document.querySelector(".remaining");
// <-- Span inside paragraphing where guesses display -->
const span = document.querySelector("span");
// <-- Empty paragraph where messsages will appear -->
const message = document.querySelector(".message");
// <-- Hidden button to encourage another game -->
const hideButton = document.querySelector(".play-again");

const word = "magnolia";
const guessedLetterArray = [];

// ------------------------------------------ //

// -- Function to add placeholders for each letter --//

const addPlaceholders = function (word) {
    // create array of the word ( [w, o, r, d])
    const wordArray = word.split("");
    wordArray.innerHTML = "";
    const newArray = [];
    wordArray.forEach(letter => { 
        letter = "●";
        newArray.push(letter);
    });

   wordInProgress.innerText = newArray.join("");
   console.log(wordInProgress);
} 

addPlaceholders(word);

guessButton.addEventListener("click", function (e) {
    e.preventDefault();
   const userInput = guessInput.value;
    console.log(userInput);
    guessInput.value = "";
    message.innerText = "";
    validatePlayerInput(userInput);
 });

 const validatePlayerInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input === "") {
        message.innerText = "You didnt enter a letter";
    } else if (input.length >1) {
        message.innerText = "Remember to add just one letter";
    } else if (!input.match(acceptedLetter)) {
        message.innerText = "That isnt a letter";
    } else {
        // message.innerText = "That input is accepted";
        return input;
    }
 }

 const makeGuess = function (letter) {
    
 }