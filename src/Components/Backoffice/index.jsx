import React from 'react';
import { Flex, Box, Container } from '@chakra-ui/react';

const Backoffice = ({ msg = '¡Bienvenidos al dashboard!' }) => {
  return (
    <>
      <Flex align="center" justify="center" minH="88vh">
        <Container centerContent>
          <Box bg="#6767FF" color="white" padding="5" px="10">
            {msg}
          </Box>
        </Container>
      </Flex>
    </>
  );
};
export default Backoffice;
