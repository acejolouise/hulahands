import React, { useState } from 'react';
import AlphabetDetail from './AlphabetDetail';
import './AlphabetViewer.css';

interface AlphabetViewerProps {
  initialLetter?: string;
  onClose: () => void;
  showAllAlphabets?: boolean;
}

const AlphabetViewer: React.FC<AlphabetViewerProps> = ({
  initialLetter = 'A',
  onClose,
  showAllAlphabets = false
}) => {
  const alphabets = ['A', 'B', 'C', 'D', 'E', 'F'];
  const [currentLetter, setCurrentLetter] = useState(initialLetter);
  const currentIndex = alphabets.indexOf(currentLetter);

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % alphabets.length;
    setCurrentLetter(alphabets[nextIndex]);
  };

  const handlePrevious = () => {
    const prevIndex = (currentIndex - 1 + alphabets.length) % alphabets.length;
    setCurrentLetter(alphabets[prevIndex]);
  };

  return (
    <div className="alphabet-viewer">
      <button className="close-button" onClick={onClose}>
        &times;
      </button>
      <AlphabetDetail
        letter={currentLetter}
        onClose={onClose}
        onNext={handleNext}
        onPrevious={handlePrevious}
        showNavigation={true}
      />
    </div>
  );
};

export default AlphabetViewer;
