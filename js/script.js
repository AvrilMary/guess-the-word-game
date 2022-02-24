//Declaration of global variables 
const guessLetters   = document.querySelector(".guessed-letters");
const button         = document.querySelector(".guess");
const playerInput    = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remaining      = document.querySelector(".remaining");
const spanremaining  = document.querySelector(".remaining span") //Check if I am targeting the span part correctly.
const message        = document.querySelector(".message");
const playAgainButton= document.querySelector(".play-again");


// This word is used to test out the game
const word = "book";
const guessedLetters = [];

//Function to represent each letter with circle symbols
const placeHolders = function (word) {
    const wordArray = word.split("");
    //Now I have and array [w, o, r, d]
    const modifyArray = wordArray.map(function (item) {
        item = wordInProgress;
        return wordInProgress.innerText = "●";
    });
        wordInProgress.innerText= modifyArray.join("")
    };

placeHolders(word);

//Function to capture player guesses
button.addEventListener("click", function (e) {
    e.preventDefault();
    const input = playerInput.value;  
    playerInput.value = "";
    message.innerText = "";
    const validatedLetter = checkPlayerInput(input);
    console.log(validatedLetter);
    makeGuess(validatedLetter);
});


//Function to check player's input
const checkPlayerInput = function (input) {
    const acceptedLetter = /[a-zA-z]/
    if (input === "") {
        message.innerText = "Remember to include a letter silly!";
    } else if (input.length >= 2) {
        message.innerText = "Just one letter at a time please!";
    } else if (!input.match(acceptedLetter))  { 
         message.innerText = "Remember to use letters!";
    } else {
        return input;
    }
};

const makeGuess = function (letter) {
    const uppercaseLetter = letter.toUpperCase();
    if (guessedLetters.includes(letter)) {
        message.innerText = "You already guessed that letter! Try a different letter";
    } else {
        guessedLetters.push(letter);
    }
    console.log(guessedLetters)
};



