import React from 'react';
import PublicHeader from '../../Components/Headers/PublicHeader';
import PublicFooter from '../../Components/Footer/PublicFooter';
import { linksList } from './LinksList';
import { Stack } from '@chakra-ui/react';

const WebPublicaLayout = ({ children }) => {
  return (
    <>
      <PublicHeader options={linksList} />
      <Stack direction="column" minHeight="100vh">
        {children}
      </Stack>
      <PublicFooter />
    </>
  );
};

export default WebPublicaLayout;
