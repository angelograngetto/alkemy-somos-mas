import React, { useEffect, useState } from 'react';
import { Heading, Box } from '@chakra-ui/react';
import Slides from '../Slides';
import OrganizationService from '../../Services/OrganitationService';

export const Home = () => {
  const [organization, setOrganization] = useState(null);

  useEffect(() => {
    const fetchOrganization = async () => {
      const response = await OrganizationService.get();
      setOrganization(response.data);
    };
    fetchOrganization();
  }, []);
  return (
    <>
      <Slides />
      <Heading align="center" m="3">
        Texto de bienvenida
      </Heading>
      <Box mt="25" p="2">
        <Heading align="center" as="h2" m="3" size="lg">
          Últimas novedades
        </Heading>
      </Box>
    </>
  );
};

export default Home;
