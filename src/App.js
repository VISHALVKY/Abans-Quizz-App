import React, { useState, useEffect } from 'react';
import './App.css';

const quizData = [
  {
    question: "What is the capital of France?",
    options: [
      { text: "Paris", image: "https://c8.alamy.com/comp/C57G56/paris-flag-of-france-and-eiffel-tower-glossy-vector-button-C57G56.jpg", name: "Paris" },
      { text: "London", image: "https://png.pngtree.com/png-vector/20220404/ourmid/pngtree-london-flag-entrance-union-culture-vector-png-image_8140296.jpg", name: "London" },
      { text: "Berlin", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCU2IQfGO6vGXB6HwYk_VKCvHEzDJvr1XhrHwlVfCRDA&s", name: "Berlin" },
      { text: "Madrid", image: "https://t3.ftcdn.net/jpg/00/59/11/14/360_F_59111438_ncMcI5wjiqbgJ14aN2YcJU8K8KqVRTr4.jpg", name: "Madrid" }
    ],
    answer: "Paris"
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: [
      { text: "Mars", image: "https://starwalk.space/gallery/images/mars-the-ultimate-guide/1920x1080.jpg", name: "Mars" },
      { text: "Venus", image: "https://cdn.mos.cms.futurecdn.net/RifjtkFLBEFgzkZqWEh69P-1200-80.jpg", name: "Venus" },
      { text: "Jupiter", image: "https://cdn.britannica.com/66/155966-131-17B5B518/Jupiter.jpg", name: "Jupiter" },
      { text: "Saturn", image: "https://t4.ftcdn.net/jpg/03/37/10/25/360_F_337102531_Mdf6uRexAN4MPF2JcQwTAvJeHmaqc5Np.jpg", name: "Saturn" }
    ],
    answer: "Mars"
  },
  {
    question: "What is the largest ocean on Earth?",
    options: [
      { text: "Pacific Ocean", image: "https://media.istockphoto.com/id/1399613416/video/powerful-blue-ocean-wave-breaking-in-open-water.jpg?s=640x640&k=20&c=YjoVkvFQjZzNWu9pYEEKPuZqvNItH7JtHmoCc9BjiTQ=", name: "Pacific Ocean" },
      { text: "Atlantic Ocean", image: "https://www.researchgate.net/profile/Babagana-Abubakar-2/publication/312069832/figure/fig1/AS:447092700258307@1483606614772/Showing-a-map-of-the-Atlantic-Ocean-Fig3-Showing-a-photo-of-where-the-Atlantic-Ocean.png", name: "Atlantic Ocean" },
      { text: "Indian Ocean", image: "https://cdn.downtoearth.org.in/library/large/2019-04-03/0.06812600_1554292419_ocean-3395598_1920.jpg", name: "Indian Ocean" },
      { text: "Arctic Ocean", image: "https://www.pewtrusts.org/-/media/post-launch-images/2019/11/gettyimages690475168-1jpgmaster/16x9_m.jpg", name: "Arctic Ocean" }
    ],
    answer: "Pacific Ocean"
  },
  {
    question: "Who wrote 'To Kill a Mockingbird'?",
    options: [
      { text: "Harper Lee", image: "https://cdn.britannica.com/04/193204-050-4B1C2FE7/Harper-Lee-American.jpg", name: "Harper Lee" },
      { text: "Mark Twain", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR0IpfXdnANrI832OXpNvTQMGkeGSACuqSiOYhYU2WfCg&s", name: "Mark Twain" },
      { text: "Ernest Hemingway", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsUzpiH-lAYGYwPhY8fvC2RzQvMCgo-hgtvdV78UVM-Q&s", name: "Ernest Hemingway" },
      { text: "John Steinbeck", image: "https://hips.hearstapps.com/hmg-prod/images/gettyimages-613513778.jpg", name: "John Steinbeck" }
    ],
    answer: "Harper Lee"
  },
  {
    question: "What is the chemical symbol for gold?",
    options: [
      { text: "Au", image: "https://www.bullionbypost.co.uk/media/uploads/pages/images/2019/06/28/Gold_symbol.jpg", name: "Au" },
      { text: "Ag", image: "https://as2.ftcdn.net/v2/jpg/01/09/40/33/1000_F_109403319_bCFTFCITpm5QLRcKg4mPBtQJOE24hnD9.jpg", name: "Ag" },
      { text: "Fe", image: "https://cdn1.byjus.com/wp-content/uploads/2018/07/Iron-1.jpg", name: "Fe" },
      { text: "Cu", image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQkPMpt1Ok35SPGjIasjxw5Vx6rg9k2pjySio0-6TaCOg&s", name: "Cu" }
    ],
    answer: "Au"
  }
];

function shuffleArray(array) {
  const shuffledArray = [...array];
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }
  return shuffledArray;
}

function App() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [showResult, setShowResult] = useState(false);
  const [shuffledOptions, setShuffledOptions] = useState([]);

  useEffect(() => {
    setShuffledOptions(shuffleArray(quizData[currentQuestion].options));
  }, [currentQuestion]);

  const handleAnswerSubmit = (answer) => {
    setUserAnswers([...userAnswers, answer]);
    if (
      currentQuestion < quizData.length &&
      quizData[currentQuestion] &&
      answer !== quizData[currentQuestion].answer
    ) {
      const optionsContainer = document.querySelector('.options-container');
      optionsContainer.classList.add('shake');

      setTimeout(() => {
        optionsContainer.classList.remove('shake');
      }, 500);

      const currentQuestionData = quizData[currentQuestion];
      if (currentQuestionData) {
        const shuffledCorrectAnswer = shuffleArray(
          currentQuestionData.options.filter(
            (option) => option.text === currentQuestionData.answer
          )
        );
        const shuffledOptions = shuffleArray(
          currentQuestionData.options.filter(
            (option) => option.text !== currentQuestionData.answer
          )
        );
        shuffledOptions.unshift(shuffledCorrectAnswer[0]);
        setShuffledOptions(shuffledOptions);
      }
      return;
    }
    if (currentQuestion + 1 < quizData.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setShowResult(true);
    }
  };

  const restartQuiz = () => {
    setCurrentQuestion(0);
    setUserAnswers([]);
    setShowResult(false);
    setShuffledOptions(shuffleArray(quizData[0].options));
  };

  const handleOptionSelect = (optionText) => {
    document.getElementById(optionText).checked = true;
  };

  const handleSubmit = () => {
    const selectedOption = document.querySelector('input[name="option"]:checked');
    if (selectedOption) {
      handleAnswerSubmit(selectedOption.value);
      selectedOption.checked = false;
      if (currentQuestion + 1 === quizData.length) {
        setShowResult(true);
      }
    }
  };

  return (
    <div className="App">
      {showResult ? (
        <div>
          <h2>Quiz Completed!</h2>
          <button onClick={restartQuiz}>Retake Quiz</button>
        </div>
      ) : (
        <div>
          <div className={`question-container ${showResult ? 'disabled' : ''}`}>
            <h2>{quizData[currentQuestion].question}</h2>
          </div>
          <div className={`options-container ${showResult ? 'disabled' : ''}`}>
            {shuffledOptions.map((option, index) => (
              <div key={index} onClick={() => handleOptionSelect(option.text)}>
                <input type="radio" id={option.text} name="option" value={option.text} />
                <label htmlFor={option.text}>
                  {option.image && <img src={option.image} alt={option.text} />}
                  <p>{option.name}</p>
                </label>
              </div>
            ))}
          </div>
          <button onClick={handleSubmit} disabled={showResult}>
            Submit
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
