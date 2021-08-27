import React from 'react';
import { Box, Heading, Image, Text } from '@chakra-ui/react';
import Countdown from './Countdown';
import TitleComponent from '../../../Title/TitleComponent';
import Slider from '../../Slider/index';

const Contenido = () => {
  return (
    <Box>
      <TitleComponent text="Campaña Escolar 2021" textCenter="center" />
      <Slider />
      <Box bg={{ base: 'gray.400' }} mt="25px" p={5}>
        <Box
          d="flex"
          justifyContent="space-evenly"
          opacity={{ sm: '1', md: '1', lg: '1', xl: '1', '2xl': '0.6' }}
        >
          <Image
            d={{ base: 'none', lg: 'flex' }}
            src="https://i.ibb.co/TgyzcmL/Im-genes-contenido-opci-n-1.png"
            w="180px"
          />
          <Image
            d={{ base: 'none', lg: 'flex' }}
            src="https://i.ibb.co/LpxPfkm/Im-genes-contenido-opci-n-2.png"
            w="180px"
          />
          <Image
            d={{ base: 'none', lg: 'flex' }}
            src="https://i.ibb.co/TgyzcmL/Im-genes-contenido-opci-n-1.png"
            w="180px"
          />
        </Box>
        <Box
          alignItems="center"
          bg="gray.200"
          borderRadius="15px"
          d="flex"
          flexDirection={{ base: 'column', md: 'column', lg: 'row', xl: 'row' }}
          h={{ base: '380px', lg: '250px' }}
          justifyContent="space-around"
          mb={10}
          mt={10}
          w="100%"
        >
          <Box alignItems="center" d="flex" flexDirection={{ base: 'column', md: 'column' }}>
            <Text fontSize="1.3em" fontWeight="bold">
              Nueva Campaña Escolar
            </Text>
            <Text fontSize="1.2em" fontStyle="italic">
              La Cava Aprende 2021
            </Text>
            <Text fontSize="1em" mt={2}>
              Comienza el 9 de septiembre
            </Text>
          </Box>

          <Countdown />

          <Image
            alt="logo"
            boxSize="200px"
            p={4}
            src="https://i.ibb.co/2kRBQFr/Logotipo-campa-a-materiales-escolares.png"
          />
        </Box>
        <Box
          d="flex"
          justifyContent="space-evenly"
          mb="40px"
          opacity={{ sm: '1', md: '1', lg: '1', xl: '1', '2xl': '0.6' }}
        >
          <Image
            d={{ base: 'none', lg: 'flex' }}
            src="https://i.ibb.co/TgyzcmL/Im-genes-contenido-opci-n-1.png"
            w="180px"
          />
          <Image
            d={{ base: 'none', lg: 'flex' }}
            src="https://i.ibb.co/LpxPfkm/Im-genes-contenido-opci-n-2.png"
            w="180px"
          />
          <Image
            d={{ base: 'none', lg: 'flex' }}
            src="https://i.ibb.co/TgyzcmL/Im-genes-contenido-opci-n-1.png"
            w="180px"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Contenido;
