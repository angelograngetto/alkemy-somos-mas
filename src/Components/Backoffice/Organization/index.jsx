import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Flex, Box, Container, Image, Button, Alert, AlertIcon } from '@chakra-ui/react';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import OrganizationService from '../../../Services/OrganitationService';
import ProgressBar from '../../Utils/ProgressBar';
const Organization = () => {
  const history = useHistory();
  const [organization, setOrganization] = useState(null);
  const [utils, setUtils] = useState({ loading: false, error: false });

  const fetchOrganization = async () => {
    try {
      setUtils({ error: false, loading: true });
      const response = await OrganizationService.get();
      setOrganization(response.data);
      setUtils({ error: false, loading: false });
    } catch (error) {
      setUtils({ error: true, loading: false });
    }
  };

  useEffect(() => {
    fetchOrganization();
  }, []);

  const toEdit = () => {
    history.push('/backoffice/organization/edit');
  };

  const name = 'Name';
  const image = 'https://via.placeholder.com/300x200?text=image';
  const shortDescription = 'Lorem ipsum short description';

  return (
    <Flex align="center" justify="center" minH="100vh">
      <Container>
        {utils.loading ? (
          <Box m="-250px">
            <ProgressBar colorScheme="blue" isIndeterminate={true} />
          </Box>
        ) : utils.error ? (
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
        ) : (
          <>
            <Box borderRadius="lg" borderWidth="1px" maxW="lg" overflow="hidden">
              <Image alt={name} src={image} />
              <Box isTruncated as="h4" fontWeight="semibold" lineHeight="tight" m="2">
                {name}
              </Box>
              <Box m="2">{shortDescription}</Box>
            </Box>
            <Button
              colorScheme="teal"
              margin="1rem"
              rightIcon={<ArrowForwardIcon />}
              variant="outline"
              onClick={toEdit}
            >
              Edit
            </Button>
          </>
        )}
      </Container>
    </Flex>
  );
};

export default Organization;
