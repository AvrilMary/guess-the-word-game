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
// <-- Remaining Guesses message -->
const remainingGuessesMessage = document.querySelector(".remaining")

const word = "magnolia";
const guessedLetterArray = [];
let remainingGuesses = 8;

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
        return makeGuess(input);

    }
 }

 const makeGuess = function (letter) {
    const uppercaseLetter = letter.toUpperCase();
    if (guessedLetterArray.includes(uppercaseLetter)) {
        message.innerText = "You already guessed that letter";
    } else {
        guessedLetterArray.push(uppercaseLetter);
        playerGuesses(guessedLetterArray);
        updateWordInProgress(guessedLetterArray);
        countRemainingGuesses(uppercaseLetter);
    }
 }

 const playerGuesses = function (guessedLetterArray) {
    guessedLetters.innerHTML = "";
    guessedLetterArray.forEach(function(letter) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLetters.append(li);
    })
 }

 const updateWordInProgress = function (guessedLettersArray) {
    const wordUpper = word.toUpperCase();
    //This splits my word into an array 
    const wordArray = wordUpper.split("");
    const newArray = []
    // I need to check my word array [M,A,G,N,O,L,I,A] contains any letters
    for (let letter of wordArray) {
        if (guessedLetterArray.includes(letter)) {
            newArray.push(letter.toUpperCase());
        } else {
            newArray.push("●")
        }
    }
    wordInProgress.innerText = newArray.join("");
    playerWin(wordUpper);
        
};

const countRemainingGuesses = function (guess) {
    const upperCaseWord = word.toUpperCase();
    if (!upperCaseWord.includes(guess)) {
        message.innerText = "The word doesnt include that letter";
        remainingGuesses -= 1;
        console.log(remainingGuesses);
    } else {
        message.innerText = `Good guess! The word has the letter ${guess} `;
    };
    if (remainingGuesses === 0) {
        message.innerText = "The game is over";
        hideButton.classList.remove("hide");
        guessButton.classList.add("hide");
        remainingGuessesMessage.classList.add("hide");
        guessedLetters.classList.add("hide");
        guessInput.classList.add("hide");
    } else {
        span.innerText = `${remainingGuesses}`
    }

}
 


const playerWin = function (wordUpper) {
    if (wordInProgress.innerText === wordUpper) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`;
    }
};

 
