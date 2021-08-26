import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Logo from './Logo';
import { linksList } from '../../Layouts/WebPublica/LinksList';
import MenuLinks from './MenuLinks';
import MenuToggle from './MenuToggle';
import NavbarContainer from './NavbarContainer';

const PublicHeader = ({ options }) => {
  const { auth } = useSelector((state) => state.auth);
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <NavbarContainer>
      <Logo w={{ base: '35%', md: '15%' }} />
      <MenuToggle isOpen={isOpen} toggle={toggle} />
      {options ? <MenuLinks isLogged={auth} isOpen={isOpen} options={linksList} /> : null}
    </NavbarContainer>
  );
};

export default PublicHeader;
