import React, { useState, useEffect, useCallback } from 'react';
import { 
  IonButton, 
  IonCard, 
  IonCardContent, 
  IonCardHeader, 
  IonCardTitle,
  IonItem,
  IonLabel,
  IonProgressBar,
  IonIcon
} from '@ionic/react';
import { checkmarkCircle, closeCircle } from 'ionicons/icons';
import './QuizComponent.css';

interface QuizComponentProps {
  onClose: () => void;
}

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  mediaType: 'video' | 'image' | 'none';
  mediaPath?: string;
  correctAnswer: string;
}
// Define questions outside the component to avoid dependency issues
const quizQuestions: QuizQuestion[] = [  {
    id: 1,
    question: "Which video shows the right sign for letter A?",
    options: [
      "a. Video of B",
      "b. Video of A",
      "c. Video of E",
      "d. Video of C"
    ],
    mediaType: 'video',
    mediaPath: '/assets/level1vids/A.mp4',
    correctAnswer: "b. Video of A"
  },
  {
    id: 2,
    question: "What is the correct letter shown in the picture?",
    options: [
      "a. D",
      "b. I",
      "c. B",
      "d. E"
    ],
    mediaType: 'image',
    mediaPath: '/assets/level1pics/B.png',
    correctAnswer: "c. B"
  },
  {
    id: 3,
    question: "What letter is this?",
    options: [
      "a. C",
      "b. G",
      "c. D",
      "d. B"
    ],
    mediaType: 'video',
    mediaPath: '/assets/level1vids/C.mp4',
    correctAnswer: "a. C"
  },  {
    id: 4,
    question: "Which video shows the correct sign for the letter D?",
    options: [
      "a. Video of I",
      "b. Video of F",
      "c. Video of H",
      "d. Video of D"
    ],
    mediaType: 'video',
    mediaPath: '/assets/level1vids/D.mp4',
    correctAnswer: "d. Video of D"
  },
  {
    id: 5,
    question: "Which picture matches the correct sign for letter E?",
    options: [
      "a. Picture of E",
      "b. Picture of A",
      "c. Picture of J",
      "d. Picture of B"
    ],
    mediaType: 'image',
    mediaPath: '/assets/level1pics/E.png',
    correctAnswer: "a. Picture of E"
  },  {
    id: 6,
    question: "Which video matches the correct sign for the letter F?",
    options: [
      "a. Video of A",
      "b. Video of D",
      "c. Video of G",
      "d. Video of F"
    ],
    mediaType: 'video',
    mediaPath: '/assets/level1vids/F.mp4',
    correctAnswer: "d. Video of F"
  },
  {
    id: 7,
    question: "What letter is this?",
    options: [
      "a. A",
      "b. G",
      "c. H",
      "d. F"
    ],
    mediaType: 'video',
    mediaPath: '/assets/level1vids/G.mp4',
    correctAnswer: "b. G"
  },  {
    id: 8,
    question: "Choose the video that shows the correct sign for the letter H:",
    options: [
      "a. Video of H",
      "b. Video of D",
      "c. Video of A",
      "d. Video of C"
    ],
    mediaType: 'video',
    mediaPath: '/assets/level1vids/H.mp4',
    correctAnswer: "a. Video of H"
  },
  {
    id: 9,
    question: "What is the letter being shown in the picture?",
    options: [
      "a. J",
      "b. D",
      "c. I",
      "d. F"
    ],
    mediaType: 'image',
    mediaPath: '/assets/level1pics/I.png',
    correctAnswer: "c. I"
  },
  {
    id: 10,
    question: "What letter is this? It's familiar, right?",
    options: [
      "a. A",
      "b. C",
      "c. E",
      "d. I"
    ],
    mediaType: 'video',
    mediaPath: '/assets/level1vids/E.mp4',
    correctAnswer: "c. E"
  }
];const QuizComponent: React.FC<QuizComponentProps> = ({ onClose }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [secondsLeft, setSecondsLeft] = useState(10);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  
  const moveToNextQuestion = useCallback(() => {
    setIsAnswered(false);
    setSelectedAnswer(null);
    setSecondsLeft(10);

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizQuestions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  }, [currentQuestion]);

  const handleAnswerClick = (selectedOption: string) => {
    if (isAnswered) return; 

    setIsAnswered(true);
    setSelectedAnswer(selectedOption);

    // Check if answer is correct
    if (selectedOption === quizQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    setTimeout(() => {
      moveToNextQuestion();
    }, 2000);
  };
  
  useEffect(() => {
    if (showScore) return;

    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          
          if (!isAnswered) {
            moveToNextQuestion();
          }
          return 10; 
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentQuestion, isAnswered, showScore, moveToNextQuestion]);

  return (
    <div className="quiz-container">
      {!showScore ? (
        <>          <div className="quiz-header">
            <div className="timer-container">
              <div className="question-number">
                {currentQuestion + 1}
              </div>
            </div>
            <div className="timer">
              <IonProgressBar 
                value={secondsLeft / 10} 
                className={secondsLeft <= 3 ? 'danger' : ''}
              ></IonProgressBar>
              <span>{secondsLeft}s</span>
            </div>
          </div>

          <IonCard className="question-card">
            <IonCardHeader>
              <IonCardTitle>{quizQuestions[currentQuestion].question}</IonCardTitle>
            </IonCardHeader>
            <IonCardContent>              <div className="main-media-container">
                {quizQuestions[currentQuestion].mediaType === 'video' && (
                  <video 
                    src={quizQuestions[currentQuestion].mediaPath}
                    controls
                    autoPlay
                    loop
                    className="quiz-media"
                  ></video>
                )}
                {quizQuestions[currentQuestion].mediaType === 'image' && (
                  <img 
                    src={quizQuestions[currentQuestion].mediaPath}
                    alt="Quiz visual"
                    className="quiz-media"
                  />
                )}
                {/* Add a character icon for visual appeal */}
                <div className="character-icon"></div>
              </div><div className="options-list">
                {quizQuestions[currentQuestion].options.map((option, index) => {
                  // Extract just the letter part for display
                  const optionLetter = option.split('.')[0];
                  return (
                    <IonItem 
                      key={index}
                      lines="none"
                      button
                      color={
                        isAnswered ? 
                          (option === quizQuestions[currentQuestion].correctAnswer ? 'success' : 
                           option === selectedAnswer && option !== quizQuestions[currentQuestion].correctAnswer ? 'danger' : '') 
                        : ''
                      }
                      onClick={() => handleAnswerClick(option)}
                      disabled={isAnswered}
                      className={
                        isAnswered && option === quizQuestions[currentQuestion].correctAnswer ? 'correct-answer' : 
                        isAnswered && option === selectedAnswer ? 'incorrect-answer' : ''
                      }
                    >
                      <IonLabel>                        {/* Show video thumbnails for visual effect */}
                        {quizQuestions[currentQuestion].mediaType === 'video' && (
                          <div className="option-media-container">
                            <video 
                              src={`/assets/level1vids/${optionLetter.trim()}.mp4`}
                              className="option-media"
                              muted
                              playsInline
                              controls={false}
                            ></video>
                          </div>
                        )}
                      </IonLabel>
                      {isAnswered && option === quizQuestions[currentQuestion].correctAnswer && (
                        <IonIcon icon={checkmarkCircle} color="success" slot="end" />
                      )}
                      {isAnswered && option === selectedAnswer && option !== quizQuestions[currentQuestion].correctAnswer && (
                        <IonIcon icon={closeCircle} color="danger" slot="end" />
                      )}
                    </IonItem>
                  );
                })}
              </div>
            </IonCardContent>
          </IonCard>
        </>
      ) : (
        <IonCard className="score-card">
          <IonCardHeader>
            <IonCardTitle>Quiz Completed!</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>
            <h2>Your score: {score} out of {quizQuestions.length}</h2>
            <p>{score >= 7 ? 'Great job!' : 'Keep practicing!'}</p>
            <IonButton expand="block" onClick={onClose}>
              Back to Alphabets
            </IonButton>
          </IonCardContent>
        </IonCard>
      )}
    </div>
  );
};

export default QuizComponent;


