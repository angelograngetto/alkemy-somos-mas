import React, { useEffect } from 'react';
import TitleComponent from '../Title/TitleComponent';
import { Box, Text, Image } from '@chakra-ui/react';
import Map from '../Map';
import { useSelector, useDispatch } from 'react-redux';
import { getOrganization } from '../../features/about/aboutSlice';
import ContactForm from './ContactForm';

const index = () => {
  const { aboutUS } = useSelector((state) => state.about);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrganization());
  }, []);

  return (
    <div>
      <TitleComponent
        img={
          'https://cdn.discordapp.com/attachments/872973629376319500/881352780260966400/foto.png'
        }
        text={'Contacto'}
      />
      <Box m="auto" w="80%">
        <Image
          alt="somosmas-logo"
          boxSize="cover"
          m="auto"
          src="https://i.ibb.co/pPZy4gR/ box LOGO-SOMOS-MAS-1.png"
          w={{ base: '200px', lg: '300px' }}
        />
        <Box border="2px solid black" borderRadius="15px" marginTop="-40px" padding="25px">
          <Text
            d="flex"
            fontSize={{ base: '20px', lg: '2em' }}
            justifyContent="center"
            textAlign="center"
          >
            <span style={{ color: '#DB5752', marginRight: '10px' }}>Dirección:</span>Maipú 4218
          </Text>
          <Text
            d="flex"
            fontSize={{ base: '20px', lg: '2em' }}
            justifyContent="center"
            textAlign="center"
          >
            <span style={{ color: '#e2e203', marginRight: '10px' }}>Teléfono:</span>
            {aboutUS.cellphone}
          </Text>
          <Text
            d="flex"
            fontSize={{ base: '20px', lg: '2em' }}
            justifyContent="center"
            textAlign="center"
          >
            <span style={{ color: '#9AC9FB', marginRight: '10px' }}>Email:</span>
            somosmas@ong.com
          </Text>
        </Box>
        <Text fontSize={{ base: '20px', lg: '2em' }} marginTop="50px" textAlign="center">
          O dejanos un mensaje:
        </Text>
        <Text fontSize={{ base: '15px', lg: '1.3em' }} marginTop="10px" textAlign="center">
          (Te respondemos lo antes posible)
        </Text>
        <ContactForm />
        <Box h="20rem" m="auto" marginBottom="100px" w="100%">
          <Text fontSize={{ base: '1.4em', lg: '2em' }} marginBottom="20px" textAlign="center">
            Visitanos en nuestras oficinas
          </Text>
          <Map address={aboutUS?.address} markerTitle={aboutUS?.name} />
        </Box>
      </Box>
    </div>
  );
};

export default index;
