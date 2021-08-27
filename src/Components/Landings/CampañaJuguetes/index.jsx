import { Box, Text, Image } from '@chakra-ui/react';
import React from 'react';
import Countdown from './Contenido/Countdown';
import Header from './Header/Header';
import Slider from '../Slider/index';

const CampañaJuguetesLanding = () => {
  return (
    <>
      <Header />
      <Slider />
      <Box
        alignItems="center"
        //   backgroundImage="url('https://i.ibb.co/vBSgtCd/Im-genes-contenido-opci-n-2.png')"
        bg={{ base: 'none', xl: 'rgba(201, 76, 76, 0.3)' }}
        bgPosition="center"
        borderColor="gray.200"
        d="flex"
        flexDirection="column"
        flexWrap="wrap"
        p="3"
      >
        <Image
          alt="Logo Campaña"
          borderRadius="full"
          boxSize="200px"
          display={{ base: 'none', lg: 'block' }}
          mb="4"
          src="https://i.ibb.co/JnpXr3W/Logotipo-campa-a-juguetes.png"
        />
        <Text fontSize={{ base: '14px', md: '21px', lg: '29px', xl: '46px' }}>
          CAMPAÑA JUGUETES POR MÁS SONRISAS
        </Text>
        <Text fontSize={{ base: '12px', md: '18px', lg: '28px', xl: '42px' }}>
          16 Septiembre 2021 10:00 am - Obelisco{' '}
        </Text>
        <Box
          display={{ sm: 'none', md: 'block' }}
          fontSize={{ base: '12px', md: '18px', lg: '28px', xl: '42px' }}
          mb="3"
        >
          <Countdown fecha={'September 16, 2021, 00:10:00'} />
        </Box>
      </Box>
    </>
  );
};

export default CampañaJuguetesLanding;
