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
import './Level6Page.css';

const Level14Page: React.FC = () => {

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar className="transparent-toolbar">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/levels" />
          </IonButtons>
          <IonTitle className="ion-text-center">Level 5</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">      
        <div className="level1-container">
          <h2>FSL Numbers</h2>
          <div className="alphabet-list">
            <button 
              className="letter-button"
              onClick={() => console.log('Number 11 clicked')}
            >
              11
            </button>
            <button 
              className="letter-button"
              onClick={() => console.log('Number 12 clicked')}
            >
              12
            </button>
            <button 
              className="letter-button"
              onClick={() => console.log('Number 13 clicked')}
            >
              13
            </button>
            <button 
              className="letter-button"
              onClick={() => console.log('Number 14 clicked')}
            >
              14
            </button>
            <button 
              className="letter-button"
              onClick={() => console.log('Number 15 clicked')}
            >
              15
            </button>
            <button 
              className="letter-button"
              onClick={() => console.log('Number 16 clicked')}
            >
              16
            </button>
            <button 
              className="letter-button"
              onClick={() => console.log('Number 17 clicked')}
            >
              17
            </button>
            <button 
              className="letter-button"
              onClick={() => console.log('Number 18 clicked')}
            >
              18
            </button>
            <button 
              className="letter-button"
              onClick={() => console.log('Number 19 clicked')}
            >
              19
            </button>
            <button 
              className="letter-button"
              onClick={() => console.log('Number 20 clicked')}
            >
              20
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

export default Level14Page;