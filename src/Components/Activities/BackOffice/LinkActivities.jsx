import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

const LinkActivities = () => {
  return (
    <Link to="/backoffice/activities/create">
      <Button colorScheme="green" title="Crear nueva actividad">
        Nuevo <AddIcon ml="2" />
      </Button>
    </Link>
  );
};

export default LinkActivities;
