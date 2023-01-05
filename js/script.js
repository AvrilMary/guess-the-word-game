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
} 


addPlaceholders(word);

guessButton.addEventListener("click", function (e) {
    e.preventDefault();
    const input = e.target.value;
    console.log(input);
    input.innerHTML = "";
})

