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
import VideoViewer from '../components/VideoViewer';
import QuizComponent from '../components/QuizComponent';
import './Level6Page.css';

const Level6Page: React.FC = () => {
  const [showVideoViewer, setShowVideoViewer] = useState(false);
  const [selectedColor, setSelectedColor] = useState('Red');
  const [showQuiz, setShowQuiz] = useState(false);

  const handleColorClick = (color: string) => {
    setSelectedColor(color);
    setShowVideoViewer(true);
  };

  const handleCloseViewer = () => {
    setShowVideoViewer(false);
  };

  const handleTakeQuiz = () => {
    setShowVideoViewer(false);
    setShowQuiz(true);
  };

  const handleCloseQuiz = () => {
    setShowQuiz(false);
  };

  const handleQuizButtonClick = () => {
    setShowQuiz(true);
  };

  return (
    <IonPage>
      {!showVideoViewer && !showQuiz && (
        <IonHeader className="ion-no-border">
          <IonToolbar className="transparent-toolbar">
            <IonButtons slot="start">
              <IonBackButton defaultHref="/levels" />
            </IonButtons>
            <IonTitle className="ion-text-center">Level 6</IonTitle>
          </IonToolbar>
        </IonHeader>
      )}
      <IonContent fullscreen className="ion-padding">
        {!showVideoViewer && !showQuiz && (
          <div className="level1-container">
            <h2>FSL Colors</h2>
            <div className="alphabet-list">
              <button 
                className="letter-button"
                onClick={() => handleColorClick('Red')}
              >
                Red
              </button>
              <button 
                className="letter-button"
                onClick={() => handleColorClick('Blue')}
              >
                Blue
              </button>
              <button 
                className="letter-button"
                onClick={() => handleColorClick('Yellow')}
              >
                Yellow
              </button>
              <button 
                className="letter-button"
                onClick={() => handleColorClick('Orange')}
              >
                Orange
              </button>
              <button 
                className="letter-button"
                onClick={() => handleColorClick('Pink')}
              >
                Pink
              </button>
              <button 
                className="letter-button"
                onClick={() => handleColorClick('Violet')}
              >
                Violet
              </button>
              <button 
                className="letter-button"
                onClick={() => handleColorClick('Brown')}
              >
                Brown
              </button>
              <button 
                className="letter-button"
                onClick={() => handleColorClick('White')}
              >
                White
              </button>
              <button 
                className="letter-button"
                onClick={() => handleColorClick('Black')}
              >
                Black
              </button>
              <button 
                className="letter-button"
                onClick={() => handleColorClick('Green')}
              >
                Green
              </button>
              <button 
                className="letter-button"
                onClick={handleQuizButtonClick}
              >
                Let's see what you remember!
              </button>
            </div>
          </div>
        )}

        {showVideoViewer && (
          <VideoViewer
            initialLetter={selectedColor}
            level={6}
            onClose={handleCloseViewer}
            onTakeQuiz={handleTakeQuiz}
          />
        )}

        {showQuiz && (
          <QuizComponent
            level={6}
            onClose={handleCloseQuiz}
          />
        )}
      </IonContent>
    </IonPage>
  );
};

export default Level6Page;