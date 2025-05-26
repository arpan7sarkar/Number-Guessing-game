const elements = {
    input: document.querySelector(".input-wrapper input"),
    submit: document.querySelector(".input-wrapper button"),
    message: document.querySelector("#message"),
    reset: document.querySelector("#resetGame"),
    attemptsDisplay: document.querySelector("#attempts")
};

const gameState = {
    number: Math.floor(Math.random() * 100) + 1,
    attempts: 0,
    maxAttempts: 10
};

function updateUI(messageText, className = '') {
    elements.message.className = className;
    elements.message.innerHTML = `<p style="color: white;">${messageText}</p>`;
    elements.input.value = '';
    elements.attemptsDisplay.textContent = gameState.attempts;
}

function toggleControls(disabled) {
    elements.submit.disabled = disabled;
    elements.input.disabled = disabled;
    elements.reset.style.display = disabled ? 'block' : 'none';
}

function resetGame() {
    gameState.number = Math.floor(Math.random() * 100) + 1;
    gameState.attempts = 0;
    updateUI('');
    toggleControls(false);
    elements.attemptsDisplay.textContent = '0';
}

function handleGuess() {
    const guess = Number(elements.input.value);
    gameState.attempts++;

    if (guess === gameState.number) {
        updateUI(`Congratulations! You won! The number was ${gameState.number}`, 'success');
        toggleControls(true);
        return;
    }

    if (gameState.attempts >= gameState.maxAttempts) {
        updateUI(`Game Over! The number was ${gameState.number}`, 'error');
        toggleControls(true);
        return;
    }

    const message = `Too ${guess < gameState.number ? 'low' : 'high'}! Try again! Your guess was ${guess}. ${gameState.maxAttempts - gameState.attempts} attempts remaining.`;
    updateUI(message);
}

elements.input.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        handleGuess();
    }
});
elements.submit.addEventListener('click', handleGuess);
elements.reset.addEventListener('click', resetGame);