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
import './Level4Page.css';

const Level4Page: React.FC = () => {
  const [showVideoViewer, setShowVideoViewer] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState('1');
  const [showQuiz, setShowQuiz] = useState(false);

  const handleNumberClick = (number: string) => {
    setSelectedNumber(number);
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
            <IonTitle className="ion-text-center">Level 4</IonTitle>
          </IonToolbar>
        </IonHeader>
      )}
      <IonContent fullscreen className="ion-padding">
        {!showVideoViewer && !showQuiz && (
          <div className="level1-container">
            <h2>FSL Numbers</h2>
            <div className="alphabet-list">
              <button 
                className="letter-button"
                onClick={() => handleNumberClick('1')}
              >
                1
              </button>
              <button 
                className="letter-button"
                onClick={() => handleNumberClick('2')}
              >
                2
              </button>
              <button 
                className="letter-button"
                onClick={() => handleNumberClick('3')}
              >
                3
              </button>
              <button 
                className="letter-button"
                onClick={() => handleNumberClick('4')}
              >
                4
              </button>
              <button 
                className="letter-button"
                onClick={() => handleNumberClick('5')}
              >
                5
              </button>
              <button 
                className="letter-button"
                onClick={() => handleNumberClick('6')}
              >
                6
              </button>
              <button 
                className="letter-button"
                onClick={() => handleNumberClick('7')}
              >
                7
              </button>
              <button 
                className="letter-button"
                onClick={() => handleNumberClick('8')}
              >
                8
              </button>
              <button 
                className="letter-button"
                onClick={() => handleNumberClick('9')}
              >
                9
              </button>
              <button 
                className="letter-button"
                onClick={() => handleNumberClick('10')}
              >
                10
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
            initialLetter={selectedNumber}
            level={4}
            onClose={handleCloseViewer}
            onTakeQuiz={handleTakeQuiz}
          />
        )}

        {showQuiz && (
          <QuizComponent
            level={4}
            onClose={handleCloseQuiz}
          />
        )}
      </IonContent>
    </IonPage>
  );
};

export default Level4Page;