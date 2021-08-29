import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  Flex,
  Box,
  Image,
  Button,
  Alert,
  Divider,
  AlertIcon,
  Spacer,
  Text,
  VStack,
  Stack,
  Input,
  InputGroup,
  InputLeftAddon,
  Textarea,
  FormLabel,
} from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import OrganizationService from '../../../Services/OrganitationService';
import ProgressBar from '../../Utils/ProgressBar';
import {
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
  FaInstagram,
  FaPhoneAlt,
  FaEnvelope,
} from 'react-icons/fa';
const Organization = () => {
  const history = useHistory();
  const [organization, setOrganization] = useState(null);
  const [utils, setUtils] = useState({ loading: false, error: false });
  const [plainShortDescription, setShortPlainDescription] = useState('');
  const [plainLongDescription, setLongPlainDescription] = useState('');

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

  useEffect(() => {
    const shortDescriptionHTML = organization?.short_description || '';
    setShortPlainDescription(shortDescriptionHTML.replace(/<[^>]+>/g, '') || '');
    const longDescriptionHTML = organization?.long_description || '';
    setLongPlainDescription(longDescriptionHTML.replace(/<[^>]+>/g, '') || '');
  }, [organization]);

  const toEdit = () => {
    history.push('/backoffice/organization/edit');
  };

  return (
    <Flex align="center" justify="center" minH="100vh" p={{ base: 0, sm: 0, lg: 5 }}>
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
            Hubo un error al cargar los datos, comprueba tu conexión a internet o intentálo de nuevo
            <Button colorScheme="blue" my="4" variant="outline" onClick={() => fetchOrganization()}>
              Volver a intentar
            </Button>
          </Alert>
        </Box>
      ) : (
        <Flex
          borderRadius={{ base: '0', sm: '0', lg: 'xl' }}
          borderWidth="1px"
          boxShadow="2xl"
          flexDir="column"
          justify="center"
          overflow="hidden"
          p={{ base: 0, sm: 1, lg: 2 }}
          w="5xl"
        >
          <Flex align="center" flexWrap="wrap" justify="space-between" m={{ base: 3, sm: 0 }}>
            <Text
              isTruncated
              as="h1"
              fontSize="xx-large"
              fontWeight="semibold"
              lineHeight="tall"
              p="2"
            >
              Datos de la organización
            </Text>
            <Spacer />
            <Button colorScheme="green" mr="2" title="Editar información" onClick={toEdit}>
              Editar <EditIcon ml="2" />
            </Button>
          </Flex>
          <Divider />

          <Stack m="3" spacing={5}>
            <Box>
              <InputGroup boxShadow="lg" size="lg">
                <InputLeftAddon>Nombre:</InputLeftAddon>
                <Input readOnly boxShadow="lg" value={organization?.name} />
              </InputGroup>
            </Box>
            <Image borderRadius="lg" boxShadow="lg" m="3" src={organization?.logo} />
            <Box>
              <FormLabel>Texto de bienvenida:</FormLabel>
              <InputGroup boxShadow="lg" size="lg">
                <Input readOnly boxShadow="lg" value={organization?.welcome_text} />
              </InputGroup>
            </Box>
            <Box>
              <FormLabel>Descripción corta:</FormLabel>
              <InputGroup boxShadow="lg" size="lg">
                <Textarea
                  readOnly
                  borderRadius="lg"
                  boxShadow="lg"
                  minH={{ sm: '10rem', md: '5rem' }}
                  resize="none"
                  value={plainShortDescription}
                />
              </InputGroup>
            </Box>
            <Box>
              <FormLabel>Descripción larga:</FormLabel>
              <InputGroup boxShadow="lg" size="lg">
                <Textarea
                  readOnly
                  borderRadius="lg"
                  boxShadow="lg"
                  minH={{ sm: '10rem', md: '10rem' }}
                  resize="none"
                  value={plainLongDescription}
                />
              </InputGroup>
            </Box>
            <InputGroup boxShadow="lg" size="lg">
              <InputLeftAddon color="blue.500">
                <FaFacebookF />
              </InputLeftAddon>
              <Input readOnly value={organization?.facebook_url} />
            </InputGroup>
            <InputGroup boxShadow="lg" size="lg">
              <InputLeftAddon color="blue.300">
                <FaLinkedinIn />
              </InputLeftAddon>
              <Input readOnly value={organization?.linkedin_url} />
            </InputGroup>
            <InputGroup boxShadow="lg" size="lg">
              <InputLeftAddon color="cyan.300">
                <FaTwitter />
              </InputLeftAddon>
              <Input readOnly value={organization?.twitter_url} />
            </InputGroup>
            <InputGroup boxShadow="lg" size="lg">
              <InputLeftAddon color="pink.300">
                <FaInstagram />
              </InputLeftAddon>
              <Input readOnly value={organization?.instagram_url} />
            </InputGroup>
            <InputGroup boxShadow="lg" size="lg">
              <InputLeftAddon color="green.300">
                <FaPhoneAlt />
              </InputLeftAddon>
              <Input readOnly value={organization?.cellphone} />
            </InputGroup>
            <InputGroup boxShadow="lg" size="lg">
              <InputLeftAddon color="red.300">
                <FaEnvelope />
              </InputLeftAddon>
              <Input readOnly value="somosmas@ong.com" />
            </InputGroup>
          </Stack>
        </Flex>
      )}
    </Flex>
  );
};

export default Organization;
