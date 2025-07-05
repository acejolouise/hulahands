import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
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

interface LevelsParams {
  categoryId: string;
}

const Levels: React.FC = () => {
  const history = useHistory();
  const { categoryId } = useParams<LevelsParams>();
    const getCategoryLevels = (categoryId: string) => {
    switch (categoryId) {
      case 'alphabets':
        return { count: 3, startLevel: 1 };
      case 'numbers':
        return { count: 2, startLevel: 4 };
      case 'vocabulary':
        return { count: 11, startLevel: 6 };
      case 'phrases':
        return { count: 2, startLevel: 17 };
      case 'sentences':
        return { count: 2, startLevel: 19 };
      default:
        return { count: 0, startLevel: 1 }; 
    }
  };
  
  const categoryInfo = getCategoryLevels(categoryId);
  const levels = Array.from({ length: categoryInfo.count }, (_, i) => categoryInfo.startLevel + i);
  
  const getCategoryTitle = (categoryId: string) => {
    switch (categoryId) {
      case 'alphabets': return 'FSL Alphabets';
      case 'numbers': return 'FSL Numbers';
      case 'vocabulary': return 'Basic Vocabulary';
      case 'phrases': return 'Common Phrases';
      case 'sentences': return 'Sentences';
      default: return 'Levels';
    }
  };
  
  const handleLevelClick = (levelNumber: number) => {
    console.log(`Level ${levelNumber} for ${categoryId} selected`);
    history.push(`/category/${categoryId}/level/${levelNumber}`);
  };
  return (
    <IonPage>
      <IonHeader className="ion-no-border">        
        <IonToolbar className="transparent-toolbar">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/categories" />
          </IonButtons>
          <IonTitle className="ion-text-center">{getCategoryTitle(categoryId)}</IonTitle>
        </IonToolbar>
      </IonHeader>      
      <IonContent fullscreen className="levels-content">
        <IonGrid className="levels-grid">
          <IonRow className="ion-justify-content-center ion-align-items-center">
            {levels.map((level) => (
              <IonCol size="6" className="level-col" key={level}>                
                <IonCard 
                  className="level-card" 
                  onClick={() => handleLevelClick(level)}
                  button={true}
                >
                  <IonCardContent className="level-content ion-text-center">
                    <div className="level-info">
                      <div className="level-title">Level</div>
                      <div className="level-number">{level}</div>
                    </div>
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
