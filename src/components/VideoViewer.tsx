import React, { useState, useEffect } from 'react';
import AlphabetDetail from './VideoDetails';
import './VideoViewer.css';

interface AlphabetViewerProps {
  initialLetter: string;
  level?: number;
  availableLetters?: string[];
  onClose: () => void;
  onTakeQuiz?: () => void;
}

const AlphabetViewer: React.FC<AlphabetViewerProps> = ({ 
  initialLetter, 
  level = 1,
  availableLetters,
  onClose, 
  onTakeQuiz 
}) => {
  const getLevelLetters = (level: number): string[] => {
    switch (level) {
      case 1:
        return ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
      case 2:
        return ['J', 'K', 'L', 'M', 'N', 'Ñ', 'NG', 'O', 'P', 'Q'];
      case 3:
        return ['R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
      case 4:
        return ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];
      case 5:
        return ['11', '12', '13', '14', '15', '16', '17', '18', '19', '20'];
      case 6:
        return ['Red', 'Blue', 'Yellow', 'Orange', 'Pink', 'Violet', 'Brown', 'White', 'Black', 'Green'];
      default:
        return ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
    }
  };
  
  const letters = availableLetters || getLevelLetters(level);
  const [currentLetter, setCurrentLetter] = useState(initialLetter);
  const [showQuizModal, setShowQuizModal] = useState(false);
  
  const currentIndex = letters.indexOf(currentLetter);
  const isLastLetter = currentIndex === letters.length - 1;
  const isFirstLetter = currentIndex === 0;
  
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const minSwipeDistance = 50;
  
  useEffect(() => {
    if (isLastLetter) {
      setTimeout(() => {
        setShowQuizModal(true);
      },10000); 
    } else {
      setShowQuizModal(false);
    }
  }, [currentLetter, isLastLetter]);
    const handleNext = () => {
    if (!isLastLetter) {
      const nextIndex = currentIndex + 1;
      setCurrentLetter(letters[nextIndex]);
    } else if (!showQuizModal) {
      setShowQuizModal(true);
    }
  };

  const handlePrevious = () => {
    if (!isFirstLetter) {
      const prevIndex = currentIndex - 1;
      setCurrentLetter(letters[prevIndex]);
    }
  };
  
  const toggleQuizModal = () => {
    console.log('Toggling quiz modal, current state:', !showQuizModal);
    setShowQuizModal(prev => !prev);
  };
  
  const handleTakeQuiz = () => {
    setShowQuizModal(false);
    if (onTakeQuiz) {
      console.log("Navigating to Quiz component");
      onTakeQuiz();
    } else {
      console.log("No onTakeQuiz handler provided - cannot navigate to quiz");
    }
  };

  const handleQuizButtonClick = () => {
    if (onTakeQuiz) {
      onTakeQuiz();
    } else {
      toggleQuizModal();
    }
  };
  
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      handleNext();
    } else if (isRightSwipe) {
      handlePrevious();
    }
  };
  
  return (
    <div 
      className="alphabet-viewer"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <button 
        className="close-button"
        onClick={onClose}
        aria-label="Close"
      >
        &times;
      </button>      
      <AlphabetDetail
        letter={currentLetter}
        level={level}
        onNext={handleNext}
        onPrevious={handlePrevious}
        showNavigation={true}
      />
      {isLastLetter && !showQuizModal && (
        <div className="quiz-button-container">
          <button 
            className="standard-button quiz-btn"
            onClick={handleQuizButtonClick}
          >
            Take the Quiz
          </button>
        </div>
      )}
      
      {showQuizModal && (
        <div className="custom-modal-overlay" onClick={toggleQuizModal}>
          <div className="custom-modal-content" onClick={e => e.stopPropagation()}>
            <div className="quiz-modal-header">
              <h2>Ready?</h2>
              <button 
                className="modal-close-button" 
                onClick={toggleQuizModal}
                aria-label="Close"
              >
                &times;
              </button>
            </div>
            <div className="quiz-modal-body">
              <p>Let's test what you've learned!</p>
            </div>
            <div className="modal-buttons">
              <button className="standard-button primary-btn" onClick={handleTakeQuiz}>
                Start Quiz
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlphabetViewer;
