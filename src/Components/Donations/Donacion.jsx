import { Box, Button, Text } from '@chakra-ui/react';
import React from 'react';

const Donacion = ({ text }) => {
  return (
    <>
      <Box
        alignItems="center"
        display="flex"
        flexDirection={{ base: 'column', lg: 'row' }}
        flexWrap="wrap"
        justifyContent="space-evenly"
        mt="220px"
      >
        <Text fontSize={{ base: '30px', md: '40px', lg: '50px' }}>{text}</Text>
        <Button
          _hover={{ bg: '#9999ff' }}
          bg="#6767FF"
          color="white"
          marginTop={{ base: '30px', lg: '10px' }}
        >
          Mercadopago
        </Button>
        {/* ADD STYLE OF BUTTON */}
      </Box>
    </>
  );
};

export default Donacion;
