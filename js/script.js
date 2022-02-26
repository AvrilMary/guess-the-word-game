//Declaration of global variables to target HTML

// Unordered list where players guessed letters will appear
const guessLetters   = document.querySelector(".guessed-letters");
// Guess Button
const button         = document.querySelector(".guess");
// Text input where player guesses there letter
const playerInput    = document.querySelector(".letter");
// Empty paragraph where word in progress will appear
const wordInProgress = document.querySelector(".word-in-progress");
// Paragraph where the remaining guesses will display
const remaining      = document.querySelector(".remaining");
// Span inside the paragraph where the remaining guesses will display.
const spanremaining  = document.querySelector(".remaining span") //Check if I am targeting the span part correctly.
// Messages will appear here when the player guesses a letter.
const message        = document.querySelector(".message");
// The hidden button that appears so player can play again.
const playAgainButton= document.querySelector(".play-again");


// Global variables
let word = "magnolia";
let guessedLetters = [];
let remainingGuesses = 8;

const getWord = async function () {
    const res = await fetch ("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await res.text();
    console.log(words);
    const wordArray = words.split("\n");
    console.log(wordArray);
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    //console.log(randomIndex);
    word = wordArray[randomIndex].trim();
    //console.log(word);
    placeHolders(word);
};


//Function to represent each letter with circle symbols
const placeHolders = function (word) {
    const wordArray = word.split("");
    //Now I have an array [w, o, r, d]
    const modifyArray = wordArray.map(function (item) {
        return item = "●";
    });
        wordInProgress.innerText= modifyArray.join("")
    };

    getWord();

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

// Function to turn guess into uppercase and check if player has already guessed letter.  
const makeGuess = function (validatedLetter) {
    validatedLetter = validatedLetter.toUpperCase();
    if (guessedLetters.includes(validatedLetter)) {
        message.innerText = "You already guessed that letter! Try a different letter";
    } else {
        guessedLetters.push(validatedLetter);
        showGuessedLetters(validatedLetter);
        console.log(guessedLetters)
        countGuesses(validatedLetter);
        updateWord(guessedLetters);
    }
};

// Function to show guessed letters
const showGuessedLetters =  function () {
    guessLetters.innerHTML = "";
    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerHTML = letter;
        guessLetters.append(li);
    }
};


//This is a function to update the word in progress
const updateWord = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    // Taking our now uppercase word, spliting so it can be an array
    const wordArray = wordUpper.split("");
    const letterMatches = [];
    for (const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            letterMatches.push(letter.toUpperCase());
        } else {
            letterMatches.push("●");
    }
    wordInProgress.innerText = letterMatches.join("");
    }
    checkWin();
};

// Function to count guesses remaining. 

const countGuesses = function (guess) {
    const wordUpper = word.toUpperCase();
        if (!wordUpper.includes(guess)) {
            message.innerText = "Sorry your guess was incorrect!"; 
            spanremaining.innerText = `${remainingGuesses}`;
            remainingGuesses -= 1; 
        } else { 
            message.innerText = "Well done, your guess was correct!"; 
        };

        if (remainingGuesses === 0) {
        message.innerText = "Sorry friend. Game is over";
        wordInProgress.innerText = `The word was ${word}.`;
        spanremaining.innerText = `${remainingGuesses}`;
        startOver();
    } else if (remainingGuesses === 1) {
        spanremaining.innerText = "one more guess";
    } else {
        spanremaining.innerText = `${remainingGuesses}`;    
    } 
}; 


//Function to check if the player won. 
const checkWin = function () {
    if (wordInProgress.innerText === word.toUpperCase()) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`;
        startOver();
    }
};

const startOver = function () {
    button.classList.add("hide");
    guessLetters.classList.add("hide");
    remaining.classList.add("hide");
    playAgainButton.classList.remove("hide");
};

playAgainButton.addEventListener("click", function () {
    message.classList.remove("win");
    message.innerHTML = "";
    guessLetters.innerText = "";
    guessedLetters = [];
    remainingGuesses = 8;
    spanremaining.innerText = `${remainingGuesses}`;
    button.classList.remove("hide");
    remaining.classList.remove("hide");
    playAgainButton.classList.add("hide");
    getWord();
});