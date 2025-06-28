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
import './Level2Page.css';

const Level2Page: React.FC = () => {
  const [showAlphabetViewer, setShowAlphabetViewer] = useState(false);
  const [currentLetter, setCurrentLetter] = useState('J');
  const [showQuiz, setShowQuiz] = useState(false);

  const handleLetterClick = (letter: string) => {
    setCurrentLetter(letter);
    setShowAlphabetViewer(true);
  };

  const handleAlphabetClick = () => {
    setCurrentLetter('J');
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

  const level2Letters = ['J', 'K', 'L', 'M', 'N', 'Ñ', 'NG', 'O', 'P', 'Q'];

  return (
    <IonPage>
      {showAlphabetViewer && (
        <AlphabetViewer
          initialLetter={currentLetter}
          level={2}
          availableLetters={level2Letters}
          onClose={() => setShowAlphabetViewer(false)}
          onTakeQuiz={handleStartQuiz}  
        />
      )}
      {showQuiz && (
        <QuizComponent onClose={handleQuizClose} level={2} />
      )}
      <IonHeader className="ion-no-border">
        <IonToolbar className="transparent-toolbar">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/levels" />
          </IonButtons>
          <IonTitle className="ion-text-center">Level 2</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <div className="level1-container">
          <h2>FSL Alphabets</h2>
            <div className="alphabet-list">
            <button 
              className="letter-button"
              onClick={handleAlphabetClick}
            >
              Alphabet
            </button>
            <button 
              className="letter-button"
              onClick={() => handleLetterClick('J')}
            >
              J
            </button>
            <button 
              className="letter-button"
              onClick={() => handleLetterClick('K')}
            >
              K
            </button>
            <button 
              className="letter-button"
              onClick={() => handleLetterClick('L')}
            >
              L
            </button>
            <button 
              className="letter-button"
              onClick={() => handleLetterClick('M')}
            >
              M
            </button>
            <button 
              className="letter-button"
              onClick={() => handleLetterClick('N')}
            >
              N
            </button>
            <button 
              className="letter-button"
              onClick={() => handleLetterClick('Ñ')}
            >
              Ñ
            </button>
            <button 
              className="letter-button"
              onClick={() => handleLetterClick('NG')}
            >
              NG
            </button>
            <button 
              className="letter-button"
              onClick={() => handleLetterClick('O')}
            >
              O
            </button>
            <button 
              className="letter-button"
              onClick={() => handleLetterClick('P')}
            >
              P
            </button>
            <button 
              className="letter-button"
              onClick={() => handleLetterClick('Q')}
            >
              Q
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

export default Level2Page;