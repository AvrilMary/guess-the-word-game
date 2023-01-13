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
const playAgainButton = document.querySelector(".play-again");
// <-- Remaining Guesses message -->
const remainingGuessesMessage = document.querySelector(".remaining")

let word = "magnolia";
let guessedLetterArray = [];
let remainingGuesses = 8;

// ------------------------------------------ //

// Async function to fetch words:

const getWord = async function () {
    const res = await fetch ("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const data = await res.text();
    //console.log(data);
    const wordArray = data.split("\n");
    console.log(wordArray);
    const randomIndex = Math.floor(Math.random()* wordArray.length);
    const randomWord = wordArray[randomIndex].trim();
    word = randomWord;
    addPlaceholders(word);
}




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

getWord();

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
       startOver();
    } else {
        span.innerText = `${remainingGuesses}`
    }

}
 


const playerWin = function (wordUpper) {
    if (wordInProgress.innerText === wordUpper) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`;
        startOver();
    }
};

const startOver = function () {
    guessButton.classList.add("hide");
    remainingGuessesMessage.classList.add("hide");
    guessedLetters.classList.add("hide");
    playAgainButton.classList.remove("hide");
    guessInput.classList.add("hide");

}

playAgainButton.addEventListener("click", function () {
  //Reset original values
    message.classList.remove("win");
    message.innerText = "";
    guessedLetters.innerText = "";
    addPlaceholders(word);
    getWord();
    remainingGuesses = 8;
    span.innerText = `${remainingGuesses}`;
    guessedLetterArray = [];
    playAgainButton.classList.add("hide");
    remainingGuessesMessage.classList.remove("hide");
    guessInput.classList.remove("hide");
    guessButton.classList.remove("hide");
})

 
