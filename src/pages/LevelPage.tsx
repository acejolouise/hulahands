import React from 'react';
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import { useParams } from 'react-router-dom';
import './LevelPage.css';

interface LevelPageParams {
  id: string;
}

const LevelPage: React.FC = () => {
  const { id } = useParams<LevelPageParams>();
  const levelNumber = parseInt(id, 10);

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar className="transparent-toolbar">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/levels" />
          </IonButtons>
          <IonTitle>Level {levelNumber}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="level-container">
          <h1>Level {levelNumber}</h1>
          <p>This is the content for level {levelNumber}.</p>
          {/* Level-specific content will go here */}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default LevelPage;
