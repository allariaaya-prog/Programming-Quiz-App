/*first create an array of questions,
each question will have a question text, an array of options,
and the index of the correct answer.*/


const questions = [
    {
        question: "What does HTML stand for?",
        options: [
            "High Text Markup Language",
            "Hyper Text Markup Language",
            "Hyper Text Make Language",
            "High Text Make Language"
        ],
        answer: 1
    },

    {
        question: "Which CSS property is used to change the text color?",
        options: [
            "background-color",
            "font-color",
            "color",
            "text-color"
        ],
        answer: 2
    },

    {
        question: "Which symbol is used for single-line comments in JavaScript?",
        options: [
            "//",
            "/*",
            "*/",
            "<!--"
        ],
        answer: 0
    },

    {
        question: "Which JavaScript keyword is used to declare a variable?",
        options: [
            "var",
            "const",
            "function",
            "let"
        ],
        answer: 3
    }
];


//here we will get references to the HTML elements we need to manipulate by id
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");


//we will keep track of the current question index and the user's score
let currentQuestionIndex = 0;
let score = 0;


/*This function will start the quiz by resetting the current question index and score,
and showing the first question */

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

/*This function will display the current question and its options */

function showQuestion() {
    resetState();

    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;

    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.innerHTML = option;
        button.classList.add("btn");

        if (index === currentQuestion.answer)
        {
            button.dataset.correct = "true";
        }

        button.addEventListener("click", selectAnswer);
        answerButtons.appendChild(button);
    });
}

//this function resets the state of the quiz 
function resetState() {
    nextButton.style.display = "none";

    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}


//this function will handle the user's answer selection
function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if (isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
    } 
    
    else
    {
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        if (button.dataset.correct === "true")
        {
            button.classList.add("correct");
        }

        button.disabled = true;
    });

    nextButton.style.display = "block";
}

function showScore()
{
    resetState();

    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;

    nextButton.innerHTML = "Try Again";
    nextButton.style.display = "block";
}

function handleNextButton() {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } 
    
    else {
        showScore();
    }
}

nextButton.addEventListener("click", () => {

    if (nextButton.innerHTML === "Try Again") {
        startQuiz();
    } 

    else
    {
        handleNextButton();
    }

});

startQuiz();