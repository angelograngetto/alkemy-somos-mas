import React, { useRef, useEffect, useState } from 'react';
import { Box, Text } from '@chakra-ui/react';

const Countdown = () => {
  const [timerDays, setTimerDays] = useState('00');
  const [timerHours, setTimerHours] = useState('00');
  const [timerMinutes, setTimerMinutes] = useState('00');
  const [timerSeconds, setTimerSeconds] = useState('00');

  let interval = useRef();

  const startTimer = () => {
    const countdownDate = new Date('September 30, 2021, 00:00:00').getTime();

    interval.current = setInterval(() => {
      const now = new Date().getTime();
      const distance = countdownDate - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        //STOP TIMER
        clearInterval(interval.current);
      } else {
        //UPDATE TIMER
        setTimerDays(days);
        setTimerHours(hours);
        setTimerMinutes(minutes);
        setTimerSeconds(seconds);
      }
    }, 1000);
  };

  useEffect(() => {
    startTimer();
    return () => {
      clearInterval(interval.current);
    };
  }, []);

  return (
    <Box
      d="flex"
      justifyContent="center"
      width={{ sm: '200px', md: '300px', lg: '350px', xl: '360px' }}
    >
      <Box>
        <Text
          fontSize={{ base: '22px', md: '40px', lg: '56px' }}
          ml={{ base: '18px' }}
          mr={{ base: '20px', md: '40px', lg: '25px' }}
        >
          {timerDays}
        </Text>
        <Text ml={{ base: '16px', md: '24px', lg: '35px' }}>Días</Text>
      </Box>
      <Text fontSize={{ base: '22px', md: '40px', lg: '56px' }} mr={4}>
        :
      </Text>
      <Box>
        <Text
          fontSize={{ base: '22px', md: '40px', lg: '56px' }}
          ml={{ base: '16px' }}
          mr={{ base: '20px', md: '40px', lg: '25px' }}
        >
          {timerHours}
        </Text>
        <Text ml={{ base: '5px', md: '15px', lg: '25px' }}>Horas</Text>
      </Box>
      <Text fontSize={{ base: '22px', md: '40px', lg: '56px' }} ml={2} mr={4}>
        :
      </Text>
      <Box>
        <Text
          fontSize={{ base: '22px', md: '40px', lg: '56px' }}
          ml={{ base: '16px' }}
          mr={{ base: '20px', md: '40px', lg: '25px' }}
        >
          {timerMinutes}
        </Text>
        <Text ml={{ base: '3px', md: '15px', lg: '16px' }}>Minutos</Text>
      </Box>
      <Text fontSize={{ base: '22px', md: '40px', lg: '56px' }} mr={4}>
        :
      </Text>
      <Box>
        <Text fontSize={{ base: '22px', md: '40px', lg: '56px' }} ml={{ base: '18px' }}>
          {timerSeconds}
        </Text>
        <Text ml={{ lg: '15px' }} mr={{ base: '10px', lg: '15px' }}>
          Segundos
        </Text>
      </Box>
    </Box>
  );
};

export default Countdown;
