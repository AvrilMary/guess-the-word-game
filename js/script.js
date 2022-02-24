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
const word = "magnolia";
const guessedLetters = [];

//Function to represent each letter with circle symbols
const placeHolders = function (word) {
    const wordArray = word.split("");
    //Now I have an array [w, o, r, d]
    const modifyArray = wordArray.map(function (item) {
        return item = "●";
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

// Function to turn guess into uppercase and check if player has already guessed letter.  
const makeGuess = function (letter) {
    const uppercaseLetter = letter.toUpperCase();
    if (guessedLetters.includes(uppercaseLetter)) {
        message.innerText = "You already guessed that letter! Try a different letter";
    } else {
        guessedLetters.push(uppercaseLetter);
        showGuessedLetters(uppercaseLetter);
    }
    console.log(guessedLetters)
    updateWord(guessedLetters);
};

// Function to show guessed letters
const showGuessedLetters =  function (letter) {
    guessLetters.innerHTML = "";
    let newLetter = document.createElement("li");
    newLetter.innerText = letter;
    guessLetters.append(newLetter);
};


//This is a function to update the word in progress
const updateWord = function (guessedLetters) {
    const wordUpper = word.toUpperCase();
    // Taking our now uppercase word, spliting so it can be an array
    const wordArray = wordUpper.split("");
    //console.log(wordArray);
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

//Function to check if the player won. 
const checkWin = function () {
    if (wordInProgress.innerText === word.toUpperCase()) {
        message.classList.add("win");
        message.innerHTML = `<p class="highlight">You guessed the correct word! Congrats!</p>`
    }
};