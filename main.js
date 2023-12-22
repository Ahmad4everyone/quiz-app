console.log("ola")

const quizdata = [
    {
        question: 'What is thne capital of Nigeria?',
        options: ['Abuja','Kano','Enugu','Lagos'],
        answer:'Abuja',
    },
    {
        question:'What does HTML stands for?',
        options:['Hypertext Multi Language','Hyper Tutor Mixed Learning','Hypertext Markup Language','Hello Text MarkUp language'],
        answer:'Hypertext Markup Language',
    },
    {
        question:'Who is the current president of Nigeria?',
        options:['Muhammadu Buahri','Atiku Abubakar','Bola Ahmed Tinubu','Peter Obi'],
        answer:'Bola Ahmed Tinubu',
    },
    {
        question:'How many countries are there in Africa?',
        options:['45','29','54','38'],
        answer:'54'
    },
    {
        question:'What is official language in Nigeria?',
        options:['Hausa','Igbo','Yoruba','English'],
        answer:'English'
    },
    {
        question:'What is the chemical symbol for Gold?',
        options:['Ag','Cu','Fe','Au'],
        answer:'Au'
    },
    {
        question:'Who was the first civilian president in Nigeria',
        options:['Tafawa Balewa','Nnamdi Azikwe','Olusegun Obasanjo','Obafemi Awolowo'],
        answer:'Olusegun Obasanjo'
    },
    {
        question:'What country has the name of its continent?',
        options:['America','Europe','Africa','Australia'],
        answer:'Australia'
    },
    {
        question:'What year did Nigeria got her indepedent?',
        options:['Oct 1st 1962','Jan 2nd 1954','Oct 1st 1960','Oct 1st 1963'],
        answer:'Oct 1st 1960'
    },
    {
        question:'What does the BRICS acronym stands for?',
        options:['Be Right In Choice Suddenly','Brazil,Russia,India,China,South-Africa','Bold Relentless illicit captain strong','Barbados resolve in changing supplies'],
        answer:"Brazil,Russia,India,China,South-Africa"
    },
];

const quizcont = document.getElementById("quiz");
const resultcont = document.getElementById("result");
const submitbtn = document.getElementById("submit");
const retrybtn = document.getElementById("retry");
const showans = dosument.getElementById("showans");

let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];

function shuffleArray(array) {
    for(let i = array.lenght - 1; i > 0; i--){
        const j = math.floor(math.random() * (i + 1));
        [array[i], array [j]] = [array[j], array[i]];
    }
}

function displayQuestion(){
    const questionData = quizdata[currentQuestion]
    const questionElement = document.createElement('div');
  questionElement.className = 'question';
  questionElement.innerHTML = questionData.question;

  const optionsElement = document.createElement('div');
  optionsElement.className = 'options';

  const shuffledOptions = [...questionData.options];
  shuffleArray(shuffledOptions);

  for (let i = 0; i < shuffledOptions.length; i++) {
    const option = document.createElement('label');
    option.className = 'option';

    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'quiz';
    radio.value = shuffledOptions[i];
    const optionText = document.createTextNode(shuffledOptions[i]);

    option.appendChild(radio);
    option.appendChild(optionText);
    optionsElement.appendChild(option);
  }

  quizcont.innerHTML = '';
  quizcont.appendChild(questionElement);
  quizcont.appendChild(optionsElement);
}

function checkAnswer() {
  const selectedOption = document.querySelector('input[name="quiz"]:checked');
  if (selectedOption) {
    const answer = selectedOption.value;
    if (answer === quizdata[currentQuestion].answer) {
      score++;
    } else {
      incorrectAnswers.push({
        question: quizdata[currentQuestion].question,
        incorrectAnswer: answer,
        correctAnswer: quizdata[currentQuestion].answer,
      });
    }
    currentQuestion++;
    selectedOption.checked = false;
    if (currentQuestion < quizdata.length) {
      displayQuestion();
    } else {
      displayResult();
    }
  }
}

function displayResult() {
  quizcont.style.display = 'none';
  submitbtn.style.display = 'none';
  retrybtn.style.display = 'inline-block';
  showans.style.display = 'inline-block';
  resultcont.innerHTML = 'You scored ${score} out of ${quizdata.length}!';
}

function retryQuiz() {
  currentQuestion = 0;
  score = 0;
  incorrectAnswers = [];
  quizcont.style.display = 'block';
  submitbtn.style.display = 'inline-block';
  retrybtn.style.display = 'none';
  showans.style.display = 'none';
  resultcont.innerHTML = '';
  displayQuestion();
}

function showAnswer() {
  quizcont.style.display = 'none';
  submitbtn.style.display = 'none';
  retrybtn.style.display = 'inline-block';
  showans.style.display = 'none';

  let incorrectAnswersHtml = '';
  for (let i = 0; i < incorrectAnswers.length; i++) {
    incorrectAnswersHtml += `
      <p>
        <strong>Question:</strong> ${incorrectAnswers[i].question}<br>
        <strong>Your Answer:</strong> ${incorrectAnswers[i].incorrectAnswer}<br>
        <strong>Correct Answer:</strong> ${incorrectAnswers[i].correctAnswer}
      </p>
    `;
  }

  resultcont.innerHTML = `
    <p>You scored ${score} out of ${quizData.length}!</p>
    <p>Incorrect Answers:</p>
    ${incorrectAnswersHtml}
    `;
}

submitbtn.addEventListener('click', checkAnswer);
retrybtn.addEventListener('click', retryQuiz);
showans.addEventListener('click', showAnswer);

displayQuestion();

