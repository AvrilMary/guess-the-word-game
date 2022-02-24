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

button.addEventListener("click", function (e) {
    e.preventDefault();
    const input = playerInput.value;
    console.log(input);   
    playerInput.value = "";
});
