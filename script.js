document.addEventListener('DOMContentLoaded', () => {
    startNewColorGame();
});

let correctColor;
const colors = [
    { name: 'червоний', value: 'red' },
    { name: 'синій', value: 'blue' },
    { name: 'зелений', value: 'green' },
    { name: 'жовтий', value: 'yellow' },
    { name: 'чорний', value: 'black' },
    { name: 'білий', value: 'white' },
    { name: 'помаранчевий', value: 'orange' },
    { name: 'фіолетовий', value: 'purple' }
];

function startNewColorGame() {
    const randomIndex = Math.floor(Math.random() * colors.length);
    correctColor = colors[randomIndex];
    
    document.getElementById('colorSquare').style.backgroundColor = correctColor.value;
    document.getElementById('message').textContent = '';
    document.getElementById('retryButton').style.display = 'none';
    
    generateOptions();
}

function generateOptions() {
    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';

    let options = [correctColor];
    while (options.length < 4) {
        const randomOption = colors[Math.floor(Math.random() * colors.length)];
        if (!options.some(option => option.name === randomOption.name)) {
            options.push(randomOption);
        }
    }

    options = options.sort(() => Math.random() - 0.5);

    options.forEach(option => {
        const button = document.createElement('button');
        button.classList.add('game-button');
        button.textContent = option.name;
        button.onclick = () => checkColor(option);
        optionsContainer.appendChild(button);
    });
}

function checkColor(selectedOption) {
    const message = document.getElementById('message');
    if (selectedOption.name === correctColor.name) {
        message.textContent = 'Ви вгадали! Молодець!';
        message.style.color = 'green';
    } else {
        message.textContent = `Неправильно. Правильний колір: ${correctColor.name}`;
        message.style.color = 'red';
    }
    document.getElementById('retryButton').style.display = 'block';
}


//

let correctNumber;
let attempts = 0;

function startNewNumberGame() {
    // Генеруємо випадкове число від 1 до 100
    correctNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;
    
    // Очищення повідомлень і приховування кнопки перезапуску
    document.getElementById('message').textContent = '';
    document.getElementById('retryButton').style.display = 'none';
}

function checkGuess() {
    const guess = parseInt(document.getElementById('guessInput').value);
    const message = document.getElementById('message');
    attempts++;

    if (isNaN(guess) || guess < 1 || guess > 100) {
        message.textContent = 'Будь ласка, введіть число від 1 до 100.';
        message.style.color = 'orange';
        return;
    }

    if (guess === correctNumber) {
        message.textContent = `Вірно! Ви вгадали число за ${attempts} спроб(и).`;
        message.style.color = 'green';
        document.getElementById('retryButton').style.display = 'block';
    } else if (guess < correctNumber) {
        message.textContent = 'Спробуйте більше число.';
        message.style.color = 'orange';
    } else {
        message.textContent = 'Спробуйте менше число.';
        message.style.color = 'orange';
    }
}

// Запуск гри після завантаження сторінки
document.addEventListener('DOMContentLoaded', startNewNumberGame);


//

// Масив з 100 різними смайликами
const emojiList = [
    '😀', '😂', '😍', '🥺', '😢', '😎', '🤔', '😡', '🤯', '😴',
    '🥳', '😇', '🤗', '🤩', '😈', '😷', '🥴', '😵', '😵‍💫', '😳',
    '😱', '🥶', '🥵', '🤤', '😬', '🤯', '🧐', '🤓', '😋', '🤪',
    '😝', '😜', '🤤', '🥰', '🥳', '🤠', '😈', '😇', '🤗', '🤩',
    '😅', '😆', '😈', '🤤', '😏', '😶', '😑', '😌', '😅', '😂',
    '🤣', '🙃', '🤪', '🤩', '😏', '😮', '😯', '😲', '😳', '🥺',
    '😶', '😐', '😑', '🤤', '😓', '😔', '😥', '😰', '😨', '😱',
    '🥵', '🥶', '🧊', '🧃', '🧉', '🧊', '🧃', '🧉',
    '🤑', '😲', '🤤', '😬', '😴', '🥱', '😧', '😰', '😨', '😳',
    '😈', '😇', '🤩', '🥳', '😻', '😽', '🥺', '😢', '😥', '😪',
    '🤯', '😵', '😠', '🤬', '🤡', '😵', '😷', '🥵', '🥶', '🧊',
    '🧋', '🧃', '🧉', '🍎', '🍌', '🍒', '🍉', '🍇', '🍓', '🍋',
    '🍍', '🥭', '🍆', '🥑', '🥒', '🌶', '🌽', '🥕', '🍠', '🍅',
    '🥒', '🥕', '🥔', '🍠', '🥥', '🥝', '🍏', '🍎', '🍐',
    '🍑', '🍒', '🍓', '🍇', '🍉', '🍈', '🍊', '🍋', '🍌', '🍍',
    '🥭', '🍑', '🥥', '🥝', '🍇', '🍉', '🍈', '🍏', '🍎',
    '🍐', '🍒', '🍓', '🥭', '🥥', '🧄', '🧅', '🧈', '🧉', '🍯',
    '🍿', '🍩', '🍪', '🎂', '🍰', '🧁', '🥧', '🍫', '🍬', '🍭'
];

// Вибрати 40 випадкових смайлів, включаючи один цільовий смайлик
function startGame() {
    const emojiGrid = document.getElementById('emoji-grid');
    const message = document.getElementById('message');
    const targetEmojiElement = document.getElementById('target-emoji');

    // Вибрати 40 смайлів
    const emojis = getRandomEmojis(40);

    // Randomly select the target emoji
    const targetIndex = Math.floor(Math.random() * 40);
    const targetEmoji = emojis[targetIndex];
    targetEmojiElement.textContent = targetEmoji;

    // Генерація смайлів у сітці
    emojiGrid.innerHTML = '';
    for (let i = 0; i < 40; i++) {
        const emoji = document.createElement('button');
        emoji.className = 'emoji-button';
        emoji.textContent = emojis[i];
        emoji.onclick = () => checkEmoji(emoji, targetEmoji);
        emojiGrid.appendChild(emoji);
    }

    // Встановлюємо правильний смайлик у випадкову позицію
    emojiGrid.children[targetIndex].textContent = targetEmoji;

    message.textContent = '';
    message.className = 'message';
}

// Вибрати 40 випадкових смайлів з масиву
function getRandomEmojis(count) {
    const shuffled = emojiList.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

function checkEmoji(button, targetEmoji) {
    const message = document.getElementById('message');

    if (button.textContent === targetEmoji) {
        message.textContent = 'Правильно! Ви знайшли смайлик!';
        message.className = 'message correct';
    } else {
        message.textContent = 'Неправильно. Спробуйте ще раз.';
        message.className = 'message incorrect';
    }
}

// Start the game when the page loads
window.onload = startGame;