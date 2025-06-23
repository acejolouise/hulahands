import { IonButton, IonContent, IonPage } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import './Home.css';

const Home: React.FC = () => {
  const history = useHistory();
  const goToCategories = () => {
    console.log('Navigating to categories page');
    history.push('/categories');
  };

  return (
    <IonPage className="home-page">
      <IonContent fullscreen>
        <div className="container">
          <h1 className="title">HulaHands</h1>
          
          <div className="logo-container">
            <img src="/assets/placeholder/placeholder.png" alt="HulaHands Logo" className="logo" />
            <div className="play-button">
            </div>
          </div>
            <IonButton 
            expand="block" 
            className="start-button" 
            onClick={goToCategories} 
            routerLink="/categories" 
            routerDirection="forward"
          >
            START
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
