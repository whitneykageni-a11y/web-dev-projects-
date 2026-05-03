const questions = [{
        question: "What does DOM stand for?",
        answers: ["Document Object Model", "Data Object Method", "Digital Ordinance Model"],
        correct: 0
    },
    {
        question: "Which language runs in the browser?",
        answers: ["Python", "JavaScript", "C++"],
        correct: 1
    },
    {
        question: "What does CSS control?",
        answers: ["Behavior", "Structure", "Style"],
        correct: 2
    }
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const nextBtn = document.getElementById("next");
const scoreEl = document.getElementById("score");

function showQuestion() {
    const q = questions[currentQuestion];
    questionEl.textContent = q.question;
    answersEl.innerHTML = "";

    q.answers.forEach((answer, index) => {
        const btn = document.createElement("button");
        btn.textContent = answer;
        btn.addEventListener("click", function() {
            if (index === q.correct) {
                score++;
                scoreEl.textContent = `Score:${score}`;
                btn.style.backgroundColor = "green";
            } else {
                btn.style.backgroundColor = "red";
                const correctBtn = answersEl.children[q.correct];
                correctBtn.style.backgroundColor = "green";
            }
            Array.from(answersEl.children).forEach(b => b.disabled = true);
        });
        answersEl.appendChild(btn);
    });

};


nextBtn.addEventListener("click", function() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        questionEl.textContent = `Quiz finished! Final score: ${score}`;
        answersEl.innerHTML = "";
        nextBtn.style.display = "none";



        const restartBtn = document.createElement("button");
        restartBtn.textContent = "Restart Quiz";
        restartBtn.addEventListener("click", function() {
            currentQuestion = 0;
            score = 0;
            nextBtn.style.display = "inline-block";
            showQuestion();
            scoreEl.textContent = "Score: 0";
        });
        answersEl.appendChild(restartBtn);
        let highScores = JSON.parse(localStorage.getItem("highScores")) || [];
        highScores.push(score);
        localStorage.setItem("highScores", JSON.stringify(highScores));


    }
});

showQuestion();