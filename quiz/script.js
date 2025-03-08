const questions = [
  {
    question: "What is the capital of France?",
    answers: ["Paris", "London", "Berlin", "Madrid"],
    correctAnswer: "Paris"
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: ["Earth", "Mars", "Jupiter", "Saturn"],
    correctAnswer: "Mars"
  },
  {
    question: "What is the largest mammal?",
    answers: ["Elephant", "Blue Whale", "Giraffe", "Shark"],
    correctAnswer: "Blue Whale"
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    answers: ["Charles Dickens", "William Shakespeare", "Mark Twain", "Jane Austen"],
    correctAnswer: "William Shakespeare"
  },
  {
    question: "What is the chemical symbol for water?",
    answers: ["H2O", "CO2", "NaCl", "O2"],
    correctAnswer: "H2O"
  },
  {
    question: "Which country is known as the Land of the Rising Sun?",
    answers: ["China", "Japan", "South Korea", "Thailand"],
    correctAnswer: "Japan"
  },
  {
    question: "What is the smallest prime number?",
    answers: ["1", "2", "3", "5"],
    correctAnswer: "2"
  },
  {
    question: "Who painted the Mona Lisa?",
    answers: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"],
    correctAnswer: "Leonardo da Vinci"
  },
  {
    question: "What is the largest ocean on Earth?",
    answers: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    correctAnswer: "Pacific Ocean"
  },
  {
    question: "Which element has the atomic number 1?",
    answers: ["Helium", "Hydrogen", "Oxygen", "Carbon"],
    correctAnswer: "Hydrogen"
  },
  {
    question: "What is the capital of Australia?",
    answers: ["Sydney", "Melbourne", "Canberra", "Brisbane"],
    correctAnswer: "Canberra"
  },
  {
    question: "Who discovered gravity?",
    answers: ["Albert Einstein", "Isaac Newton", "Galileo Galilei", "Nikola Tesla"],
    correctAnswer: "Isaac Newton"
  },
  {
    question: "What is the hardest natural substance on Earth?",
    answers: ["Gold", "Iron", "Diamond", "Quartz"],
    correctAnswer: "Diamond"
  },
  {
    question: "Which country is famous for the pyramids?",
    answers: ["Greece", "Egypt", "Italy", "Mexico"],
    correctAnswer: "Egypt"
  },
  {
    question: "What is the currency of Japan?",
    answers: ["Yuan", "Won", "Yen", "Ringgit"],
    correctAnswer: "Yen"
  },
  {
    question: "Who is known as the father of computers?",
    answers: ["Charles Babbage", "Alan Turing", "Bill Gates", "Steve Jobs"],
    correctAnswer: "Charles Babbage"
  },
  {
    question: "What is the largest desert in the world?",
    answers: ["Sahara Desert", "Arabian Desert", "Gobi Desert", "Antarctica"],
    correctAnswer: "Antarctica"
  },
  {
    question: "Which gas do plants absorb from the atmosphere?",
    answers: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"],
    correctAnswer: "Carbon Dioxide"
  },
  {
    question: "What is the capital of Canada?",
    answers: ["Toronto", "Vancouver", "Ottawa", "Montreal"],
    correctAnswer: "Ottawa"
  },
  {
    question: "Who wrote '1984'?",
    answers: ["George Orwell", "Aldous Huxley", "Ray Bradbury", "J.K. Rowling"],
    correctAnswer: "George Orwell"
  },
  {
    question: "What is the speed of light?",
    answers: ["300,000 km/s", "150,000 km/s", "450,000 km/s", "600,000 km/s"],
    correctAnswer: "300,000 km/s"
  },
  {
    question: "Which planet is closest to the Sun?",
    answers: ["Venus", "Mercury", "Earth", "Mars"],
    correctAnswer: "Mercury"
  },
  {
    question: "What is the largest country by area?",
    answers: ["China", "USA", "Russia", "Canada"],
    correctAnswer: "Russia"
  },
  {
    question: "Who developed the theory of relativity?",
    answers: ["Isaac Newton", "Albert Einstein", "Stephen Hawking", "Niels Bohr"],
    correctAnswer: "Albert Einstein"
  },
  {
    question: "What is the capital of Brazil?",
    answers: ["Rio de Janeiro", "São Paulo", "Brasília", "Salvador"],
    correctAnswer: "Brasília"
  },
  {
    question: "Which animal is known as the 'King of the Jungle'?",
    answers: ["Tiger", "Lion", "Elephant", "Gorilla"],
    correctAnswer: "Lion"
  },
  {
    question: "What is the smallest continent by area?",
    answers: ["Africa", "Europe", "Australia", "Antarctica"],
    correctAnswer: "Australia"
  },
  {
    question: "Who is the author of 'Pride and Prejudice'?",
    answers: ["Jane Austen", "Charlotte Brontë", "Emily Brontë", "Virginia Woolf"],
    correctAnswer: "Jane Austen"
  },
  {
    question: "What is the chemical symbol for gold?",
    answers: ["Au", "Ag", "Fe", "Cu"],
    correctAnswer: "Au"
  },
  {
    question: "Which country is known as the Land of the Midnight Sun?",
    answers: ["Norway", "Sweden", "Finland", "Iceland"],
    correctAnswer: "Norway"
  },
  {
    question: "What is the largest bird in the world?",
    answers: ["Eagle", "Ostrich", "Albatross", "Penguin"],
    correctAnswer: "Ostrich"
  },
  {
    question: "Who invented the telephone?",
    answers: ["Thomas Edison", "Alexander Graham Bell", "Nikola Tesla", "Guglielmo Marconi"],
    correctAnswer: "Alexander Graham Bell"
  },
  {
    question: "What is the capital of Italy?",
    answers: ["Venice", "Rome", "Milan", "Florence"],
    correctAnswer: "Rome"
  },
  {
    question: "Which gas is most abundant in Earth's atmosphere?",
    answers: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
    correctAnswer: "Nitrogen"
  },
  {
    question: "What is the longest river in the world?",
    answers: ["Amazon River", "Nile River", "Yangtze River", "Mississippi River"],
    correctAnswer: "Nile River"
  },
  {
    question: "Who is known as the 'Father of the Nation' in India?",
    answers: ["Jawaharlal Nehru", "Mahatma Gandhi", "Subhas Chandra Bose", "Bhagat Singh"],
    correctAnswer: "Mahatma Gandhi"
  },
  {
    question: "What is the capital of Spain?",
    answers: ["Barcelona", "Madrid", "Seville", "Valencia"],
    correctAnswer: "Madrid"
  },
  {
    question: "Which planet has the most moons?",
    answers: ["Earth", "Jupiter", "Saturn", "Mars"],
    correctAnswer: "Saturn"
  },
  {
    question: "What is the largest organ in the human body?",
    answers: ["Liver", "Heart", "Skin", "Brain"],
    correctAnswer: "Skin"
  },
  {
    question: "Who wrote 'The Great Gatsby'?",
    answers: ["F. Scott Fitzgerald", "Ernest Hemingway", "Mark Twain", "John Steinbeck"],
    correctAnswer: "F. Scott Fitzgerald"
  },
  {
    question: "What is the capital of Germany?",
    answers: ["Munich", "Berlin", "Hamburg", "Frankfurt"],
    correctAnswer: "Berlin"
  },
  {
    question: "Which country is famous for inventing pizza?",
    answers: ["France", "Italy", "Spain", "Greece"],
    correctAnswer: "Italy"
  },
  {
    question: "What is the chemical symbol for sodium?",
    answers: ["Na", "So", "Sd", "Ni"],
    correctAnswer: "Na"
  },
  {
    question: "Who is the Greek god of the sea?",
    answers: ["Zeus", "Poseidon", "Hades", "Apollo"],
    correctAnswer: "Poseidon"
  },
  {
    question: "What is the capital of South Africa?",
    answers: ["Cape Town", "Pretoria", "Johannesburg", "Durban"],
    correctAnswer: "Pretoria"
  },
  {
    question: "Which planet is known for its rings?",
    answers: ["Jupiter", "Saturn", "Uranus", "Neptune"],
    correctAnswer: "Saturn"
  },
  {
    question: "What is the largest bone in the human body?",
    answers: ["Femur", "Tibia", "Humerus", "Skull"],
    correctAnswer: "Femur"
  },
  {
    question: "Who wrote 'The Odyssey'?",
    answers: ["Homer", "Virgil", "Sophocles", "Plato"],
    correctAnswer: "Homer"
  },
  {
    question: "What is the capital of Argentina?",
    answers: ["Buenos Aires", "Santiago", "Lima", "Montevideo"],
    correctAnswer: "Buenos Aires"
  },
  {
    question: "Which country is known as the Land of Fire and Ice?",
    answers: ["Iceland", "Greenland", "Norway", "Finland"],
    correctAnswer: "Iceland"
  }
];

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 30;
let timer;
let userAnswers = new Array(questions.length).fill(null); // Track user answers
let shuffledQuestions = []; // Store shuffled questions

// Shuffle the questions array
function shuffleQuestions() {
  shuffledQuestions = [...questions]; // Create a copy of the questions array
  for (let i = shuffledQuestions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Random index
    [shuffledQuestions[i], shuffledQuestions[j]] = [shuffledQuestions[j], shuffledQuestions[i]]; // Swap elements
  }
}

// Shuffle the answer options for a question
function shuffleAnswers(answers) {
  for (let i = answers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1)); // Random index
    [answers[i], answers[j]] = [answers[j], answers[i]]; // Swap elements
  }
  return answers;
}

// DOM Elements
const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const timerElement = document.getElementById("time");
const scoreElement = document.getElementById("current-score");
const nextButton = document.getElementById("next-btn");
const prevButton = document.getElementById("prev-btn");
const questionCountElement = document.getElementById("current-question");
const totalQuestionsElement = document.getElementById("total-questions");
const quizContainer = document.getElementById("quiz-container");
const resultContainer = document.getElementById("result-container");
const resultBody = document.getElementById("result-body");
const restartButton = document.getElementById("restart-btn");

// Load a question
function loadQuestion() {
  const currentQuestion = shuffledQuestions[currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;
  answersElement.innerHTML = ""; // Clear previous answers

  // Shuffle the answer options
  const shuffledAnswers = shuffleAnswers([...currentQuestion.answers]);

  // Add answer buttons
  shuffledAnswers.forEach(answer => {
    const button = document.createElement("button");
    button.textContent = answer;
    button.classList.add("btn", "btn-outline-primary", "mb-2");
    button.addEventListener("click", () => selectAnswer(answer, button));
    answersElement.appendChild(button);
  });

  // Highlight the user's selected answer (if any)
  if (userAnswers[currentQuestionIndex] !== null) {
    const selectedAnswer = userAnswers[currentQuestionIndex];
    const buttons = answersElement.querySelectorAll("button");
    buttons.forEach(btn => {
      if (btn.textContent === selectedAnswer) {
        btn.classList.remove("btn-outline-primary");
        btn.classList.add("btn-primary");
      }
    });
  }

  // Update question count
  questionCountElement.textContent = currentQuestionIndex + 1;
  totalQuestionsElement.textContent = shuffledQuestions.length;

  // Reset timer
  clearInterval(timer);
  timeLeft = 30;
  timerElement.textContent = timeLeft;
  startTimer();

  // Enable/disable Previous button
  prevButton.disabled = currentQuestionIndex === 0;
}

// Select an answer
function selectAnswer(answer, button) {
  userAnswers[currentQuestionIndex] = answer; // Save user's answer

  // Disable all buttons to prevent further clicks
  const allButtons = answersElement.querySelectorAll("button");
  allButtons.forEach(btn => btn.disabled = true);

  // Highlight the chosen answer
  button.classList.remove("btn-outline-primary");
  button.classList.add("btn-primary");

  // Check if the answer is correct
  const correctAnswer = shuffledQuestions[currentQuestionIndex].correctAnswer;
  if (answer === correctAnswer) {
    score++;
    scoreElement.textContent = score;
  }

  // Highlight the correct answer and wrong answer
  allButtons.forEach(btn => {
    if (btn.textContent === correctAnswer) {
      btn.classList.remove("btn-outline-primary");
      btn.classList.add("btn-success"); // Correct answer
    } else if (btn.textContent === answer && answer !== correctAnswer) {
      btn.classList.remove("btn-outline-primary");
      btn.classList.add("btn-danger"); // Wrong answer
    }
  });

  // Enable Next button
  nextButton.disabled = false;
  clearInterval(timer);
}

// Start the timer
function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    timerElement.textContent = timeLeft;

    if (timeLeft === 0) {
      clearInterval(timer);
      nextButton.disabled = false;

      // Automatically show the correct answer when time runs out
      const correctAnswer = shuffledQuestions[currentQuestionIndex].correctAnswer;
      const allButtons = answersElement.querySelectorAll("button");
      allButtons.forEach(btn => {
        if (btn.textContent === correctAnswer) {
          btn.classList.remove("btn-outline-primary");
          btn.classList.add("btn-success"); // Correct answer
        }
        btn.disabled = true;
      });
    }
  }, 1000);
}

// Move to the next question
nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < shuffledQuestions.length - 1) {
    currentQuestionIndex++;
    loadQuestion();
    nextButton.disabled = true;
  } else {
    showResults();
  }
});

// Move to the previous question
prevButton.addEventListener("click", () => {
  if (currentQuestionIndex > 0) {
    currentQuestionIndex--;
    loadQuestion();
    nextButton.disabled = false;
  }
});

// Show detailed results
function showResults() {
  quizContainer.style.display = "none";
  resultContainer.style.display = "block";

  resultBody.innerHTML = ""; // Clear previous results

  let correctCount = 0;
  let wrongCount = 0;
  let unansweredCount = 0;

  shuffledQuestions.forEach((question, index) => {
    const row = document.createElement("tr");
    const userAnswer = userAnswers[index];
    const isCorrect = userAnswer === question.correctAnswer;

    if (userAnswer === null) {
      unansweredCount++;
    } else if (isCorrect) {
      correctCount++;
    } else {
      wrongCount++;
    }

    row.innerHTML = `
      <td>${question.question}</td>
      <td class="${isCorrect ? "text-success" : "text-danger"}">${userAnswer || "Not answered"}</td>
      <td>${question.correctAnswer}</td>
    `;
    resultBody.appendChild(row);
  });

  // Display result summary
  const resultSummary = document.createElement("div");
  resultSummary.innerHTML = `
    <h3 class="mt-4">Result Summary</h3>
    <p>Total Questions: ${shuffledQuestions.length}</p>
    <p class="text-success">Correct Answers: ${correctCount}</p>
    <p class="text-danger">Wrong Answers: ${wrongCount}</p>
    <p class="text-warning">Unanswered Questions: ${unansweredCount}</p>
  `;
  resultContainer.appendChild(resultSummary);
}

// Restart the quiz
restartButton.addEventListener("click", () => {
  currentQuestionIndex = 0;
  score = 0;
  userAnswers.fill(null);
  shuffleQuestions(); // Shuffle questions again
  quizContainer.style.display = "block";
  resultContainer.style.display = "none";
  loadQuestion();
});

// Initialize the quiz
shuffleQuestions(); // Shuffle questions at the start
loadQuestion();
