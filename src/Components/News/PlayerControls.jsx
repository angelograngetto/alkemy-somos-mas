import React, { forwardRef } from 'react';
import { Button, Container, Grid, GridItem, IconButton } from '@chakra-ui/react';
import styled from '@emotion/styled';
import {
  MdFastRewind,
  MdPlayArrow,
  MdFastForward,
  MdVolumeUp,
  MdPause,
  MdVolumeOff,
} from 'react-icons/md';
import { Slider, SliderTrack, SliderFilledTrack, SliderThumb } from '@chakra-ui/react';
import { Text } from '@chakra-ui/react';

const PlayerControlsWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  z-index: 1;
`;

const controlIcons = {
  color: '#999',
  fontSize: 60,
  transform: 'scale(0.9)',
  '&:hover': {
    color: '#fff',
    transform: 'scale(1)',
  },
};

const buttonIcons = {
  color: '#999',
  '&:hover': {
    color: '#fff',
  },
};

const volumeSlider = {
  width: 100,
};

const PlayerControls = (
  {
    onPlayPause,
    playing,
    onFoward,
    onRewind,
    muted,
    onMute,
    onVolumeChange,
    onVolumeSeekUp,
    volume,
    played,
    onSeek,
    onSeekMouseDown,
    onSeekMouseUp,
    elapsedTime,
    totalDuration,
  },
  ref,
) => {
  return (
    <PlayerControlsWrapper ref={ref}>
      {/* controls top */}
      <Grid
        alignItems="center"
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        stye={{ padding: 16 }}
      >
        <GridItem>
          <Text style={{ color: '#fff', margin: '10px' }}>Nuestros Videos</Text>
        </GridItem>
      </Grid>

      {/* controls middle */}

      <Grid alignItems="center" display="flex" flexDirection="row" justifyContent="center">
        <IconButton style={controlIcons} variant="link" onClick={onRewind}>
          <MdFastRewind fontSize="inherit" />
        </IconButton>

        <IconButton style={controlIcons} variant="link" onClick={onPlayPause}>
          {playing ? <MdPause fontSize="inherit" /> : <MdPlayArrow fontSize="inherit" />}
        </IconButton>

        <IconButton style={controlIcons} variant="link" onClick={onFoward}>
          <MdFastForward fontSize="inherit" />
        </IconButton>
      </Grid>

      {/* bottom controls */}
      <div
        alignItems="center"
        flexDirection="row"
        justifyContent="space-between"
        style={{ padding: 16 }}
      >
        <GridItem>
          <Slider
            aria-label="slider-ex-1"
            max={100}
            min={0}
            value={played * 100}
            onChange={onSeek}
            onChangeCommitted={onSeekMouseUp}
            onMouseDown={onSeekMouseDown}
          >
            <SliderTrack>
              <SliderFilledTrack />
            </SliderTrack>
            <SliderThumb />
          </Slider>
        </GridItem>

        <GridItem>
          <Grid alignItems="center" display="flex" flexDirection="row">
            <IconButton fontSize="30px" style={buttonIcons} variant="link" onClick={onPlayPause}>
              {playing ? <MdPause /> : <MdPlayArrow />}
            </IconButton>
            <IconButton fontSize="30px" style={buttonIcons} variant="link" onClick={onMute}>
              {muted ? <MdVolumeOff /> : <MdVolumeUp />}
            </IconButton>

            <Slider
              aria-label="slider-ex-1"
              max={100}
              min={0}
              style={volumeSlider}
              value={muted ? 0 : volume * 100}
              width="20%"
              onChange={onVolumeChange}
              onChangeCommitted={onVolumeSeekUp}
            >
              <SliderTrack>
                <SliderFilledTrack />
              </SliderTrack>
              <SliderThumb />
            </Slider>
            <Button style={{ color: '#fff', marginLeft: 16 }} variant="text">
              <Text>
                {elapsedTime} / {totalDuration}
              </Text>
            </Button>
          </Grid>
        </GridItem>
      </div>
    </PlayerControlsWrapper>
  );
};

export default forwardRef(PlayerControls);
