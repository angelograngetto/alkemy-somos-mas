import React from 'react';
import { Heading, Box } from '@chakra-ui/react';
import Slides from '../Slides/Index';

export const Home = () => {
  return (
    <>
      <Slides />
      <Heading align="center" m="3">
        Texto de bienvenida
      </Heading>
      <Box mt="25" p="2">
        <Heading align="center" as="h2" m="3" size="lg">
          Últimas novedades
        </Heading>
      </Box>
    </>
  );
};

export default Home;
