import React from 'react';
import { IonIcon, IonButton } from '@ionic/react';
import { arrowForward, arrowBack, playCircle } from 'ionicons/icons';
import './AlphabetDetail.css';

interface AlphabetDetailProps {
  letter: string;
  onClose: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
  showNavigation?: boolean;
}

const AlphabetDetail: React.FC<AlphabetDetailProps> = ({ 
  letter, 
  onClose, 
  onNext, 
  onPrevious, 
  showNavigation = true 
}) => {
  const videoSrc = `/assets/level1vids/${letter}.mp4`;
  const imageSrc = `/assets/level1pics/${letter}.png`;

  return (
    <div className="alphabet-detail">
      <div className="video-container">
        <h2>FSL ALPHABET</h2>
        <div className="video-wrapper">
          <video 
            controls 
            className="alphabet-video"
            poster={imageSrc}
          >
            <source src={videoSrc} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="play-button-overlay">
            <IonIcon icon={playCircle} className="play-icon" />
          </div>
        </div>
        <div className="letter-display">
          <span className="letter-icon">{letter}</span>
        </div>

        <div className="navigation-controls">
          {showNavigation && onPrevious && (
            <IonButton 
              fill="clear" 
              className="nav-button prev-button"
              onClick={onPrevious}
            >
              <IonIcon slot="icon-only" icon={arrowBack} />
            </IonButton>
          )}
          
          {showNavigation && onNext && (
            <IonButton 
              fill="clear" 
              className="nav-button next-button"
              onClick={onNext}
            >
              <IonIcon slot="icon-only" icon={arrowForward} />
            </IonButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlphabetDetail;
