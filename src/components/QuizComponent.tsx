import React, { useState, useEffect, useCallback } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { 
  IonButton, 
  IonCard, 
  IonCardContent, 
  IonCardHeader, 
  IonCardTitle,
  IonItem
} from '@ionic/react';
import './QuizComponent.css';

interface QuizComponentProps {
  onClose: () => void;
  level?: number;
}

interface QuizQuestion {
  id: number;
  level: string; 
  question: string;
  options: string[];
  mediaType: 'video' | 'image' | 'none';
  mediaPath?: string;
  correctAnswer: string;
  optionsAreMedia?: boolean;
  showQuestionMedia?: boolean;
  optionMediaType?: 'video' | 'image' | 'mixed';
  optionMediaPaths?: { [key: string]: { type: 'video' | 'image', path: string } };
}

const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    level: 'level1',
    question: "Which video shows the right sign for letter A?",
    options: [
      "a. B",
      "b. A",
      "c. E",
      "d. C"
    ],
    mediaType: 'none',
    mediaPath: '',
    correctAnswer: "b. A",
    optionsAreMedia: true,
    showQuestionMedia: false,
    optionMediaType: 'video',
    optionMediaPaths: {
      'B': { type: 'video', path: '/assets/level1vids/B.mp4' },
      'A': { type: 'video', path: '/assets/level1vids/A.mp4' },
      'E': { type: 'video', path: '/assets/level1vids/E.mp4' },
      'C': { type: 'video', path: '/assets/level1vids/C.mp4' }
    }
  },
  {
    id: 2,
    level: 'level1',
    question: "What is the correct letter shown in the picture?",
    options: [
      "a. D",
      "b. I",
      "c. B",
      "d. E"
    ],
    mediaType: 'image',
    mediaPath: '/assets/level1pics/B.png',
    correctAnswer: "c. B",
    optionsAreMedia: false
  },
  {
    id: 3,
    level: 'level1',
    question: "What letter is this?",
    options: [
      "a. C",
      "b. G",
      "c. D",
      "d. B"
    ],
    mediaType: 'video',
    mediaPath: '/assets/level1vids/C.mp4',
    correctAnswer: "a. C",
    optionsAreMedia: false
  },
  {
    id: 4,
    level: 'level1',
    question: "Which video shows the correct sign for the letter D?",
    options: [
      "a. I",
      "b. F",
      "c. H",
      "d. D"
    ],
    mediaType: 'none',
    mediaPath: '',
    correctAnswer: "d. D",
    optionsAreMedia: true,
    optionMediaType: 'video',
    optionMediaPaths: {
      'I': { type: 'video', path: '/assets/level1vids/I.mp4' },
      'F': { type: 'video', path: '/assets/level1vids/F.mp4' },
      'H': { type: 'video', path: '/assets/level1vids/H.mp4' },
      'D': { type: 'video', path: '/assets/level1vids/D.mp4' }
    }
  },
  {
    id: 5,
    level: 'level1',
    question: "Which picture matches the correct sign for letter E?",
    options: [
      "a. E",
      "b. A",
      "c. J",
      "d. B"
    ],
    mediaType: 'none',
    mediaPath: '',
    correctAnswer: "a. E",
    optionsAreMedia: true,
    optionMediaType: 'image',
    optionMediaPaths: {
      'E': { type: 'image', path: '/assets/level1pics/E.png' },
      'A': { type: 'image', path: '/assets/level1pics/A.png' },
      'J': { type: 'image', path: '/assets/level1pics/J.png' },
      'B': { type: 'image', path: '/assets/level1pics/B.png' }
    }
  },
  {
    id: 6,
    level: 'level1',
    question: "Which video matches the correct sign for the letter F?",
    options: [
      "a. A",
      "b. D",
      "c. G",
      "d. F"
    ],
    mediaType: 'none',
    mediaPath: '',
    correctAnswer: "d. F",
    optionsAreMedia: true,
    optionMediaType: 'video',
    optionMediaPaths: {
      'A': { type: 'video', path: '/assets/level1vids/A.mp4' },
      'D': { type: 'video', path: '/assets/level1vids/D.mp4' },
      'G': { type: 'video', path: '/assets/level1vids/G.mp4' },
      'F': { type: 'video', path: '/assets/level1vids/F.mp4' }
    }
  },
  {
    id: 7,
    level: 'level1',
    question: "What letter is this?",
    options: [
      "a. A",
      "b. G",
      "c. H",
      "d. F"
    ],
    mediaType: 'video',
    mediaPath: '/assets/level1vids/G.mp4',
    correctAnswer: "b. G",
    optionsAreMedia: false
  },
  {
    id: 8,
    level: 'level1',
    question: "Choose the video that shows the correct sign for the letter H:",
    options: [
      "a. H",
      "b. D",
      "c. A",
      "d. C"
    ],
    mediaType: 'none',
    mediaPath: '',
    correctAnswer: "a. H",
    optionsAreMedia: true,
    optionMediaType: 'video',
    optionMediaPaths: {
      'H': { type: 'video', path: '/assets/level1vids/H.mp4' },
      'D': { type: 'video', path: '/assets/level1vids/D.mp4' },
      'A': { type: 'video', path: '/assets/level1vids/A.mp4' },
      'C': { type: 'video', path: '/assets/level1vids/C.mp4' }
    }
  },
  {
    id: 9,
    level: 'level1',
    question: "What is the letter being shown in the picture?",
    options: [
      "a. J",
      "b. D",
      "c. I",
      "d. F"
    ],
    mediaType: 'image',
    mediaPath: '/assets/level1pics/I.png',
    correctAnswer: "c. I",
    optionsAreMedia: false
  },
  {
    id: 10,
    level: 'level1',
    question: "What letter is this? It's familiar, right?",
    options: [
      "a. A",
      "b. C",
      "c. E",
      "d. I"
    ],
    mediaType: 'video',
    mediaPath: '/assets/level1vids/E.mp4',
    correctAnswer: "c. E",
    optionsAreMedia: false
  },
  // Level 2 Questions
  {
    id: 11,
    level: 'level2',
    question: "What sign is being shown in the picture?",
    options: [
      "a. N",
      "b. M",
      "c. A",
      "d. O"
    ],
    mediaType: 'image',
    mediaPath: '/assets/level2pics/M.jpg',
    correctAnswer: "b. M",
    optionsAreMedia: false
  },
  {
    id: 12,
    level: 'level2',
    question: "Which picture shows the right sign for letter L?",
    options: [
      "a. M",
      "b. K",
      "c. L",
      "d. O"
    ],
    mediaType: 'none',
    mediaPath: '',
    correctAnswer: "c. L",
    optionsAreMedia: true,
    optionMediaType: 'image',
    optionMediaPaths: {
      'M': { type: 'image', path: '/assets/level2pics/M.jpg' },
      'K': { type: 'image', path: '/assets/level2pics/K.jpg' },
      'L': { type: 'image', path: '/assets/level2pics/L.jpg' },
      'O': { type: 'image', path: '/assets/level2pics/O.jpg' }
    }
  },
  {
    id: 13,
    level: 'level2',
    question: "Which hand shape matches the sign Ñ?",
    options: [
      "a. B",
      "b. F",
      "c. Ñ",
      "d. Q"
    ],
    mediaType: 'none',
    mediaPath: '',
    correctAnswer: "c. Ñ",
    optionsAreMedia: true,
    optionMediaType: 'video',
    optionMediaPaths: {
      'B': { type: 'video', path: '/assets/level1vids/B.mp4' },
      'F': { type: 'video', path: '/assets/level1vids/F.mp4' },
      'Ñ': { type: 'video', path: '/assets/level2vids/Ñ.mp4' },
      'Q': { type: 'video', path: '/assets/level2vids/Q.mp4' }
    }
  },
  {
    id: 14,
    level: 'level2',
    question: "If you see the sign of the letter \"J\" Which picture matches?",
    options: [
      "a. J",
      "b. H",
      "c. K",
      "d. L"
    ],
    mediaType: 'none',
    mediaPath: '',
    correctAnswer: "a. J",
    optionsAreMedia: true,
    optionMediaType: 'image',
    optionMediaPaths: {
      'J': { type: 'image', path: '/assets/level2pics/J.jpg' },
      'H': { type: 'image', path: '/assets/level1pics/H.png' },
      'K': { type: 'image', path: '/assets/level2pics/K.jpg' },
      'L': { type: 'image', path: '/assets/level2pics/L.jpg' }
    }
  },
  {
    id: 15,
    level: 'level2',
    question: "What sign is being shown in the picture?",
    options: [
      "a. K",
      "b. Q",
      "c. L",
      "d. D"
    ],
    mediaType: 'image',
    mediaPath: '/assets/level2pics/Q.jpg',
    correctAnswer: "b. Q",
    optionsAreMedia: false
  },
  {
    id: 16,
    level: 'level2',
    question: "What letter is this?",
    options: [
      "a. O",
      "b. Q",
      "c. P",
      "d. M"
    ],
    mediaType: 'image',
    mediaPath: '/assets/level2pics/P.jpg',
    correctAnswer: "c. P",
    optionsAreMedia: false
  },
  {
    id: 17,
    level: 'level2',
    question: "Which of these pictures shows the right sign for letter K?",
    options: [
      "a. O",
      "b. J",
      "c. G",
      "d. K"
    ],
    mediaType: 'none',
    mediaPath: '',
    correctAnswer: "d. K",
    optionsAreMedia: true,
    optionMediaType: 'image',
    optionMediaPaths: {
      'O': { type: 'image', path: '/assets/level2pics/O.jpg' },
      'J': { type: 'image', path: '/assets/level2pics/J.jpg' },
      'G': { type: 'image', path: '/assets/level1pics/G.png' },
      'K': { type: 'image', path: '/assets/level2pics/K.jpg' }
    }
  },
  {
    id: 18,
    level: 'level2',
    question: "What letter is being shown in the picture?",
    options: [
      "a. K",
      "b. O",
      "c. M",
      "d. A"
    ],
    mediaType: 'image',
    mediaPath: '/assets/level2pics/O.jpg',
    correctAnswer: "b. O",
    optionsAreMedia: false
  },
  {
    id: 19,
    level: 'level2',
    question: "Which video shows the correct sign of NG?",
    options: [
      "a. O",
      "b. D",
      "c. L",
      "d. NG"
    ],
    mediaType: 'none',
    mediaPath: '',
    correctAnswer: "d. NG",
    optionsAreMedia: true,
    optionMediaType: 'video',
    optionMediaPaths: {
      'O': { type: 'video', path: '/assets/level2vids/O.mp4' },
      'D': { type: 'video', path: '/assets/level1vids/D.mp4' },
      'L': { type: 'video', path: '/assets/level2vids/L.mp4' },
      'NG': { type: 'video', path: '/assets/level2vids/NG.mp4' }
    }
  },
  {
    id: 20,
    level: 'level2',
    question: "Observe the sign of \"N.\" Which picture matches?",
    options: [
      "a. B",
      "b. O",
      "c. N",
      "d. M"
    ],
    mediaType: 'none',
    mediaPath: '',
    correctAnswer: "c. N",
    optionsAreMedia: true,
    optionMediaType: 'image',
    optionMediaPaths: {
      'B': { type: 'image', path: '/assets/level1pics/B.png' },
      'O': { type: 'image', path: '/assets/level2pics/O.jpg' },
      'N': { type: 'image', path: '/assets/level2pics/N.jpg' },
      'M': { type: 'image', path: '/assets/level2pics/M.jpg' }
    }
  }
];

const QuizComponent: React.FC<QuizComponentProps> = ({ onClose, level = 1 }) => {
  const history = useHistory();
  const params = useParams<{ categoryId?: string }>();
  const levelQuestions = quizQuestions.filter(q => q.level === `level${level}`);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10); 
  const videoRefs = React.useRef<{[key: string]: HTMLVideoElement | null}>({});

  const moveToNextQuestion = useCallback(() => {
    setIsAnswered(false);
    setSelectedAnswer(null);
    setTimeLeft(10); 

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < levelQuestions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  }, [currentQuestion, levelQuestions.length]);

  const handleAnswerClick = useCallback((selectedOption: string) => {
    if (isAnswered) return; 

    setIsAnswered(true);
    setSelectedAnswer(selectedOption);

    if (selectedOption === levelQuestions[currentQuestion].correctAnswer) {
      setScore(prevScore => prevScore + 1);
    }

    const optionText = selectedOption.split('.')[1]?.trim() || '';
    if (videoRefs.current[optionText]) {
      const video = videoRefs.current[optionText];
      video.muted = false;
      video.load();
      setTimeout(() => {
        video.play().catch(err => console.error("Error playing video after answer:", err));
      }, 100);
    }
  }, [isAnswered, currentQuestion, levelQuestions]);

  useEffect(() => {
    if (showScore || isAnswered) return;
    
    const timer = setInterval(() => {
      setTimeLeft(prevTime => {
        if (prevTime <= 1) {
          clearInterval(timer);
          setIsAnswered(true);
          setSelectedAnswer("TIME_EXPIRED");
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [currentQuestion, isAnswered, showScore]);

  const setVideoRef = useCallback((element: HTMLVideoElement | null, optionText: string) => {
    if (element) {
      videoRefs.current[optionText] = element;
    }
  }, []);

  useEffect(() => {
    const playAllVideos = () => {
      const questionData = levelQuestions[currentQuestion];
      if (questionData?.optionsAreMedia && questionData.optionMediaType === 'video') {
        const videoElements = document.querySelectorAll('video.option-media');
        
        videoElements.forEach(video => {
          if (video instanceof HTMLVideoElement) {            video.muted = true;
            video.setAttribute('playsinline', '');
            video.setAttribute('webkit-playsinline', '');
            video.removeAttribute('controls');
            video.controls = false;
            video.style.width = '100%';
            video.style.height = '100%';
            video.style.objectFit = 'contain';
            video.loop = true;
            
            const attemptPlay = () => {
              const playPromise = video.play();
              if (playPromise !== undefined) {
                playPromise.catch(() => {
                  setTimeout(() => {
                    video.muted = true;
                    video.play().catch(() => {});
                  }, 100);
                });
              }
            };
            attemptPlay();
          }
        });
      }
    };
    
    Object.values(videoRefs.current).forEach(video => {
      if (video) {
        video.pause();
        video.currentTime = 0;
        video.muted = true;
        video.loop = true;
      }
    });
    
    setTimeout(playAllVideos, 100);
    setTimeout(playAllVideos, 500);
    setTimeout(playAllVideos, 1000);
    
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        playAllVideos();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', playAllVideos);
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', playAllVideos);
    };
  }, [currentQuestion, levelQuestions]);

return (
   <div className="quiz-container">
      {!showScore ? (
        <>          
          <div className="quiz-header">
            <div className="timer-container">
              <div className="question-indicator">
                <div className="question-number">
                  {currentQuestion + 1}
                </div>
              </div>
              <div className="countdown-timer">
                <div className={`timer-box ${timeLeft <= 3 ? 'critical' : timeLeft <= 5 ? 'warning' : ''}`}>
                  <span>{timeLeft}</span>
                </div>
              </div>
              <div className="right-spacer"></div>
            </div>
          </div>
 <IonCard className="question-card">
     <IonCardHeader>
      <IonCardTitle>{levelQuestions[currentQuestion]?.question}</IonCardTitle>
         </IonCardHeader>
            <IonCardContent>
              {levelQuestions[currentQuestion]?.showQuestionMedia !== false && levelQuestions[currentQuestion]?.mediaType !== 'none' && (
                <div className="main-media-container">
                  {levelQuestions[currentQuestion].mediaType === 'video' && 
                   levelQuestions[currentQuestion].mediaPath && (
                     <video 
                      src={levelQuestions[currentQuestion].mediaPath}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="quiz-media"
                      onError={(e) => console.error("Video error:", e)}
                    ></video>
                  )}
                  {levelQuestions[currentQuestion].mediaType === 'image' && 
                   levelQuestions[currentQuestion].mediaPath && (
                    <img 
                      src={levelQuestions[currentQuestion].mediaPath}
                      alt="Quiz visual"
                      className="quiz-media"
                      onError={(e) => console.error("Image error:", e)}
                    />
                  )}
                </div>
              )}
              <div className="options-list">
                {levelQuestions[currentQuestion]?.options.map((option, index) => {
                  const questionData = levelQuestions[currentQuestion];
                  const optionLetter = option.split('.')[0].trim();
                  const optionText = option.split('.')[1]?.trim() || '';
                  const optionMediaInfo = questionData.optionMediaPaths?.[optionText];
                  const levelFolder = questionData.level;
                  
                  return (
                    <IonItem 
                      key={index}
                      lines="none"
                      button
                      detail={false}
                      onClick={() => handleAnswerClick(option)}
                      disabled={isAnswered}
                      className="option-item"
                    >
                      <div className="option-content">
                        <span className="option-label">{optionLetter}</span>
                        {questionData.optionsAreMedia ? (
                          <div className="option-media-container">
                            {optionMediaInfo ? (
                              optionMediaInfo.type === 'video' ? (
                                <video 
                                  ref={(el) => setVideoRef(el, optionText)}
                                  src={optionMediaInfo.path}
                                  className="option-media" 
                                  loop
                                  muted={true}
                                  playsInline
                                  webkit-playsinline="true"
                                  preload="auto"
                                  autoPlay={true}
                                  controls={false}
                                  onLoadedData={(e) => {
                                    const video = e.target as HTMLVideoElement;
                                    video.muted = true;
                                    video.controls = false;
                                    video.play().catch(() => {});
                                  }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    if (!isAnswered) {
                                      handleAnswerClick(option);
                                    }
                                  }}
                                ></video>
                              ) : (
                                <img 
                                  src={optionMediaInfo.path}
                                  alt={`Option ${optionLetter}`}
                                  className="option-media"
                                  onError={(e) => console.error("Option image error:", e)}
                                />
                              )
                            ) : (
                              questionData.optionMediaType === 'video' || 
                              (questionData.optionMediaType !== 'image' && questionData.mediaType === 'video') ? (
                                <video 
                                  ref={(el) => setVideoRef(el, optionText)}
                                  src={`/assets/${levelFolder}vids/${optionText}.mp4`}
                                  className="option-media"
                                  loop
                                  muted={true}
                                  playsInline
                                  webkit-playsinline="true"
                                  preload="auto"
                                  autoPlay={true}
                                  controls={false}
                                  onLoadedData={(e) => {
                                    const video = e.target as HTMLVideoElement;
                                    video.muted = true;
                                    video.controls = false;
                                    video.play().catch(() => {});
                                  }}
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    if (!isAnswered) {
                                      handleAnswerClick(option);
                                    }
                                  }}
                                ></video>
                              ) : (
                                <img 
                                  src={`/assets/${levelFolder}pics/${optionText}.jpg`}
                                  alt={`Option ${optionLetter}`}
                                  className="option-media"
                                  onError={(e) => console.error("Option image error:", e)}
                                />
                              )
                            )}
                          </div>
                        ) : (
                          <span className="option-text">{optionText}</span>
                        )}
                      </div>
                    </IonItem>
                  );
                })}
        </div>
              
          {isAnswered && ( 
                <>
                  {selectedAnswer === "TIME_EXPIRED" && (
                    <div className="time-expired-message">
                      Time expired! Please proceed to the next question.
                    </div>
                  )}
                  <div className="next-question-container">
                    <IonButton expand="block" onClick={moveToNextQuestion} className="next-question-button">
                      Next Question
                    </IonButton>
                  </div>
                </>
              )}
            </IonCardContent>
          </IonCard>
        </>
      ) : (
        <IonCard className="score-card">
          <IonCardHeader>
            <IonCardTitle>Quiz Completed!</IonCardTitle>
          </IonCardHeader>
          <IonCardContent>            <div className="score-content">
              <h2>Your score: {score} out of {levelQuestions.length}</h2>
              <p>{score >= 7 ? 'Great job!' : 'Keep practicing!'}</p>
              <div className="back-button-container">
                <IonButton 
                  expand="block" 
                  onClick={() => {
                    onClose();
                    const categoryId = params.categoryId || 'alphabet';
                    const nextLevel = level + 1;
                    
                    if (nextLevel <= 5) {
                      history.push(`/category/${categoryId}/level/${nextLevel}`);
                    } else {
                      history.push(`/category/${categoryId}`);
                    }
                  }}
                  className="back-button"
                  size="large"
                >
                  {level < 5 ? 'Continue Next Level' : 'Back to Levels'}
                </IonButton>
              </div>
            </div>
          </IonCardContent>
        </IonCard>
      )}
    </div>
  );
};

export default QuizComponent;


