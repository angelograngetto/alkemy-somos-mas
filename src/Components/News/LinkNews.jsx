import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@chakra-ui/react';

const LinkNews = () => {
  return (
    <Button backgroundColor="green" color="white">
      <Link to="/backoffice/news/create">Crear nueva novedad</Link>
    </Button>
  );
};

export default LinkNews;
