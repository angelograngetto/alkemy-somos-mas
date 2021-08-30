import React from 'react';
import { Image, Stack } from '@chakra-ui/react';
import LogoNav from '../../assets/LOGO-SOMOS-MAS-nav.png';

export default function Logo({ url }) {
  return (
    <Stack alignItems="center" direction="column" justifyContent="center" w="100%">
      <Image borderRadius="50%" src={LogoNav} width={150} />
    </Stack>
  );
}
