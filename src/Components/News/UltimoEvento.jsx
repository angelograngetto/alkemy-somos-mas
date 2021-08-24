import React, { useState, useRef } from 'react';
import ReactPlayer from 'react-player';
import { Container, IconButton } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { FaPlay } from 'react-icons/fa';
import PlayerControls from './PlayerControls';

const PlayerWrapper = styled.div`
  width: 100%;
  height: 500px;
  position: relative;
`;

const format = (seconds) => {
  if (isNaN(seconds)) {
    return '00:00';
  }
  const date = new Date(seconds * 1000);
  const hh = date.getUTCHours();
  const mm = date.getUTCMinutes();
  const ss = date.getUTCSeconds().toString().padStart(2, '0');
  if (hh) {
    return `${hh}:${mm.toString().padStart(2, '0')}:${ss}`;
  }
  return `${mm}:${ss}`;
};

let count = 0;

const UltimoEvento = ({ videoUrl }) => {
  const [state, setState] = useState({
    playing: false,
    muted: false,
    volume: 0.5,
    played: 0,
    seeking: false,
  });
  const playerRef = useRef(null);
  const controlsRef = useRef(null);

  const { playing, muted, volume, played, seeking } = state;

  const handlePlayPause = () => {
    setState({ ...state, playing: !state.playing });
  };

  const handleRewind = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10);
  };
  const handleFoward = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10);
  };

  const handleMute = () => {
    setState({ ...state, muted: !state.muted });
  };

  const handleVolumeChange = (e) => {
    // console.log(e);
    setState({
      ...state,
      volume: parseFloat(e / 100),
      muted: e === 0 ? true : false,
    });
  };

  const handleVolumeSeekUp = (e) => {
    setState({
      ...state,
      volume: parseFloat(e / 100),
      muted: e === 0 ? true : false,
    });
  };

  const handleProgress = (changeState) => {
    // console.log(changeState);
    if (count > 2) {
      controlsRef.current.style.visibility = 'hidden';
      count = 0;
    }
    if (controlsRef.current.style.visibility == 'visible') {
      count += 1;
    }
    if (!state.seeking) {
      setState({ ...state, ...changeState });
    }
  };

  const handleSeekChange = (e, newValue) => {
    // console.log(e);
    // console.log(played);
    setState({ ...state, played: parseFloat(e / 100) });
    playerRef.current.seekTo(e / 100);
  };

  const handleSeekMouseDown = (e) => {
    setState({ ...state, seeking: true });
  };

  const handleSeekMouseUp = (e, newValue) => {
    setState({ ...state, seeking: false });
    // playerRef.current.seekTo(e / 100);
  };

  const handleMouseMove = () => {
    controlsRef.current.style.visibility = 'visible';
    count = 0;
  };

  const handleMouseLeave = () => {
    controlsRef.current.style.visibility = 'hidden';
  };

  const currentTime = playerRef.current ? playerRef.current.getCurrentTime() : '00:00';
  const duration = playerRef.current ? playerRef.current.getDuration() : '00:00';
  const elapsedTime = format(currentTime);
  const totalDuration = format(duration);

  return (
    <Container maxW="container.md">
      <PlayerWrapper onMouseLeave={handleMouseLeave} onMouseMove={handleMouseMove}>
        <ReactPlayer
          ref={playerRef}
          config={{
            youtube: {
              playerVars: { showinfo: 0, controls: 0, modestbranding: 1 },
            },
          }}
          controls={false}
          height={'100%'}
          light={false}
          muted={muted}
          playIcon={<IconButton colorScheme="green" icon={<FaPlay />} />}
          playing={playing}
          url={`${videoUrl}`}
          volume={volume}
          width={'100%'}
          onProgress={handleProgress}
        />
        <PlayerControls
          ref={controlsRef}
          elapsedTime={elapsedTime}
          muted={muted}
          played={played}
          playing={playing}
          totalDuration={totalDuration}
          volume={volume}
          onFoward={handleFoward}
          onMute={handleMute}
          onPlayPause={handlePlayPause}
          onRewind={handleRewind}
          onSeek={handleSeekChange}
          onSeekMouseDown={handleSeekMouseDown}
          onSeekMouseUp={handleSeekMouseUp}
          onVolumeChange={handleVolumeChange}
          onVolumeSeekUp={handleVolumeSeekUp}
        />
      </PlayerWrapper>
    </Container>
  );
};

export default UltimoEvento;
