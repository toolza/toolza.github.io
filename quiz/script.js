const questionsByCategory = {
  geography: [
    {
      question: "What is the capital of France?",
      answers: ["Paris", "London", "Berlin", "Madrid"],
      correctAnswer: "Paris"
    },
    {
      question: "Which is the longest river in the world?",
      answers: ["Nile", "Amazon", "Yangtze", "Mississippi"],
      correctAnswer: "Nile"
    },
    {
      question: "What is the largest desert in the world?",
      answers: ["Sahara", "Arabian", "Gobi", "Kalahari"],
      correctAnswer: "Sahara"
    },
    {
      question: "Which country has the largest population?",
      answers: ["China", "India", "USA", "Indonesia"],
      correctAnswer: "China"
    },
    {
      question: "What is the capital of Japan?",
      answers: ["Tokyo", "Kyoto", "Osaka", "Seoul"],
      correctAnswer: "Tokyo"
    },
    {
      question: "Which continent is the Sahara Desert located on?",
      answers: ["Africa", "Asia", "Australia", "South America"],
      correctAnswer: "Africa"
    },
    {
      question: "What is the smallest country in the world?",
      answers: ["Vatican City", "Monaco", "San Marino", "Liechtenstein"],
      correctAnswer: "Vatican City"
    },
    {
      question: "Which ocean is the largest?",
      answers: ["Pacific", "Atlantic", "Indian", "Arctic"],
      correctAnswer: "Pacific"
    },
    {
      question: "What is the capital of Australia?",
      answers: ["Canberra", "Sydney", "Melbourne", "Brisbane"],
      correctAnswer: "Canberra"
    },
    {
      question: "Which country is known as the Land of the Rising Sun?",
      answers: ["Japan", "China", "South Korea", "Thailand"],
      correctAnswer: "Japan"
    },
    {
      question: "What is the highest mountain in the world?",
      answers: ["Mount Everest", "K2", "Kangchenjunga", "Lhotse"],
      correctAnswer: "Mount Everest"
    },
    {
      question: "Which river flows through the Grand Canyon?",
      answers: ["Colorado River", "Mississippi River", "Rio Grande", "Columbia River"],
      correctAnswer: "Colorado River"
    },
    {
      question: "What is the capital of Canada?",
      answers: ["Ottawa", "Toronto", "Vancouver", "Montreal"],
      correctAnswer: "Ottawa"
    },
    {
      question: "Which country is the largest by land area?",
      answers: ["Russia", "Canada", "China", "USA"],
      correctAnswer: "Russia"
    },
    {
      question: "What is the capital of Brazil?",
      answers: ["Brasília", "Rio de Janeiro", "São Paulo", "Buenos Aires"],
      correctAnswer: "Brasília"
    },
    {
      question: "Which continent is known as the 'Cradle of Civilization'?",
      answers: ["Asia", "Africa", "Europe", "South America"],
      correctAnswer: "Asia"
    },
    {
      question: "What is the capital of South Africa?",
      answers: ["Pretoria", "Cape Town", "Johannesburg", "Durban"],
      correctAnswer: "Pretoria"
    },
    {
      question: "Which country is home to the Great Barrier Reef?",
      answers: ["Australia", "Brazil", "Indonesia", "Philippines"],
      correctAnswer: "Australia"
    },
    {
      question: "What is the capital of Italy?",
      answers: ["Rome", "Milan", "Venice", "Florence"],
      correctAnswer: "Rome"
    },
    {
      question: "Which country is known as the Land of Fire and Ice?",
      answers: ["Iceland", "Greenland", "Norway", "Finland"],
      correctAnswer: "Iceland"
    },
    {
      question: "What is the capital of Argentina?",
      answers: ["Buenos Aires", "Santiago", "Lima", "Montevideo"],
      correctAnswer: "Buenos Aires"
    },
    {
      question: "Which is the largest lake in the world by surface area?",
      answers: ["Caspian Sea", "Lake Superior", "Lake Victoria", "Lake Huron"],
      correctAnswer: "Caspian Sea"
    },
    {
      question: "What is the capital of Egypt?",
      answers: ["Cairo", "Alexandria", "Luxor", "Giza"],
      correctAnswer: "Cairo"
    },
    {
      question: "Which country is the largest producer of coffee?",
      answers: ["Brazil", "Colombia", "Vietnam", "Ethiopia"],
      correctAnswer: "Brazil"
    },
    {
      question: "What is the capital of Germany?",
      answers: ["Berlin", "Munich", "Hamburg", "Frankfurt"],
      correctAnswer: "Berlin"
    },
    {
      question: "Which country is known as the Land of a Thousand Lakes?",
      answers: ["Finland", "Canada", "Sweden", "Norway"],
      correctAnswer: "Finland"
    },
    {
      question: "What is the capital of India?",
      answers: ["New Delhi", "Mumbai", "Kolkata", "Chennai"],
      correctAnswer: "New Delhi"
    },
    {
      question: "Which country is home to the Amazon Rainforest?",
      answers: ["Brazil", "Peru", "Colombia", "Venezuela"],
      correctAnswer: "Brazil"
    },
    {
      question: "What is the capital of Spain?",
      answers: ["Madrid", "Barcelona", "Seville", "Valencia"],
      correctAnswer: "Madrid"
    },
    {
      question: "Which country is known as the Pearl of the Orient?",
      answers: ["Philippines", "Thailand", "Malaysia", "Indonesia"],
      correctAnswer: "Philippines"
    },
    {
      question: "What is the capital of Russia?",
      answers: ["Moscow", "St. Petersburg", "Kazan", "Novosibirsk"],
      correctAnswer: "Moscow"
    },
    {
      question: "Which country is the largest producer of tea?",
      answers: ["China", "India", "Kenya", "Sri Lanka"],
      correctAnswer: "China"
    },
    {
      question: "What is the capital of Mexico?",
      answers: ["Mexico City", "Guadalajara", "Monterrey", "Puebla"],
      correctAnswer: "Mexico City"
    },
    {
      question: "Which country is known as the Land of the Midnight Sun?",
      answers: ["Norway", "Sweden", "Finland", "Iceland"],
      correctAnswer: "Norway"
    },
    {
      question: "What is the capital of South Korea?",
      answers: ["Seoul", "Busan", "Incheon", "Daegu"],
      correctAnswer: "Seoul"
    },
    {
      question: "Which country is home to the Eiffel Tower?",
      answers: ["France", "Germany", "Italy", "Spain"],
      correctAnswer: "France"
    },
    {
      question: "What is the capital of Thailand?",
      answers: ["Bangkok", "Chiang Mai", "Phuket", "Pattaya"],
      correctAnswer: "Bangkok"
    },
    {
      question: "Which country is known as the Land of the Long White Cloud?",
      answers: ["New Zealand", "Australia", "Fiji", "Samoa"],
      correctAnswer: "New Zealand"
    },
    {
      question: "What is the capital of China?",
      answers: ["Beijing", "Shanghai", "Guangzhou", "Shenzhen"],
      correctAnswer: "Beijing"
    },
    {
      question: "Which country is home to the Pyramids of Giza?",
      answers: ["Egypt", "Sudan", "Libya", "Morocco"],
      correctAnswer: "Egypt"
    },
    {
      question: "What is the capital of Turkey?",
      answers: ["Ankara", "Istanbul", "Izmir", "Antalya"],
      correctAnswer: "Ankara"
    },
    {
      question: "Which country is known as the Land of the Rising Sun?",
      answers: ["Japan", "China", "South Korea", "Thailand"],
      correctAnswer: "Japan"
    },
    {
      question: "What is the capital of New Zealand?",
      answers: ["Wellington", "Auckland", "Christchurch", "Hamilton"],
      correctAnswer: "Wellington"
    },
    {
      question: "Which country is home to the Statue of Liberty?",
      answers: ["USA", "France", "Canada", "UK"],
      correctAnswer: "USA"
    },
    {
      question: "What is the capital of Greece?",
      answers: ["Athens", "Thessaloniki", "Patras", "Heraklion"],
      correctAnswer: "Athens"
    },
    {
      question: "Which country is known as the Land of the Thunder Dragon?",
      answers: ["Bhutan", "Nepal", "Tibet", "Myanmar"],
      correctAnswer: "Bhutan"
    },
    {
      question: "What is the capital of Switzerland?",
      answers: ["Bern", "Zurich", "Geneva", "Basel"],
      correctAnswer: "Bern"
    },
    {
      question: "Which country is home to the Great Wall?",
      answers: ["China", "Mongolia", "South Korea", "Japan"],
      correctAnswer: "China"
    },
    {
      question: "What is the capital of Sweden?",
      answers: ["Stockholm", "Gothenburg", "Malmo", "Uppsala"],
      correctAnswer: "Stockholm"
    },
    {
      question: "What is the total number of States in India?",
      answers: ["29", "30", "31", "28"],
      correctAnswer: "28"
    }
  ],
  science: [
    {
      question: "Which planet is known as the Red Planet?",
      answers: ["Earth", "Mars", "Jupiter", "Saturn"],
      correctAnswer: "Mars"
    },
    {
      question: "What is the chemical symbol for water?",
      answers: ["H2O", "CO2", "O2", "NaCl"],
      correctAnswer: "H2O"
    },
    {
      question: "What is the smallest unit of matter?",
      answers: ["Atom", "Molecule", "Cell", "Electron"],
      correctAnswer: "Atom"
    },
    {
      question: "Which gas do plants absorb during photosynthesis?",
      answers: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
      correctAnswer: "Carbon Dioxide"
    },
    {
      question: "What is the hardest natural substance on Earth?",
      answers: ["Gold", "Diamond", "Iron", "Quartz"],
      correctAnswer: "Diamond"
    },
    {
      question: "What is the largest organ in the human body?",
      answers: ["Heart", "Liver", "Skin", "Brain"],
      correctAnswer: "Skin"
    },
    {
      question: "Which planet is closest to the Sun?",
      answers: ["Earth", "Venus", "Mercury", "Mars"],
      correctAnswer: "Mercury"
    },
    {
      question: "What is the speed of light?",
      answers: ["300,000 km/s", "150,000 km/s", "450,000 km/s", "600,000 km/s"],
      correctAnswer: "300,000 km/s"
    },
    {
      question: "What is the main gas found in the Earth's atmosphere?",
      answers: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Argon"],
      correctAnswer: "Nitrogen"
    },
    {
      question: "What is the process by which plants make their own food?",
      answers: ["Respiration", "Photosynthesis", "Transpiration", "Digestion"],
      correctAnswer: "Photosynthesis"
    },
    {
      question: "Which element has the atomic number 1?",
      answers: ["Helium", "Hydrogen", "Oxygen", "Carbon"],
      correctAnswer: "Hydrogen"
    },
    {
      question: "What is the unit of electric current?",
      answers: ["Volt", "Ohm", "Ampere", "Watt"],
      correctAnswer: "Ampere"
    },
    {
      question: "What is the chemical formula for table salt?",
      answers: ["NaCl", "H2O", "CO2", "O2"],
      correctAnswer: "NaCl"
    },
    {
      question: "Which gas is most abundant in the Earth's atmosphere?",
      answers: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Argon"],
      correctAnswer: "Nitrogen"
    },
    {
      question: "What is the boiling point of water in Celsius?",
      answers: ["0°C", "50°C", "100°C", "150°C"],
      correctAnswer: "100°C"
    },
    {
      question: "What is the study of living organisms called?",
      answers: ["Physics", "Chemistry", "Biology", "Geology"],
      correctAnswer: "Biology"
    },
    {
      question: "Which planet has the most moons?",
      answers: ["Earth", "Saturn", "Jupiter", "Mars"],
      correctAnswer: "Jupiter"
    },
    {
      question: "What is the chemical symbol for gold?",
      answers: ["Au", "Ag", "Fe", "Cu"],
      correctAnswer: "Au"
    },
    {
      question: "What is the force that pulls objects towards the Earth?",
      answers: ["Magnetism", "Gravity", "Friction", "Inertia"],
      correctAnswer: "Gravity"
    },
    {
      question: "What is the largest planet in the solar system?",
      answers: ["Earth", "Saturn", "Jupiter", "Neptune"],
      correctAnswer: "Jupiter"
    },
    {
      question: "What is the process by which liquid turns into gas?",
      answers: ["Condensation", "Evaporation", "Freezing", "Sublimation"],
      correctAnswer: "Evaporation"
    },
    {
      question: "What is the chemical symbol for oxygen?",
      answers: ["O", "O2", "H2O", "CO2"],
      correctAnswer: "O2"
    },
    {
      question: "What is the study of the Earth's physical structure and substance called?",
      answers: ["Biology", "Chemistry", "Geology", "Astronomy"],
      correctAnswer: "Geology"
    },
    {
      question: "What is the unit of force?",
      answers: ["Joule", "Newton", "Watt", "Pascal"],
      correctAnswer: "Newton"
    },
    {
      question: "What is the chemical symbol for carbon?",
      answers: ["C", "Ca", "Co", "Cu"],
      correctAnswer: "C"
    },
    {
      question: "What is the process by which plants release water vapor?",
      answers: ["Photosynthesis", "Transpiration", "Respiration", "Evaporation"],
      correctAnswer: "Transpiration"
    },
    {
      question: "What is the chemical symbol for sodium?",
      answers: ["So", "Na", "No", "Sa"],
      correctAnswer: "Na"
    },
    {
      question: "What is the study of the universe called?",
      answers: ["Biology", "Geology", "Astronomy", "Chemistry"],
      correctAnswer: "Astronomy"
    },
    {
      question: "What is the chemical symbol for iron?",
      answers: ["Fe", "Ir", "In", "Io"],
      correctAnswer: "Fe"
    },
    {
      question: "What is the process by which an organism develops from a fertilized egg?",
      answers: ["Photosynthesis", "Respiration", "Evolution", "Embryogenesis"],
      correctAnswer: "Embryogenesis"
    },
    {
      question: "What is the chemical symbol for silver?",
      answers: ["Si", "Ag", "Au", "Sr"],
      correctAnswer: "Ag"
    },
    {
      question: "What is the study of fossils called?",
      answers: ["Paleontology", "Geology", "Biology", "Archaeology"],
      correctAnswer: "Paleontology"
    },
    {
      question: "What is the chemical symbol for potassium?",
      answers: ["P", "Po", "K", "Ko"],
      correctAnswer: "K"
    },
    {
      question: "What is the process by which plants convert sunlight into energy?",
      answers: ["Respiration", "Photosynthesis", "Transpiration", "Digestion"],
      correctAnswer: "Photosynthesis"
    },
    {
      question: "What is the chemical symbol for helium?",
      answers: ["He", "H", "Ha", "Ho"],
      correctAnswer: "He"
    },
    {
      question: "What is the study of the behavior and properties of matter called?",
      answers: ["Biology", "Chemistry", "Physics", "Geology"],
      correctAnswer: "Chemistry"
    },
    {
      question: "What is the chemical symbol for nitrogen?",
      answers: ["Ni", "N", "No", "Na"],
      correctAnswer: "N"
    },
    {
      question: "What is the process by which cells divide to form new cells?",
      answers: ["Photosynthesis", "Respiration", "Mitosis", "Transpiration"],
      correctAnswer: "Mitosis"
    },
    {
      question: "What is the chemical symbol for calcium?",
      answers: ["Ca", "Co", "C", "Cu"],
      correctAnswer: "Ca"
    },
    {
      question: "What is the study of the Earth's atmosphere called?",
      answers: ["Meteorology", "Geology", "Astronomy", "Biology"],
      correctAnswer: "Meteorology"
    },
    {
      question: "What is the chemical symbol for chlorine?",
      answers: ["Cl", "Ch", "Co", "Cr"],
      correctAnswer: "Cl"
    },
    {
      question: "What is the process by which plants and animals convert food into energy?",
      answers: ["Photosynthesis", "Respiration", "Transpiration", "Digestion"],
      correctAnswer: "Respiration"
    },
    {
      question: "What is the chemical symbol for sulfur?",
      answers: ["Su", "S", "So", "Sr"],
      correctAnswer: "S"
    },
    {
      question: "What is the study of the Earth's oceans called?",
      answers: ["Oceanography", "Geology", "Meteorology", "Biology"],
      correctAnswer: "Oceanography"
    },
    {
      question: "What is the chemical symbol for magnesium?",
      answers: ["Ma", "Mg", "Mn", "Mo"],
      correctAnswer: "Mg"
    },
    {
      question: "What is the process by which rocks are broken down into smaller pieces?",
      answers: ["Erosion", "Weathering", "Sedimentation", "Crystallization"],
      correctAnswer: "Weathering"
    },
    {
      question: "What is the chemical symbol for phosphorus?",
      answers: ["P", "Ph", "Po", "Ps"],
      correctAnswer: "P"
    },
    {
      question: "What is the study of the Earth's history through rock layers called?",
      answers: ["Paleontology", "Geology", "Archaeology", "Stratigraphy"],
      correctAnswer: "Stratigraphy"
    }
  ],
  general: [
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
  ],
  history: [
    {
      question: "Who wrote 'Romeo and Juliet'?",
      answers: ["Charles Dickens", "William Shakespeare", "Mark Twain", "Jane Austen"],
      correctAnswer: "William Shakespeare"
    },
    {
      question: "Who discovered gravity?",
      answers: ["Albert Einstein", "Isaac Newton", "Galileo Galilei", "Nikola Tesla"],
      correctAnswer: "Isaac Newton"
    },
    {
      question: "Who painted the Mona Lisa?",
      answers: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"],
      correctAnswer: "Leonardo da Vinci"
    }
  ]
};

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 30;
let timer;
let userAnswers = [];
let shuffledQuestions = [];
let selectedCategory = "";

// DOM Elements
const categoryContainer = document.getElementById("category-container");
const quizContainer = document.getElementById("quiz-container");
const resultContainer = document.getElementById("result-container");
const categoriesElement = document.getElementById("categories");
const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const timerElement = document.getElementById("time");
const scoreElement = document.getElementById("current-score");
const nextButton = document.getElementById("next-btn");
const prevButton = document.getElementById("prev-btn");
const questionCountElement = document.getElementById("current-question");
const totalQuestionsElement = document.getElementById("total-questions");
const resultBody = document.getElementById("result-body");
const resultSummary = document.getElementById("result-summary");
const restartButton = document.getElementById("restart-btn");

// Load categories
function loadCategories() {
  for (const category in questionsByCategory) {
    const button = document.createElement("button");
    button.textContent = category.toUpperCase();
    button.classList.add("btn", "btn-outline-primary", "mb-2");
    button.addEventListener("click", () => startQuiz(category));
    categoriesElement.appendChild(button);
  }
}

// Start the quiz
function startQuiz(category) {
  selectedCategory = category;
  shuffledQuestions = [...questionsByCategory[category]]; // Copy questions from the selected category
  shuffleQuestions(); // Shuffle questions
  userAnswers = new Array(shuffledQuestions.length).fill(null); // Reset user answers
  currentQuestionIndex = 0;
  score = 0;
  categoryContainer.style.display = "none";
  quizContainer.style.display = "block";
  loadQuestion();
}

// Shuffle the questions array
function shuffleQuestions() {
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
  resultSummary.innerHTML = `
    <h3 class="mt-4">Result Summary</h3>
    <p>Total Questions: ${shuffledQuestions.length}</p>
    <p class="text-success">Correct Answers: ${correctCount}</p>
    <p class="text-danger">Wrong Answers: ${wrongCount}</p>
    <p class="text-warning">Unanswered Questions: ${unansweredCount}</p>
  `;
}

// Restart the quiz
restartButton.addEventListener("click", () => {
  currentQuestionIndex = 0;
  score = 0;
  userAnswers.fill(null);
  shuffleQuestions(); // Shuffle questions again
  quizContainer.style.display = "none";
  resultContainer.style.display = "none";
  categoryContainer.style.display = "block";
});

// Initialize the quiz
loadCategories();
