import React, { useState } from 'react';
import { 
  IonContent, 
  IonHeader, 
  IonPage, 
  IonTitle, 
  IonToolbar,
  IonButtons,
  IonBackButton
} from '@ionic/react';
import AlphabetViewer from '../components/VideoViewer';
import QuizComponent from '../components/QuizComponent';
import './Level3Page.css';

const Level3Page: React.FC = () => {
const [showAlphabetViewer, setShowAlphabetViewer] = useState(false);
  const [currentLetter, setCurrentLetter] = useState('R');
  const [showQuiz, setShowQuiz] = useState(false);

  const handleLetterClick = (letter: string) => {
    setCurrentLetter(letter);
    setShowAlphabetViewer(true);
  };

  
  const handleQuizClick = () => {
    setShowQuiz(true);
  };
  
  const handleQuizClose = () => {
    setShowQuiz(false);
  };

  const handleStartQuiz = () => {
    setShowAlphabetViewer(false);  
    setShowQuiz(true);             
  };

  const level3Letters = ['R', 'S', 'T', 'U', 'V', 'W', 'X','Y','Z'];
  
  return (
    <IonPage>
      {showAlphabetViewer && (
        <AlphabetViewer
          initialLetter={currentLetter}
          level={3}
          availableLetters={level3Letters}
          onClose={() => setShowAlphabetViewer(false)}
          onTakeQuiz={handleStartQuiz}  
        />
      )}
      {showQuiz && (
        <QuizComponent onClose={handleQuizClose} level={3} />
      )}
      <IonHeader className="ion-no-border">
        <IonToolbar className="transparent-toolbar">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/levels" />
          </IonButtons>
          <IonTitle className="ion-text-center">Level 3</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <div className="level1-container">
          <h2>FSL Alphabets</h2>
          <div className="alphabet-list">
            <button 
              className="letter-button"
              onClick={() => handleLetterClick('R')}
            >
              R
            </button>
            <button 
              className="letter-button"
              onClick={() => handleLetterClick('S')}
            >
              S
            </button>
            <button 
              className="letter-button"
              onClick={() => handleLetterClick('T')}
            >
              T
            </button>
            <button 
              className="letter-button"
              onClick={() => handleLetterClick('U')}
            >
              U
            </button>
            <button 
              className="letter-button"
              onClick={() => handleLetterClick('V')}
            >
              V
            </button>
            <button 
              className="letter-button"
              onClick={() => handleLetterClick('W')}
            >
              W
            </button>
            <button 
              className="letter-button"
              onClick={() => handleLetterClick('X')}
            >
              X
            </button>
            <button 
              className="letter-button"
              onClick={() => handleLetterClick('Y')}
            >
              Y
            </button>
            <button 
              className="letter-button"
              onClick={() => handleLetterClick('Z')}
            >
              Z
            </button>
            <button 
              className="letter-button"
              onClick={handleQuizClick}
            >
              Let's see what you remember!
            </button>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Level3Page;