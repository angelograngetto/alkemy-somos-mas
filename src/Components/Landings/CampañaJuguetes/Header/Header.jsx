import React from 'react';
import { Box, Image, Text } from '@chakra-ui/react';

const Header = () => {
  return (
    <Box bg="blue.700">
      <Box
        alignItems="center"
        d="flex"
        h="160px"
        justifyContent="space-around"
        opacity={{ base: '1', md: '1', lg: '1', xl: '0.6' }}
      >
        <Image
          alt="logo-image"
          d={{ base: 'none', md: 'flex', lg: 'flex' }}
          h="200px"
          objectFit="cover"
          src="https://i.ibb.co/tX5647j/LOGO-SOMOS-MAS.png"
        />
        <Text color="#9ac9fb" d={{ base: 'none', lg: 'flex' }} fontSize="2em" fontStyle="italic">
          Campaña &quot;Juguetes por más sonrisas&quot;
        </Text>
        <Image
          alt="campaña-image"
          h="100px"
          objectFit="cover"
          src="https://i.ibb.co/LP7TVYj/Logotipo-campa-a-juguetes.png"
        />
      </Box>
    </Box>
  );
};

export default Header;
