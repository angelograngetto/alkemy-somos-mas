import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@chakra-ui/react';

const LinkActivities = () => {
  return (
    <Button backgroundColor="green" color="white">
      <Link to="/backoffice/activities/create">Crear nueva actividad</Link>
    </Button>
  );
};

export default LinkActivities;
