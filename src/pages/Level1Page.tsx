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
import { useHistory } from 'react-router-dom';
import AlphabetViewer from '../components/AlphabetViewer';
import './Level1Page.css';

const Level1Page: React.FC = () => {
  const history = useHistory();
  const [showAlphabetViewer, setShowAlphabetViewer] = useState(false);
  const [currentLetter, setCurrentLetter] = useState('A');

  const handleLetterClick = (letter: string) => {
    setCurrentLetter(letter);
    setShowAlphabetViewer(true);
  };

  const handleAlphabetClick = () => {
    setCurrentLetter('A');
    setShowAlphabetViewer(true);
  };

  return (
    <IonPage>
      {showAlphabetViewer && (
        <AlphabetViewer
          initialLetter={currentLetter}
          onClose={() => setShowAlphabetViewer(false)}
          showAllAlphabets={currentLetter === 'A'}
        />
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
            </button>
            <button 
              className="letter-button"
              onClick={() => handleLetterClick('F')}
            >
              F
            </button>
            <button 
              className="letter-button"
              onClick={() => console.log('Quiz button clicked')}
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