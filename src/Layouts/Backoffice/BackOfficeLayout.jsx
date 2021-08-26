import React from 'react';
import Header from './Header';

const BackOfficeLayout = ({ children }) => {
  return (
    <>
      <Header />
      {children}
    </>
  );
};

export default BackOfficeLayout;
