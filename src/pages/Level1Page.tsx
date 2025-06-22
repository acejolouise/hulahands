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
import AlphabetViewer from '../components/AlphabetViewer';
import QuizComponent from '../components/QuizComponent';
import './Level1Page.css';

const Level1Page: React.FC = () => {
  const [showAlphabetViewer, setShowAlphabetViewer] = useState(false);
  const [currentLetter, setCurrentLetter] = useState('A');
  const [showQuiz, setShowQuiz] = useState(false);

  const handleLetterClick = (letter: string) => {
    setCurrentLetter(letter);
    setShowAlphabetViewer(true);
  };
  const handleAlphabetClick = () => {
    setCurrentLetter('A');
    setShowAlphabetViewer(true);
  };
  
  const handleQuizClick = () => {
    setShowQuiz(true);
  };
  
  const handleQuizClose = () => {
    setShowQuiz(false);
  };

  const handleStartQuiz = () => {
    setShowAlphabetViewer(false);  // Hide the alphabet viewer
    setShowQuiz(true);             // Show the quiz component
  };
  
  return (
    <IonPage>
      {showAlphabetViewer && (
        <AlphabetViewer
          initialLetter={currentLetter}
          onClose={() => setShowAlphabetViewer(false)}
          onTakeQuiz={handleStartQuiz}  // Add this prop to navigate to quiz
        />
      )}
      {showQuiz && (
        <QuizComponent onClose={handleQuizClose} />
      )}
      <IonHeader className="ion-no-border">
        <IonToolbar className="transparent-toolbar">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/levels" />
          </IonButtons>
          <IonTitle className="ion-text-center">Level 1</IonTitle>
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
              onClick={() => handleLetterClick('A')}
            >
              A
            </button>
            <button 
              className="letter-button"
              onClick={() => handleLetterClick('B')}
            >
              B
            </button>
            <button 
              className="letter-button"
              onClick={() => handleLetterClick('C')}
            >
              C
            </button>
            <button 
              className="letter-button"
              onClick={() => handleLetterClick('D')}
            >
              D
            </button>
            <button 
              className="letter-button"
              onClick={() => handleLetterClick('E')}
            >
              E
            </button>            <button 
              className="letter-button"
              onClick={() => handleLetterClick('F')}
            >
              F
            </button>
            <button 
              className="letter-button"
              onClick={() => handleLetterClick('G')}
            >
              G
            </button>
            <button 
              className="letter-button"
              onClick={() => handleLetterClick('H')}
            >
              H
            </button>
            <button 
              className="letter-button"
              onClick={() => handleLetterClick('I')}
            >
              I
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

export default Level1Page;