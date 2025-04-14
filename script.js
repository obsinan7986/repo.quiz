// Quiz Questions Array
const quizQuestions = [
    {
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Madrid"],
        correctAnswer: 2
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correctAnswer: 1
    },
    {
        question: "What is the largest mammal in the world?",
        options: ["Elephant", "Blue Whale", "Giraffe", "Polar Bear"],
        correctAnswer: 1
    },
    {
        question: "Who painted the Mona Lisa?",
        options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
        correctAnswer: 2
    },
    {
        question: "What is the chemical symbol for gold?",
        options: ["Go", "Gd", "Au", "Ag"],
        correctAnswer: 2
    },
    {
        question: "Which language is the most widely spoken in the world?",
        options: ["English", "Spanish", "Mandarin Chinese", "Hindi"],
        correctAnswer: 2
    },
    {
        question: "What year did World War II end?",
        options: ["1943", "1945", "1947", "1950"],
        correctAnswer: 1
    },
    {
        question: "Which country is home to the kangaroo?",
        options: ["New Zealand", "South Africa", "Australia", "Brazil"],
        correctAnswer: 2
    },
    {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        correctAnswer: 3
    },
    {
        question: "Who wrote 'Romeo and Juliet'?",
        options: ["Charles Dickens", "William Shakespeare", "Jane Austen", "Mark Twain"],
        correctAnswer: 1
    }
];

// DOM Elements
const startScreen = document.getElementById('start-screen');
const quizScreen = document.getElementById('quiz-screen');
const resultScreen = document.getElementById('result-screen');
const startBtn = document.getElementById('start-btn');
const nextBtn = document.getElementById('next-btn');
const restartBtn = document.getElementById('restart-btn');
const questionElement = document.getElementById('question');
const optionsContainer = document.getElementById('options');
const questionCounter = document.getElementById('question-counter');
const scoreElement = document.getElementById('score');
const progressBar = document.getElementById('progress-bar');
const finalScoreElement = document.getElementById('final-score');
const resultDetails = document.getElementById('result-details');
const darkModeToggle = document.getElementById('dark-mode-toggle');
const contactForm = document.getElementById('contact-form');

// Quiz Variables
let currentQuestionIndex = 0;
let score = 0;
let userAnswers = [];
let quizCompleted = false;

// Initialize the quiz
function initQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = [];
    quizCompleted = false;
    updateScore();
    showStartScreen();
}

// Show start screen
function showStartScreen() {
    startScreen.classList.remove('hidden');
    quizScreen.classList.add('hidden');
    resultScreen.classList.add('hidden');
}

// Start the quiz
function startQuiz() {
    startScreen.classList.add('hidden');
    quizScreen.classList.remove('hidden');
    resultScreen.classList.add('hidden');
    showQuestion();
}

// Show current question
function showQuestion() {
    if (currentQuestionIndex >= quizQuestions.length) {
        showResults();
        return;
    }

    const question = quizQuestions[currentQuestionIndex];
    questionElement.textContent = question.question;
    optionsContainer.innerHTML = '';

    // Update question counter
    questionCounter.textContent = `Question ${currentQuestionIndex + 1}/${quizQuestions.length}`;
    
    // Update progress bar
    progressBar.style.width = `${((currentQuestionIndex + 1) / quizQuestions.length) * 100}%`;

    // Create option buttons
    question.options.forEach((option, index) => {
        const optionButton = document.createElement('button');
        optionButton.classList.add('option-btn');
        optionButton.textContent = option;
        optionButton.addEventListener('click', () => selectOption(index));
        optionsContainer.appendChild(optionButton);
    });

    // Hide next button initially
    nextBtn.classList.add('hidden');
}

// Select an option
function selectOption(selectedIndex) {
    const question = quizQuestions[currentQuestionIndex];
    const optionButtons = document.querySelectorAll('.option-btn');
    let isCorrect = false;

    // Disable all options after selection
    optionButtons.forEach(button => {
        button.disabled = true;
    });

    // Mark correct and incorrect answers
    optionButtons.forEach((button, index) => {
        if (index === question.correctAnswer) {
            button.classList.add('correct');
        } else if (index === selectedIndex && index !== question.correctAnswer) {
            button.classList.add('incorrect');
        }
    });

    // Check if answer is correct
    if (selectedIndex === question.correctAnswer) {
        score++;
        isCorrect = true;
        updateScore();
    }

    // Store user answer
    userAnswers.push({
        questionIndex: currentQuestionIndex,
       