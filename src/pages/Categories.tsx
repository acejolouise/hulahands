import React from 'react';
import { useHistory } from 'react-router-dom';
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
import './Categories.css';

const Categories: React.FC = () => {
  const history = useHistory();

  const categories = [
    { id: 'alphabets', name: 'FSL Alphabets', icon: '/assets/placeholder/placeholder.png' },
    { id: 'numbers', name: 'FSL Numbers', icon: '/assets/placeholder/placeholder.png' },
    { id: 'vocabulary', name: 'FSL basic vocabulary words', icon: '/assets/placeholder/placeholder.png' },
    { id: 'phrases', name: 'FSL common phrases', icon: '/assets/placeholder/placeholder.png' },
    { id: 'sentences', name: 'FSL Sentences', icon: '/assets/placeholder/placeholder.png' },
  ];

  const handleCategoryClick = (categoryId: string) => {
    console.log(`Category ${categoryId} selected`);
    history.push(`/category/${categoryId}`);
  };

  return (
    <IonPage>
      <IonHeader className="ion-no-border">
        <IonToolbar className="transparent-toolbar">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/home" />
          </IonButtons>
          <IonTitle className="ion-text-center">Categories</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="categories-content">
        <IonGrid className="categories-grid">
          <IonRow>
            {categories.map((category, index) => (
              <IonCol 
                size="6" 
                key={category.id}
                className={index === 4 ? 'centered-col' : ''}
              >
                <IonCard 
                  className="category-card" 
                  onClick={() => handleCategoryClick(category.id)}
                  button={true}
                >
                  <IonCardContent className="category-content">
                    <div className="category-image-container">
                      <img src={category.icon} alt={category.name} className="category-icon" />
                    </div>
                    <div className="category-text">{category.name}</div>
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

export default Categories;
