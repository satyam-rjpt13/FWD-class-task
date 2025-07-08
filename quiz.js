
const questions = [
    {
        question: "What is the largest animal in the world?",
        answer: [
            { text: "Shark", correct: false },
            { text: "Whale", correct: true },
            { text: "Elephant", correct: false },
            { text: "Human", correct: false }
        ]
    },
    {
        question: "Which is the longest river in the world?",
        answer: [
            { text: "Amazon", correct: false },
            { text: "Ganges", correct: false },
            { text: "Nile", correct: true },
            { text: "Yangtze", correct: false }
        ]
    },
    {
        question: "Which country has the largest population?",
        answer: [
            { text: "India", correct: true },
            { text: "USA", correct: false },
            { text: "Russia", correct: false },
            { text: "China", correct: false }
        ]
    },
    {
        question: "Which is the largest desert in the world?",
        answer: [
            { text: "Sahara", correct: false },
            { text: "Gobi", correct: false },
            { text: "Antarctic Desert", correct: true },
            { text: "Arabian Desert", correct: false }
        ]
    },
    {
        question: "Which is the highest mountain in the world?",
        answer: [
            { text: "K2", correct: false },
            { text: "Mount Everest", correct: true },
            { text: "Kanchenjunga", correct: false },
            { text: "Makalu", correct: false }
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answer.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click", selectAnswer)
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
   Array.from(answerButtons.children).forEach(button => {
    if (button.dataset.correct === "true") {
        button.classList.add("correct");
    }
    button.disabled = true;
  });
nextButton.style.display = "block";

}
function showScore() {
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {
    if (currentQuestionIndex < questions.length) {
        handleNextButton();
    } else {
        startQuiz();
    }
});



startQuiz();





