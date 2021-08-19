import React from 'react';
import { Box, Button, Text, Image } from '@chakra-ui/react';
import ScriptTag from 'react-script-tag';

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
        <Box alignItems="center" display="flex" flexDirection="column">
          <Image alt="" src="https://form.com.ar/wp-content/uploads/2020/09/form-mercadopago.png" />
          <ScriptTag
            data-preference-id="198476654-f50d59a9-3348-4973-a1bb-a6a4ac270b6c"
            data-source="button"
            src="https://www.mercadopago.com.ar/integrations/v1/web-payment-checkout.js"
          />
        </Box>
      </Box>
    </>
  );
};

export default Donacion;
