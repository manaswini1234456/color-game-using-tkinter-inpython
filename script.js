const colors = ["Red", "Green", "Blue", "Yellow", "Orange", "Purple", "Pink", "Brown", "Black", "White"];
let score = 0;
let timeLeft = 30;
let currentColor = "";
let currentWord = "";

const scoreDisplay = document.getElementById("score");
const timerDisplay = document.getElementById("timer");
const colorWordDisplay = document.getElementById("color-word");
const colorInput = document.getElementById("color-input");
const submitBtn = document.getElementById("submit-btn");
const resetBtn = document.getElementById("reset-btn");

function startGame() {
    score = 0;
    timeLeft = 30;
    updateScore();
    updateTimer();
    nextColorWord();
    colorInput.value = "";
    colorInput.focus();
    const timerInterval = setInterval(() => {
        timeLeft--;
        updateTimer();
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert(`Time's up! Your final score is ${score}.`);
        }
    }, 1000);
}

function updateScore() {
    scoreDisplay.textContent = `Score: ${score}`;
}

function updateTimer() {
    timerDisplay.textContent = `Time left: ${timeLeft}`;
}

function nextColorWord() {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    const randomWord = colors[Math.floor(Math.random() * colors.length)];
    currentColor = randomColor.toLowerCase();
    currentWord = randomWord;
    colorWordDisplay.textContent = currentWord;
    colorWordDisplay.style.color = randomColor;
    colorInput.style.borderColor = "#ccc";
    colorInput.value = ""; // Clear input field for next round
}

function handleSubmission() {
    const userInput = colorInput.value.toLowerCase();
    console.log(`User input: ${userInput}, Expected color: ${currentColor}`);
    
    if (userInput === currentColor) {
        score++;
        colorInput.style.borderColor = "green";
        launchConfetti();
    } else {
        colorInput.style.borderColor = "red";
        shakeInput();
    }
    updateScore();
    nextColorWord();
    colorInput.value = ""; // Clear input field after submission
}

function launchConfetti() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
    });
}

function shakeInput() {
    colorInput.classList.add("shake");
    setTimeout(() => {
        colorInput.classList.remove("shake");
    }, 300);
}

function resetGame() {
    score = 0;
    timeLeft = 30;
    updateScore();
    updateTimer();
    nextColorWord();
    colorInput.value = "";
    colorInput.style.borderColor = "#ccc";
    colorInput.focus();
}

colorInput.addEventListener("keyup", (event) => {
    if (event.key === "Enter") {
        handleSubmission();
    }
});

submitBtn.addEventListener("click", handleSubmission);
resetBtn.addEventListener("click", resetGame);

startGame();
