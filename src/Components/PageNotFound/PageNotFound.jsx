import React from 'react';
import { Box, Image, Button } from '@chakra-ui/react';
import img404 from '../../assets/404.gif';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <Box
      alignItems="center"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      mb={{ base: '0', md: '8', lg: '0' }}
      mt={{ base: '14', md: '4', lg: '3' }}
      w="100%"
    >
      <Image src={img404} width={{ base: '100%', md: '70%', lg: '50%' }} />
      <Link to="/">
        <Button color="white" colorScheme="green" fontSize="18px">
          Volver a Inicio
        </Button>
      </Link>
    </Box>
  );
};

export default PageNotFound;
