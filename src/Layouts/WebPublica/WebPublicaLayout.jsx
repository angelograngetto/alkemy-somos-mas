import React from 'react';
import PublicHeader from '../../Components/Headers/PublicHeader';
import PublicFooter from '../../Components/Footer/PublicFooter';
import { linksList } from './LinksList';

const WebPublicaLayout = ({ children }) => {
  return (
    <>
      <PublicHeader options={linksList} />
      {children}
      <PublicFooter />
    </>
  );
};

export default WebPublicaLayout;
