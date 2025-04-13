document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    const task1 = document.getElementById('task1');
    const task2 = document.getElementById('task2');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simple validation
        const email = document.getElementById('email').value.trim();
        const password = document.getElementById('password').value;
        const techCheckboxes = document.querySelectorAll('input[name="tech"]:checked');
        
        // Check required fields
        if (!email || !password) {
            alert('Please fill in all required fields');
            return;
        }
        
        // Check password length
        if (password.length < 8) {
            alert('Password must be at least 8 characters');
            return;
        }
        
        // Check at least 3 technologies selected
        if (techCheckboxes.length < 3) {
            alert('Please select at least 3 technologies');
            return;
        }
        
        // If validation passes, show the game
        task1.classList.add('hidden');
        task2.classList.remove('hidden');
        startGame();
    });
    
    function startGame() {
        const guessButton = document.getElementById('guessButton');
        const restartButton = document.getElementById('restartButton');
        const guessInput = document.getElementById('guessInput');
        const message = document.getElementById('message');
        const error = document.getElementById('error');
        const scoreDisplay = document.getElementById('score');
        const attemptsDisplay = document.getElementById('attempts');
        const historyList = document.getElementById('historyList');
        
        let secretNumber = Math.floor(Math.random() * 100) + 1;
        let attempts = 0;
        let score = 10;
        let gameOver = false;
        
        function updateDisplay() {
            scoreDisplay.textContent = score;
            attemptsDisplay.textContent = attempts;
        }
        
        function makeGuess() {
            if (gameOver) return;
            
            const guess = parseInt(guessInput.value);
            error.textContent = '';
            
            if (isNaN(guess)) {
                error.textContent = 'Please enter a number!';
                return;
            }
            
            if (guess < 1 || guess > 100) {
                error.textContent = 'Please enter a number between 1 and 100!';
                return;
            }
            
            attempts++;
            
            // Add to history before clearing input
            const historyItem = document.createElement('div');
            
            if (guess === secretNumber) {
                message.innerHTML = '✅ Correct! You win!';
                message.style.color = 'green';
                historyItem.innerHTML = `You guessed ${guess} (✅ Correct!)`;
                gameOver = true;
            } else if (guess < secretNumber) {
                message.innerHTML = '📉 Too low!';
                message.style.color = 'red';
                historyItem.innerHTML = `You guessed ${guess} (📉 Too low)`;
                score--;
            } else {
                message.innerHTML = '📈 Too high!';
                message.style.color = 'red';
                historyItem.innerHTML = `You guessed ${guess} (📈 Too high)`;
                score--;
            }
            
            historyList.appendChild(historyItem);
            guessInput.value = '';
            updateDisplay();
            
            if (attempts >= 10 && !gameOver) {
                message.innerHTML = 'Game Over! The number was ' + secretNumber;
                message.style.color = 'red';
                gameOver = true;
            }
        }
        
        function restartGame() {
            secretNumber = Math.floor(Math.random() * 100) + 1;
            attempts = 0;
            score = 10;
            gameOver = false;
            message.textContent = '';
            historyList.innerHTML = '';
            guessInput.value = '';
            error.textContent = '';
            updateDisplay();
        }
        
        guessButton.addEventListener('click', makeGuess);
        restartButton.addEventListener('click', restartGame);
        
        guessInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                makeGuess();
            }
        });
        
        updateDisplay();
    }
});