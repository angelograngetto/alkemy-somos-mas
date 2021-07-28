import React from 'react';
import { Flex, Box, Container } from '@chakra-ui/react';

const Backoffice = ({ msg = '¡Bienvenidos al dashboard!' }) => {
  return (
    <Flex align="center" justify="center" minH="100vh">
      <Container centerContent>
        <Box bg="blue.800" color="white" padding="4" px="10">
          {msg}
        </Box>
      </Container>
    </Flex>
  );
};
export default Backoffice;
