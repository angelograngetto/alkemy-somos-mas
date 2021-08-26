import React, { useState, useEffect } from 'react';
import TitleComponent from '../Title/TitleComponent';
import { Box, Flex } from '@chakra-ui/react';
import Map from '../Map';
import { useSelector, useDispatch } from 'react-redux';
import { getOrganization } from '../../features/about/aboutSlice';
import ContactForm from './ContactForm';

const index = ({ datosContacto }) => {
  const { aboutUS } = useSelector((state) => state.about);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrganization());
  }, []);

  return (
    <div>
      <TitleComponent text={'Contacto'} />
      {datosContacto ? <p>{datosContacto}</p> : <p>{'Datos no disponibles'}</p>}
      <Box m="auto" w="80%">
        <ContactForm />
        <Box h="20rem" m="auto" w="100%">
          <Map address={aboutUS?.address} markerTitle={aboutUS?.name} />
        </Box>
      </Box>
    </div>
  );
};

export default index;
