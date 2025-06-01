const guessInput = document.getElementById('guess');
const submitButton = document.getElementById('submit');
const resetButton = document.getElementById('reset');
const messages = document.getElementsByClassName('message');
const tooHighMessage = document.getElementById('too-high');
const tooLowMessage = document.getElementById('too-low');
const maxGuessesMessage = document.getElementById('max-guesses');
const numberOfGuessesMessage = document.getElementById('number-of-guesses');
const correctMessage = document.getElementById('correct');

let targetNumber;
let attempts = 0;
const maxNumberOfAttempts = 5;

// Returns a random number from min (inclusive) to max (exclusive)
// Usage:
// > getRandomNumber(1, 50)
// <- 32
// > getRandomNumber(1, 50)
// <- 11
function getRandomNumber(min, max) {
  return parseInt(Math.floor(Math.random(min, max - 1) * (max - min)) + min);
}

function setup() {
  // Get random number
  targetNumber = getRandomNumber(1, 98);
  console.log(`target number: ${targetNumber}`);

  // Reset number of attempts
  attempts = 0;

  // Enable the input and submit button
  submitButton.disabled = false;
  guessInput.disabled = false;

  hideAllMessages();
  resetButton.style.display = 'none';
}

function checkGuess() {
  // Get value from guess input element
  const guess = parseInt(guessInput.value, 10);
  if (guess < 1 || guess > 99) { alert('Wrong number submitted! Acceptible one should be between 1 and 99'); } else {
  attempts = attempts + 1;

  //hideAllMessages();

  if (guess == targetNumber) {
    numberOfGuessesMessage.style.display = 'block';
    numberOfGuessesMessage.innerHTML = `You made ${attempts} guesses`;
    
    correctMessage.style.display = 'block';

    submitButton.disabled = true;
    guessInput.disabled = true;
  }

  if (guess != targetNumber) {
    if (guess < targetNumber) {
      tooLowMessage.style.display = 'block';
    } else {
      tooHighMessage.style.display = 'block';
    }

    const remainingAttempts = maxNumberOfAttempts - attempts;

    numberOfGuessesMessage.style.display = 'block';
    numberOfGuessesMessage.innerHTML = `You guessed ${guess}. <br> ${remainingAttempts} guesses remaining`;
  }
  }

  if (attempts == maxNumberOfAttempts) {
    submitButton.disabled = true;
    guessInput.disabled = true;
    resetButton.style.display = 'block';
  }

  guessInput.value = '';

  resetButton.style.display = 'none';
}

function hideAllMessages() {
  for (let elementIndex = 0; elementIndex <= messages.length; elementIndex++) {
    messages[elementIndex].style.display = 'none';
  }
}

setup();

submitButton.addEventListener('click', checkGuess());
resetButton.addEventListener('click', setup());
