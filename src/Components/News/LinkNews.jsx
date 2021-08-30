import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

const LinkNews = () => {
  return (
    <Button colorScheme="green" rightIcon={<AddIcon />} title="Crear nueva novedad">
      <Link to="/backoffice/news/create">Nuevo </Link>
    </Button>
  );
};

export default LinkNews;
