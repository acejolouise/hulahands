import React, { useState, useEffect } from 'react';
import AlphabetDetail from './AlphabetDetail';
import './AlphabetViewer.css';

interface AlphabetViewerProps {
  initialLetter?: string;
  onClose: () => void;
  onTakeQuiz?: () => void;
}

const AlphabetViewer: React.FC<AlphabetViewerProps> = ({
  initialLetter = 'A',
  onClose,
  onTakeQuiz
}) => {
  const alphabets = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
  const [currentLetter, setCurrentLetter] = useState(initialLetter);
  const [showQuizModal, setShowQuizModal] = useState(false);
  
  const currentIndex = alphabets.indexOf(currentLetter);
  const isLastLetter = currentIndex === alphabets.length - 1;
  const isFirstLetter = currentIndex === 0;
  
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const minSwipeDistance = 50;
  
  useEffect(() => {
    if (isLastLetter) {
      setTimeout(() => {
        setShowQuizModal(true);
      }, 1500); 
    } else {
      setShowQuizModal(false);
    }
  }, [currentLetter, isLastLetter]);
    const handleNext = () => {
    if (!isLastLetter) {
      const nextIndex = currentIndex + 1;
      setCurrentLetter(alphabets[nextIndex]);
    } else if (!showQuizModal) {
      setShowQuizModal(true);
    }
  };

  const handlePrevious = () => {
    if (!isFirstLetter) {
      const prevIndex = currentIndex - 1;
      setCurrentLetter(alphabets[prevIndex]);
    }
  };
  
  const toggleQuizModal = () => {
    console.log('Toggling quiz modal, current state:', !showQuizModal);
    setShowQuizModal(prev => !prev);
  };
  
  const handleTakeQuiz = () => {
    setShowQuizModal(false);
    if (onTakeQuiz) {
      // Ensure we're navigating to the Quiz component
      console.log("Navigating to Quiz component");
      onTakeQuiz();
    } else {
      console.log("No onTakeQuiz handler provided - cannot navigate to quiz");
      // Don't call onClose() which might be returning to Level 1
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
        onNext={handleNext}
        onPrevious={!isFirstLetter ? handlePrevious : undefined}
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
