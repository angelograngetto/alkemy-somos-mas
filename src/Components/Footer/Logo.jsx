import React from 'react';
import { Image, Stack } from '@chakra-ui/react';
import LogoNav from '../../assets/LOGO-SOMOS-MAS-nav.png';

export default function Logo({ url }) {
  return (
    <Stack alignItems="center" justifyContent="center" w="100%">
      <Image borderRadius="50%" src={LogoNav} width={{ base: '30%', md: '70%', lg: '100%' }} />
    </Stack>
  );
}
