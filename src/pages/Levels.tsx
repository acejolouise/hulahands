import React from 'react';
import { useHistory } from 'react-router-dom';
import './Levels.css';
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonToolbar,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonTitle
} from '@ionic/react';


const Levels: React.FC = () => {
  const history = useHistory();
  const levels = Array.from({ length: 20 }, (_, i) => i + 1);  const handleLevelClick = (levelNumber: number) => {
    console.log(`Level ${levelNumber} selected`);
    history.push(`/level/${levelNumber}`);
  };

  return (
    <IonPage>        <IonHeader className="ion-no-border">        
            <IonToolbar className="transparent-toolbar">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle className="ion-text-center">Levels</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonGrid className="levels-grid">
          <IonRow className="ion-justify-content-center">
            {levels.map((level) => (
                <IonCol size="6" size-md="6" size-lg="6" key={level}>                
                <IonCard 
                  className="level-card" 
                  onClick={() => handleLevelClick(level)}
                  button={true}
                >
                  <IonCardContent className="level-content">
                    <div className="level-text">Level {level}</div>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default Levels;
