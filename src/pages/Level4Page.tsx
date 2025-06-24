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
import './Level4Page.css';

const Level4Page: React.FC = () => {

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar className="transparent-toolbar">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/levels" />
          </IonButtons>
          <IonTitle className="ion-text-center">Level 4</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <div className="level1-container">
          <h2>FSL Numbers</h2>
          <div className="alphabet-list">
            <button 
              className="letter-button"
              onClick={() => console.log('Numbers button clicked')}
            >
              Numbers
            </button>
            <button 
              className="letter-button"
              onClick={() => console.log('Number 1 clicked')}
            >
              1
            </button>
            <button 
              className="letter-button"
              onClick={() => console.log('Number 2 clicked')}
            >
              2
            </button>
            <button 
              className="letter-button"
              onClick={() => console.log('Number 3 clicked')}
            >
              3
            </button>
            <button 
              className="letter-button"
              onClick={() => console.log('Number 4 clicked')}
            >
              4
            </button>
            <button 
              className="letter-button"
              onClick={() => console.log('Number 5 clicked')}
            >
              5
            </button>
            <button 
              className="letter-button"
              onClick={() => console.log('Number 6 clicked')}
            >
              6
            </button>
            <button 
              className="letter-button"
              onClick={() => console.log('Number 7 clicked')}
            >
              7
            </button>
            <button 
              className="letter-button"
              onClick={() => console.log('Number 8 clicked')}
            >
              8
            </button>
            <button 
              className="letter-button"
              onClick={() => console.log('Number 9 clicked')}
            >
              9
            </button>
            <button 
              className="letter-button"
              onClick={() => console.log('Number 10 clicked')}
            >
              10
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

export default Level4Page;