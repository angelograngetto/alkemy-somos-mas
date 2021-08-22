import React from 'react';
import { Stack } from '@chakra-ui/react';
import Logo from './Logo';
import campaignLogo from '../../../assets/Logotipo-campaña.png';
import organizationLogo from '../../../assets/LOGO-SOMOS-MAS.png';
import slogan from '../../../assets/slogan.png';

const Header = () => {
  return (
    <Stack
      alignItems="center"
      backgroundColor={{ base: 'blue.100', xl: 'rgba(0,0,0,0.2)' }}
      direction="row"
      justifyContent="space-between"
      paddingX={5}
      paddingY={{ base: 2, xl: 3 }}
      position={{ xl: 'absolute' }}
      top={{ xl: 0 }}
      width="100%"
      zIndex={1}
    >
      <Logo logo={campaignLogo} width={{ base: '45px', xl: '80px' }} />
      <Logo
        display={{ base: 'none', md: 'block' }}
        logo={organizationLogo}
        width={{ base: '70px', xl: '90px' }}
      />
      <Logo
        display={{ base: 'none', lg: 'block' }}
        logo={slogan}
        width={{ base: '70px', xl: '90px' }}
      />
    </Stack>
  );
};

export default Header;
