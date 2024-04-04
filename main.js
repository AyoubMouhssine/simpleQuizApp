
const btnStartQuiz = document.getElementById("btn-startQuiz");

let quizBody = document.getElementById("quizBody");

let questionIndex = 0;
let totalCorrect = 0;
let totalIncorrect = 0;

btnStartQuiz.onclick = function () {
  let counter = 5;
  let counterInterval = setInterval(() => {
    let counterTime = setTimeout(() => {
      quizBody.innerHTML = `
          <h1>Quiz Start After ${counter}</h1>
          `;
      if (counter === 0) {
        clearInterval(counterInterval);
        clearTimeout(counterTime);
        displayQuestions(quizBody, questions, questionIndex);
        return;
      }
      counter--;
    }, 1000);
  }, 1000);
};

function checkQuestionExit(question, gameBody) {
  if (!question) {
    const retryBtn = document.createElement("button");
    retryBtn.type = "button";
    retryBtn.className = "retryBtn";
    retryBtn.textContent = "Play again";
    retryBtn.onclick = function () {
      top.location.reload();
    };

    gameBody.innerHTML = `
          <h1 class='score'>Score</h1>
          <h4>Correct: ${totalCorrect}</h4>
          <h4>InCorrect: ${totalIncorrect}</h4>
          `;
    gameBody.appendChild(retryBtn);
    return;
  }
}

function displayQuestions(container, questions, questionIndex) {
  container.innerHTML = "";
  const question = questions[questionIndex];

  checkQuestionExit(question, container);

  let ul = document.createElement("ul");
  const div = document.createElement("div");
  const h2 = document.createElement("h2");
  h2.textContent = question["question"];

  question["options"].forEach((option, userAnswerIndex) => {
    const li = document.createElement("li");
    li.textContent = option;
    li.onclick = () => showAnswer(questionIndex, userAnswerIndex);
    ul.appendChild(li);
  });

  div.appendChild(h2);
  div.appendChild(ul);
  container.append(div);
}

function showAnswer(questionIndex, userAnswerIndex) {
  let question = questions[questionIndex];
  isAnswer = question["correctAnswerIndex"] === userAnswerIndex;

  !isAnswer ? totalIncorrect++ : totalCorrect++;

  questionIndex++;

  displayQuestions(quizBody, questions, questionIndex);
}
