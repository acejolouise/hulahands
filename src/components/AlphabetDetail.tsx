import React, { useRef, useEffect, useState } from 'react';
import { IonIcon, IonButton } from '@ionic/react';
import { arrowForward, arrowBack, playCircle } from 'ionicons/icons';
import './AlphabetDetail.css';

interface AlphabetDetailProps {
  letter: string;
  onNext?: () => void;
  onPrevious?: () => void;
  showNavigation?: boolean;
}

const AlphabetDetail: React.FC<AlphabetDetailProps> = ({ 
  letter, 
  onNext, 
  onPrevious, 
  showNavigation = true 
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [imageError, setImageError] = useState(false);
  const videoSrc = `/src/assets/level1vids/${letter}.mp4`;
  const imageSrc = `/src/assets/level1pics/${letter}.png`;
  
  const handlePlayVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play()
          .catch(err => {
            console.error('Error playing video:', err);
            setVideoError(true);
          });
      }
    }
  };
  
  useEffect(() => {
    setIsPlaying(false);
    setVideoError(false);
    setImageError(false);
    
    const timer = setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play()
          .then(() => {
            setIsPlaying(true);
          })
          .catch(err => {
            console.error('Error auto-playing video:', err);
            setVideoError(true);
          });
      }
    }, 500);
    
    const videoElement = videoRef.current;
    if (videoElement) {
      const handleEnded = () => setIsPlaying(false);
      const handlePlay = () => setIsPlaying(true);
      const handlePause = () => setIsPlaying(false);
      
      videoElement.addEventListener('ended', handleEnded);
      videoElement.addEventListener('play', handlePlay);
      videoElement.addEventListener('pause', handlePause);
      
      return () => {
        clearTimeout(timer);
        if (videoElement) {
          videoElement.removeEventListener('ended', handleEnded);
          videoElement.removeEventListener('play', handlePlay);
          videoElement.removeEventListener('pause', handlePause);
        }
      };
    }
    
    return () => clearTimeout(timer);
  }, [letter]);
  
  useEffect(() => {
    console.log('Video path:', videoSrc);
    console.log('Image path:', imageSrc);
  }, [videoSrc, imageSrc]);

  const renderVideoError = () => {
    if (videoError) {
      return (
        <div className="video-error-message">
          Unable to load video. Please check that the file exists at {videoSrc}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="alphabet-detail">
      <div className="video-container">
        <h2>FSL ALPHABETS</h2>
        <div 
          className={`video-wrapper ${isPlaying ? 'playing' : ''}`} 
          onClick={handlePlayVideo}
        >          <video 
            ref={videoRef}
            className="alphabet-video"
            poster={!imageError ? imageSrc : `/assets/placeholder.png`}
            onError={() => setImageError(true)}
            playsInline
          >
            <source 
              src={videoSrc} 
              type="video/mp4" 
              onError={() => setVideoError(true)}
            />
            Your browser does not support the video tag.          </video>
          {!isPlaying && (
            <div className="play-button-overlay">
              <IonIcon icon={playCircle} className="play-icon" />
            </div>
          )}
        </div>
        {renderVideoError()}
        <div className="letter-display">
          <span className="letter-icon">{letter}</span>
        </div>        {showNavigation && (
          <div className="navigation-controls">
            {onPrevious && (
              <IonButton 
                fill="clear" 
                className="nav-button prev-button"
                onClick={onPrevious}
              >
                <IonIcon slot="icon-only" icon={arrowBack} />
              </IonButton>
            )}
            
            {onNext && (
              <IonButton 
                fill="clear" 
                className="nav-button next-button"
                onClick={onNext}
              >
                <IonIcon slot="icon-only" icon={arrowForward} />
              </IonButton>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AlphabetDetail;
