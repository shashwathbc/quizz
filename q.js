const quizData = [{
    question: "Which language runs in a web browser?",
    a: "Java",
    b: "C",
    c: "Python",
    d: "JavaScript",
    correct: "d",
},
{
    question: "What does CSS stand for?",
    a: "Central Style Sheets",
    b: "Cascading Style Sheets",
    c: "Cascading Simple Sheets",
    d: "Cars SUVs Sailboats",
    correct: "b",
},
// sd
{
    question: "What does HTML stand for?",
    a: "Hypertext Markup Language",
    b: "Hypertext Markdown Language",
    c: "Hyperloop Machine Language",
    d: "Helicopters Terminals Motorboats Lamborginis",
    correct: "a",
},
{
    question: "What year was JavaScript launched?",
    a: "1996",
    b: "1995",
    c: "1994",
    d: "none of the above",
    correct: "b",
},
];

// ...............All about progress Bar.................
// const prev = document.getElementById("prev")
const progress = document.getElementById("progress")
const circles = document.querySelectorAll(".circle")


const quiz = document.getElementById("quiz")
const answerEls = document.querySelectorAll(".answer")
const questionEl = document.getElementById("question")

const nextBtn = document.getElementById("next")
const prevBtn = document.getElementById("prev")

const a_text = document.getElementById("a_text")
const b_text = document.getElementById("b_text")
const c_text = document.getElementById("c_text")
const d_text = document.getElementById("d_text")

let currentActive = 1
let numberOfCircles = circles.length

function enableDisable() {

if (currentActive === 1) {
    prevBtn.disabled = true
} else if (currentActive === numberOfCircles) {
    nextBtn.innerText = "Submit"
    nextBtn.style.backgroundColor = "green"
} else {
    prevBtn.disabled = false
    nextBtn.innerText = "Next"
}
}

function updateCSS() {
for (var i = 0; i < numberOfCircles; i++) {
    const circle = circles[i]

    if (i < currentActive) {
        circle.classList.add("active")
    } else {
        circle.classList.remove("active")
    }
}
const activesxyz = document.querySelectorAll(".active")

// Calculate width
// Set progress bar width = formula
const widthxyz = (activesxyz.length - 1) / (circles.length - 1) * 100

progress.style.width = widthxyz + "%"


enableDisable()

}


// ...............All about Quiz.................




let score = 0;

let currentQuestion = 0

function loadQuestion() {

deselectAnswers()
const currentQuizData = quizData[currentQuestion]

questionEl.innerText = currentQuizData.question

a_text.innerText = currentQuizData.a
b_text.innerText = currentQuizData.b
c_text.innerText = currentQuizData.c
d_text.innerText = currentQuizData.d
}

function deselectAnswers() {
answerEls.forEach(answerEl => answerEl.checked = false)
}

function getSelected() {
let answer;

answerEls.forEach(answerEl => {
    if (answerEl.checked) {
        answer = answerEl.id
    }
})
return answer
}
loadQuestion()
var col = -1;
var array = [];
nextBtn.addEventListener("click", () => {
const answer = getSelected()
if (answer) {
    if (answer === quizData[currentQuestion].correct) {
        score++;
        col++;
        array.unshift(1)
    } else {
        array.unshift(0)
        col++;
        circles[col].style.borderColor = "green"
    }
    currentQuestion++
    if (currentQuestion < quizData.length) {
        loadQuestion()
        currentActive++;
        if (currentActive > numberOfCircles) {
            currentActive = numberOfCircles
        }
        // console.log(currentActive)
        updateCSS()
    } else {
        quiz.innerHTML = `
        <h2>
            You answered ${score}/${quizData.length} questions correctly
        </h2>
        <div class="containerbtn">
        <button class="btn" onclick="location.reload() ">Reload</button>
        </div>
        `
    }
}
})

prevBtn.addEventListener("click", () => {
circles[col].style.borderColor = "#3498db"
if (array[0] == 1) {
    score--;
}
currentQuestion--;
loadQuestion();
currentActive--;
if (currentActive < 1) {
    currentActive = 1
}
updateCSS()
array.shift(col)
col--;

})