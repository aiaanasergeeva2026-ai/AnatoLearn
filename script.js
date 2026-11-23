const quizData = [
    {
        question: "Какой орган перекачивает кровь по всему организму?",
        answers: ["Лёгкие", "Сердце", "Печень", "Почки"],
        correct: 1
    },
    {
        question: "Сколько камер в сердце человека?",
        answers: ["2", "3", "4", "5"],
        correct: 2
    },
    {
        question: "Какой орган отвечает за дыхание и газообмен?",
        answers: ["Желудок", "Лёгкие", "Почки", "Мозг"],
        correct: 1
    },
    {
        question: "Что соединяет мышцы с костями?",
        answers: ["Связки", "Сухожилия", "Нервы", "Хрящи"],
        correct: 1
    },
    {
        question: "Какой орган фильтрует кровь и образует мочу?",
        answers: ["Печень", "Сердце", "Почки", "Желудок"],
        correct: 2
    },
    {
        question: "Какой орган управляет работой всего организма?",
        answers: ["Сердце", "Головной мозг", "Желудок", "Печень"],
        correct: 1
    },
    {
        question: "Какие клетки крови переносят кислород?",
        answers: ["Лейкоциты", "Тромбоциты", "Эритроциты", "Плазма"],
        correct: 2
    },
    {
        question: "Какая мышца является главной дыхательной мышцей?",
        answers: ["Бицепс", "Диафрагма", "Трицепс", "Икроножная"],
        correct: 1
    }
];

let quizIndex = 0;
let quizScore = 0;
let quizAnswered = false;

const quizScreen   = document.getElementById("quizScreen");
const quizResult   = document.getElementById("quizResult");
const progressBar  = document.getElementById("quizProgressBar");
const counterEl    = document.getElementById("quizCounter");
const questionEl   = document.getElementById("quizQuestion");
const optionsEl    = document.getElementById("quizOptions");
const nextBtn      = document.getElementById("quizNext");
const scoreEl      = document.getElementById("quizScore");
const messageEl    = document.getElementById("quizMessage");
const restartBtn   = document.getElementById("quizRestart");


function renderQuestion() {
    quizAnswered = false;

    const item = quizData[quizIndex];

    counterEl.textContent = `Вопрос ${quizIndex + 1} из ${quizData.length}`;
    progressBar.style.width = ((quizIndex) / quizData.length * 100) + "%";

    questionEl.textContent = item.question;

    optionsEl.innerHTML = "";

    item.answers.forEach((answer, i) => {
        const btn = document.createElement("button");
        btn.className = "quiz-option";
        btn.textContent = answer;
        btn.addEventListener("click", () => selectAnswer(i, btn));
        optionsEl.appendChild(btn);
    });

    nextBtn.style.display = "none";
}

function selectAnswer(index, btn) {
    if (quizAnswered) return;
    quizAnswered = true;

    const item = quizData[quizIndex];
    const options = optionsEl.querySelectorAll(".quiz-option");

    options.forEach(o => o.disabled = true);

    if (index === item.correct) {
        btn.classList.add("correct");
        quizScore++;
    } else {
        btn.classList.add("wrong");
        options[item.correct].classList.add("correct");
    }

    nextBtn.style.display = "inline-block";
}

nextBtn.addEventListener("click", () => {
    quizIndex++;

    if (quizIndex >= quizData.length) {
        showResult();
    } else {
        renderQuestion();
    }
});

function showResult() {
    quizScreen.style.display = "none";
    quizResult.style.display = "block";

    progressBar.style.width = "100%";

    scoreEl.textContent = `${quizScore} / ${quizData.length}`;

    let msg;
    if (quizScore <= 3) {
        msg = "Попробуй ещё раз. Начни с изучения базовых органов и систем.";
    } else if (quizScore <= 5) {
        msg = "Неплохо! Основы уже есть, но некоторые темы стоит повторить.";
    } else if (quizScore <= 7) {
        msg = "Очень хороший результат! Ты хорошо знаешь анатомию.";
    } else {
        msg = "Отличный результат! Анатомия у тебя уже на высоком уровне. 🎉";
    }

    messageEl.textContent = msg;
}

restartBtn.addEventListener("click", () => {
    quizIndex = 0;
    quizScore = 0;
    quizResult.style.display = "none";
    quizScreen.style.display = "block";
    renderQuestion();
});

renderQuestion();