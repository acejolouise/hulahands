import { IonButton, IonContent, IonHeader, IonPage, } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import './Home.css';

const Home: React.FC = () => {
  const history = useHistory();

  const goToLevels = () => {
    console.log('Navigating to levels page');
    history.push('/levels');
  };

  return (
    <IonPage>
      <IonHeader>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <IonHeader collapse="condense">
          
        </IonHeader>
        
        <div className="container">
          <div className="logo-container">
            <img src="/assets/logo.png" alt="Logo" className="logo" />
          </div>
          <IonButton expand="block" className="start-button" onClick={goToLevels} routerLink="/levels" routerDirection="forward">
            Start
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
