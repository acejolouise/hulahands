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
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  
  const videoSrc = `/assets/level1vids/${letter}.mp4`;
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const handlePlayVideo = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.muted = true;
        videoRef.current.play()
          .then(() => {
            videoRef.current!.muted = false;
            setIsPlaying(true);
          })
          .catch(err => {
            console.error('Error playing video:', err);
            if (!videoRef.current!.muted) {
              videoRef.current!.muted = true;
              videoRef.current!.play()
                .then(() => setIsPlaying(true))
                .catch(e => {
                  console.error('Error playing even muted video:', e);
                  setVideoError(true);
                });
            } else {
              setVideoError(true);
            }
          });
      }
    }
  };
  
  useEffect(() => {
    setIsPlaying(false);
    setVideoError(false);
    setVideoLoaded(false);
    
    const videoElement = videoRef.current;
    if (!videoElement) return;
    
    const handleEnded = () => setIsPlaying(false);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleCanPlay = () => setVideoLoaded(true);
    const handleError = () => {
      console.error('Video error event triggered');
      setVideoError(true);
    };
    
    videoElement.addEventListener('ended', handleEnded);
    videoElement.addEventListener('play', handlePlay);
    videoElement.addEventListener('pause', handlePause);
    videoElement.addEventListener('canplay', handleCanPlay);
    videoElement.addEventListener('error', handleError);
    
    videoElement.pause();
    videoElement.currentTime = 0;
    videoElement.preload = 'auto';
    
    return () => {
      videoElement.removeEventListener('ended', handleEnded);
      videoElement.removeEventListener('play', handlePlay);
      videoElement.removeEventListener('pause', handlePause);
      videoElement.removeEventListener('canplay', handleCanPlay);
      videoElement.removeEventListener('error', handleError);
    };
  }, [letter]);

  useEffect(() => {
    if (!videoLoaded || !videoRef.current) return;
    
    const playVideo = () => {
      if (videoRef.current) {
        videoRef.current.muted = true;
        videoRef.current.playbackRate = 1.0;
        videoRef.current.play()
          .then(() => {
            videoRef.current!.muted = false;
            setIsPlaying(true);
          })
          .catch(err => {
            console.error('Error in initial play:', err);
            if (videoRef.current!.muted) {
              videoRef.current!.play()
                .then(() => setIsPlaying(true))
                .catch(e => {
                  console.error('Failed even muted playback:', e);
                  setVideoError(true);
                });
            } else {
              setVideoError(true);
            }
          });
      }
    };
    
    const timer = setTimeout(playVideo, 300);
    
    return () => clearTimeout(timer);
  }, [videoLoaded]);
  
  const renderVideoError = () => {
    if (videoError) {
      return (
        <div className="video-error-message">
          Unable to play video. Please tap to try again.
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
        >
          <video 
            ref={videoRef}
            className="alphabet-video"
            playsInline
            muted
            preload="auto"
            poster={`/assets/level1imgs/${letter}.jpg`}
            key={letter} 
          >            
            <source 
              src={videoSrc} 
              type="video/mp4" 
              key={`source-${letter}`}
            />
            Your browser does not support the video tag.          
          </video>
          {(!isPlaying || videoError) && (
            <div className="play-button-overlay">
              <IonIcon icon={playCircle} className="play-icon" />
            </div>
          )}
        </div>
        {renderVideoError()}
        <div className="letter-display">
          <span className="letter-icon">{letter}</span>
        </div>
        {showNavigation && (
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
