import React from 'react';
import Header from '../../Layouts/Backoffice/Header';
import { Flex, Box, Container } from '@chakra-ui/react';

const Backoffice = ({ msg = '¡Bienvenidos al dashboard!' }) => {
  const linksList = [
    { text: 'Actividades', to: '/backoffice/activities' },

    { text: 'Categorias', to: '/backoffice/categories' },

    { text: 'Miembros', to: '/backoffice/members' },

    { text: 'Novedades', to: '/backoffice/news' },

    { text: 'Organización', to: '/backoffice/organization' },

    { text: 'Diapositivas', to: '/backoffice/slides' },

    { text: 'Usuarios', to: '/backoffice/users' },
  ];

  return (
    <>
      <Header links={linksList} />
      <Flex align="center" justify="center" minH="88vh">
        <Container centerContent>
          <Box bg="blue.800" color="white" padding="4" px="10">
            {msg}
          </Box>
        </Container>
      </Flex>
    </>
  );
};
export default Backoffice;
