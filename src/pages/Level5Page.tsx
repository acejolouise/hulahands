import React from 'react';
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
import './Level5Page.css';

const Level5Page: React.FC = () => {
  // Will be used for navigation in future features
  const history = useHistory();

  return (
    <IonPage>
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
              onClick={() => console.log('Alphabet button clicked')}
            >
              Alphabet
            </button>
            <button 
              className="letter-button"
              onClick={() => console.log('Letter A clicked')}
            >
              A
            </button>
            <button 
              className="letter-button"
              onClick={() => console.log('Letter B clicked')}
            >
              B
            </button>
            <button 
              className="letter-button"
              onClick={() => console.log('Letter C clicked')}
            >
              C
            </button>
            <button 
              className="letter-button"
              onClick={() => console.log('Letter D clicked')}
            >
              D
            </button>
            <button 
              className="letter-button"
              onClick={() => console.log('Letter E clicked')}
            >
              E
            </button>
            <button 
              className="letter-button"
              onClick={() => console.log('Letter F clicked')}
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

export default Level5Page;