import React from 'react';
import { Image, Stack } from '@chakra-ui/react';
import LogoBg from '../../assets/LOGO-SOMOS-MAS.png';

export default function Logo({ url }) {
  return (
    <Stack alignItems="center" direction="column" justifyContent="center" w="100%">
      {/* <Image borderRadius="50%" src={url} width={100} /> */}
      <Image borderRadius="50%" src={LogoBg} width={150} />
    </Stack>
  );
}
