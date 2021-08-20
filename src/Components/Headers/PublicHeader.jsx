import { Stack } from '@chakra-ui/react';
import React, { useState } from 'react';
import Logo from './Logo';
import MenuLinks from './MenuLinks';
import MenuToggle from './MenuToggle';
import NavbarContainer from './NavbarContainer';

const isLogged = true;

const PublicHeader = ({ options }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <NavbarContainer>
      <Logo w={{ base: '35%', md: '15%' }} />
      <MenuToggle isOpen={isOpen} toggle={toggle} />
      {options ? <MenuLinks isLogged={isLogged} isOpen={isOpen} options={options} /> : null}
    </NavbarContainer>
  );
};

export default PublicHeader;
