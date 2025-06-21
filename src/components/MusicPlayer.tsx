import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Music } from 'lucide-react';

interface Song {
  title: string;
  artist: string;
  src: string;
}

const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(0.075);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressRef = useRef<HTMLInputElement | null>(null);
  
  const playlist: Song[] = [
    {
      title: "Lofi Study",
      artist: "ChillBeats",
      src: "https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3"
    },
    {
      title: "Ambient Waves",
      artist: "SoundScape",
      src: "https://cdn.pixabay.com/download/audio/2022/01/18/audio_d0c6ff1eab.mp3?filename=ambient-piano-amp-strings-10711.mp3"
    },
    {
      title: "Chill Vibes",
      artist: "MoodMusic",
      src: "https://cdn.pixabay.com/download/audio/2022/10/25/audio_946bc8faf8.mp3?filename=chill-lofi-song-8444.mp3"
    }
  ];

  const currentSong = playlist[currentSongIndex];

  // Set up audio element when component mounts
  useEffect(() => {
    if (audioRef.current) {
      // Set initial volume
      audioRef.current.volume = volume;
      
      // Add event listeners
      const audio = audioRef.current;
      
      const handleLoadedMetadata = () => {
        setDuration(audio.duration);
      };
      
      const handleTimeUpdate = () => {
        setCurrentTime(audio.currentTime);
        setProgress((audio.currentTime / audio.duration) * 100);
      };
      
      const handleEnded = () => {
        handleNext();
      };
      
      audio.addEventListener('loadedmetadata', handleLoadedMetadata);
      audio.addEventListener('timeupdate', handleTimeUpdate);
      audio.addEventListener('ended', handleEnded);
      
      return () => {
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
        audio.removeEventListener('timeupdate', handleTimeUpdate);
        audio.removeEventListener('ended', handleEnded);
      };
    }
  }, [currentSongIndex]);

  // Handle play/pause
  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(error => {
          console.error("Error playing audio:", error);
          setIsPlaying(false);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentSongIndex]);

  // Handle volume and mute changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
      audioRef.current.volume = volume;
    }
  }, [isMuted, volume]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handlePrevious = () => {
    setCurrentSongIndex(prev => (prev === 0 ? playlist.length - 1 : prev - 1));
    if (isPlaying) {
      setIsPlaying(false);
      setTimeout(() => setIsPlaying(true), 100);
    }
  };

  const handleNext = () => {
    setCurrentSongIndex(prev => (prev === playlist.length - 1 ? 0 : prev + 1));
    if (isPlaying) {
      setIsPlaying(false);
      setTimeout(() => setIsPlaying(true), 100);
    }
  };

  const handleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (newVolume === 0) {
      setIsMuted(true);
    } else if (isMuted) {
      setIsMuted(false);
    }
  };

  // Direct DOM manipulation for progress bar
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !progressRef.current) return;
    
    const rect = progressRef.current.getBoundingClientRect();
    const clickPosition = (e.clientX - rect.left) / rect.width;
    const newTime = clickPosition * audioRef.current.duration;
    
    if (!isNaN(newTime) && isFinite(newTime)) {
      audioRef.current.currentTime = newTime;
      setProgress(clickPosition * 100);
    }
  };

  // Format time as MM:SS
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 bg-opacity-90 dark:bg-opacity-90 p-5 rounded-lg shadow-lg w-80 text-gray-800 dark:text-white">
      <div className="flex flex-col items-center">
        <div className="bg-blue-600 dark:bg-blue-700 p-3 rounded-full mb-3">
          <Music className="w-6 h-6 text-white" />
        </div>
        
        <h3 className="font-medium text-base truncate w-full text-center">{currentSong.title}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">{currentSong.artist}</p>
        
        {/* Time display */}
        <div className="flex justify-between w-full text-xs mb-1">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
        
        {/* Progress bar (clickable div) */}
        <div 
          className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full mb-4 cursor-pointer relative overflow-hidden"
          onClick={handleProgressClick}
          ref={progressRef}
        >
          <div 
            className="absolute top-0 left-0 h-full bg-blue-600 dark:bg-blue-500 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        <div className="flex items-center justify-between w-full mb-4">
          <button 
            onClick={handlePrevious}
            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full"
          >
            <SkipBack className="w-5 h-5" />
          </button>
          
          <button 
            onClick={handlePlayPause}
            className="p-3 bg-blue-600 dark:bg-blue-700 hover:bg-blue-700 dark:hover:bg-blue-600 rounded-full text-white"
          >
            {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
          </button>
          
          <button 
            onClick={handleNext}
            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full"
          >
            <SkipForward className="w-5 h-5" />
          </button>
        </div>
        
        {/* Volume control */}
        <div className="flex items-center w-full space-x-2">
          <button 
            onClick={handleMute}
            className="p-1.5 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full"
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600 dark:[&::-webkit-slider-thumb]:bg-blue-500"
          />
        </div>
      </div>
      
      <audio
        ref={audioRef}
        src={currentSong.src}
        preload="metadata"
      />
      
      <div className="text-center mt-4">
        <span className="text-xs text-gray-500 dark:text-gray-400">Music Player</span>
      </div>
    </div>
  );
};

export default MusicPlayer;



