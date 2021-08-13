import React, { useEffect, useState } from 'react';
import { Heading, Box, Alert, AlertIcon, Button, Container } from '@chakra-ui/react';
import Slides from '../Slides/Index';
import OrganizationService from '../../Services/OrganitationService';
import ProgressBar from '../Utils/ProgressBar';

export const Home = () => {
  const [organization, setOrganization] = useState([]);
  const [utils, setUtils] = useState({ error: false, loading: false });

  const fetchOrganization = async () => {
    try {
      setUtils({ error: false, loading: true });
      const response = await OrganizationService.get();
      console.log(response);
      setOrganization(response.data);
      setUtils({ error: false, loading: false });
    } catch (err) {
      setUtils({ error: true, loading: false });
    }
  };

  useEffect(() => {
    fetchOrganization();
  }, []);

  return (
    <>
      {utils.loading ? (
        <ProgressBar colorScheme="blue" isIndeterminate={true} />
      ) : utils.error ? (
        <Container>
          <Box alignItems="center" d="flex" justifyContent="center" minH="100vh">
            <Alert
              alignItems="center"
              d="flex"
              flexDirection="column"
              justifyContent="center"
              status="error"
              textAlign="center"
            >
              <AlertIcon />
              Hubo un error al cargar los datos, comprueba tu conexión a internet o intentálo de
              nuevo
              <Button
                colorScheme="blue"
                my="4"
                variant="outline"
                onClick={() => fetchOrganization()}
              >
                Volver a intentar
              </Button>
            </Alert>
          </Box>
        </Container>
      ) : (
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
      )}
    </>
  );
};

export default Home;
