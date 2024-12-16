import React, { useRef, useState, useEffect } from 'react';
import './styles.css';

const PlayerPodcast = ({ tema, data, autor, audio }) => {
  const audioRef = useRef(null); // Referência ao elemento de áudio
  const [isPlaying, setIsPlaying] = useState(false); // Estado para controlar play/pause
  const [progress, setProgress] = useState(0); // Estado para a barra de progresso
  const [currentTime, setCurrentTime] = useState(0); // Estado para o tempo atual
  const [duration, setDuration] = useState(0); // Estado para a duração do áudio

  // Função para alternar play/pause
  const togglePlayPause = () => {
    const audio = audioRef.current;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying); // Atualiza o estado
  };

  // Atualiza a barra de progresso conforme o áudio toca
  const updateProgress = () => {
    const audio = audioRef.current;
    setCurrentTime(audio.currentTime); // Atualiza o tempo decorrido
    const progressPercentage = (audio.currentTime / audio.duration) * 100;
    setProgress(progressPercentage);
  };

  // Muda o tempo do áudio ao clicar na barra de progresso
  const handleProgressBarClick = (e) => {
    const audio = audioRef.current;
    const width = e.target.clientWidth;
    const clickX = e.nativeEvent.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
  };

  // Atualiza a duração total do áudio ao carregar
  const onLoadedMetadata = () => {
    setDuration(audioRef.current.duration);
  };

  // Formatar o tempo em minutos e segundos (MM:SS)
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className='content-card-player-all'>
      <div className='card-player'>
        <div>
          <div className='info-card'>
            <div className='content-info'>
              <p className='title-player'>Episódio{" " + tema}</p>
              <p className='title-player'>Por{" " + autor + " "}</p>
            </div>
          </div>
          <div className="audio-player">
            <button
              className={`play-btn ${isPlaying ? 'paused' : ''}`}
              onClick={togglePlayPause}
            ></button>

            <div className="time">
              <span>{formatTime(currentTime)}</span>
            </div>

            <div className="progress-bar" onClick={handleProgressBarClick}>
              <div className="progress" style={{ width: `${progress}%` }}></div>
            </div>

            <div className="time">
              <span>{formatTime(duration)}</span>
            </div>
            <audio
              ref={audioRef}
              onTimeUpdate={updateProgress}
              onLoadedMetadata={onLoadedMetadata}
              src={audio}
            ></audio>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayerPodcast;
