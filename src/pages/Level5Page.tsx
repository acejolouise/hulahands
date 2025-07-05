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
import './Level5Page.css';

const Level5Page: React.FC = () => {
  const [showVideoViewer, setShowVideoViewer] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState('11');
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
            <IonTitle className="ion-text-center">Level 5</IonTitle>
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
                onClick={() => handleNumberClick('11')}
              >
                11
              </button>
              <button 
                className="letter-button"
                onClick={() => handleNumberClick('12')}
              >
                12
              </button>
              <button 
                className="letter-button"
                onClick={() => handleNumberClick('13')}
              >
                13
              </button>
              <button 
                className="letter-button"
                onClick={() => handleNumberClick('14')}
              >
                14
              </button>
              <button 
                className="letter-button"
                onClick={() => handleNumberClick('15')}
              >
                15
              </button>
              <button 
                className="letter-button"
                onClick={() => handleNumberClick('16')}
              >
                16
              </button>
              <button 
                className="letter-button"
                onClick={() => handleNumberClick('17')}
              >
                17
              </button>
              <button 
                className="letter-button"
                onClick={() => handleNumberClick('18')}
              >
                18
              </button>
              <button 
                className="letter-button"
                onClick={() => handleNumberClick('19')}
              >
                19
              </button>
              <button 
                className="letter-button"
                onClick={() => handleNumberClick('20')}
              >
                20
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
            level={5}
            onClose={handleCloseViewer}
            onTakeQuiz={handleTakeQuiz}
          />
        )}

        {showQuiz && (
          <QuizComponent
            level={5}
            onClose={handleCloseQuiz}
          />
        )}
      </IonContent>
    </IonPage>
  );
};

export default Level5Page;