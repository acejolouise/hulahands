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
import './Level3Page.css';

const Level3Page: React.FC = () => {

  return (
    <IonPage>
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
              onClick={() => console.log('Alphabet button clicked')}
            >
              Alphabet
            </button>
            <button 
              className="letter-button"
              onClick={() => console.log('Letter R clicked')}
            >
              R
            </button>
            <button 
              className="letter-button"
              onClick={() => console.log('Letter S clicked')}
            >
              S
            </button>
            <button 
              className="letter-button"
              onClick={() => console.log('Letter T clicked')}
            >
              T
            </button>
            <button 
              className="letter-button"
              onClick={() => console.log('Letter U clicked')}
            >
              U
            </button>
            <button 
              className="letter-button"
              onClick={() => console.log('Letter V clicked')}
            >
              V
            </button>
            <button 
              className="letter-button"
              onClick={() => console.log('Letter W clicked')}
            >
              W
            </button>
            <button 
              className="letter-button"
              onClick={() => console.log('Letter X clicked')}
            >
              X
            </button>
            <button 
              className="letter-button"
              onClick={() => console.log('Letter Y clicked')}
            >
              Y
            </button>
            <button 
              className="letter-button"
              onClick={() => console.log('Letter Z clicked')}
            >
              Z
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

export default Level3Page;