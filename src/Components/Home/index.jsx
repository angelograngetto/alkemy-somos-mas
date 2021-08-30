import React, { useEffect, useState } from 'react';
import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Stack,
  Text,
} from '@chakra-ui/react';
import OrganizationService from '../../Services/OrganitationService';
import Slides from '../Slides/index';
import bgImage from '../../assets/home1.jpg';
import ReactHtmlParser from 'react-html-parser';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNewsList } from '../../features/news/newsSlice';
import bgCampañaEscolar from '../../assets/escuela.jpg';
import bgCampañaJuguetes from '../../assets/juguetes.jpg';
import { FaAngleDown } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './styles.css';

export const Home = () => {
  const dispatch = useDispatch();
  const [organization, setOrganization] = useState([]);
  const [utils, setUtils] = useState({ error: false, loading: false });
  const { newsList } = useSelector((state) => state.news);

  const fetchOrganization = async () => {
    try {
      setUtils({ error: false, loading: true });
      const response = await OrganizationService.get();
      setOrganization(response.data);
      setUtils({ error: false, loading: false });
    } catch (err) {
      setUtils({ error: true, loading: false });
    }
  };

  const fetchNews = async () => {
    try {
      dispatch(fetchNewsList());
    } catch (error) {
      setUtils({ error: true, loading: false });
    }
  };

  useEffect(() => {
    fetchOrganization();
    fetchNews();
  }, []);

  return (
    <Stack backgroundColor="yellow.100" marginTop={0}>
      {utils.error ? (
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
        <Stack>
          <Slides />
          <Stack
            alignItems="center"
            as="section"
            backgroundColor="yellow.100"
            minH="calc(100vh + 2rem)"
            paddingBottom={16}
          >
            <Container
              display="flex"
              flexDirection="column"
              height="100%"
              justifyContent="space-around"
              maxW={{ md: 'container.lg', xl: 'container.xl' }}
              minH="100vh"
            >
              <Stack alignItems="center" flex={1} justifyContent="center" spacing={8}>
                <Text
                  fontSize={{ base: '2xl', md: '5xl' }}
                  fontWeight="bolder"
                  marginTop={8}
                  textShadow="2px 2px 2px gray"
                >
                  {organization.welcome_text}
                </Text>
                <Text letterSpacing="1px" textAlign="justify">
                  {ReactHtmlParser(organization.long_description)}
                </Text>
              </Stack>
            </Container>
          </Stack>
          <Stack
            as="section"
            backgroundAttachment="fixed"
            backgroundImage={bgImage}
            backgroundSize="cover"
            height="100vh"
          >
            <Container
              alignItems="center"
              display="flex"
              flexDirection="column"
              height="100vh"
              justifyContent="space-around"
            >
              <Stack alignItems="center">
                <Text
                  color="white"
                  fontSize={{ base: '4xl', md: '6xl' }}
                  fontWeight="bolder"
                  textShadow="5px 5px 5px gray"
                >
                  Nuestra Visión:
                </Text>
                <Text
                  color="white"
                  fontSize={{ base: 'sm', md: 'lg' }}
                  textAlign="justify"
                  textShadow="1px 1px 1px gray"
                >
                  Mejorar la calidad de vida de niños y familias en situación de vulnerabilidad en
                  el barrio La Cava, otorgando un cambio de rumbo en cada individuo a través de la
                  educación, salud, trabajo, deporte, responsabilidad y compromiso.
                </Text>
              </Stack>

              <Stack alignItems="center">
                <Text
                  color="white"
                  fontSize={{ base: '4xl', md: '6xl' }}
                  fontWeight="bolder"
                  textShadow="5px 5px 5px gray"
                >
                  Nuestra Misión:
                </Text>
                <Text
                  color="white"
                  fontSize={{ base: 'sm', md: 'lg' }}
                  textAlign="justify"
                  textShadow="1px 1px 1px gray"
                >
                  Mejorar la calidad de vida de niños y familias en situación de vulnerabilidad en
                  el barrio La Cava, otorgando un cambio de rumbo en cada individuo a través de la
                  educación, salud, trabajo, deporte, responsabilidad y compromiso.
                </Text>
              </Stack>
            </Container>
          </Stack>
          <Stack alignItems="center" as="section" minHeight="calc(100vh + 2rem)" paddingY={16}>
            <Text
              fontSize={{ base: '3xl', md: '6xl' }}
              fontWeight="bolder"
              textShadow="3px 3px 5px gray"
            >
              Últimas novedades
            </Text>
            <Container marginX="auto" maxW="container.xl">
              <Grid
                gap={6}
                padding={4}
                templateColumns={{ base: 'repeat(1, 1fr)', lg: 'repeat(2, 1fr)' }}
              >
                {newsList.slice(0, 4).map((item) => (
                  <Stack
                    key={item.id}
                    alignItems="center"
                    backgroundImage={item.image}
                    backgroundSize="cover"
                    borderRadius="5px"
                    height={{ base: '200px', md: '400px' }}
                    justifyContent="center"
                    padding={16}
                  >
                    <Link to="/novedades">
                      <Text color="white" fontSize={{ base: 'md', md: '3xl' }} fontWeight="bolder">
                        {item.name}
                      </Text>
                    </Link>
                  </Stack>
                ))}
              </Grid>
            </Container>
          </Stack>

          <Stack as="section" padding={{ base: 8, md: 16 }} spacing={8}>
            <Stack backgroundColor="gray.500" borderRadius={10}>
              <Text
                color="white"
                fontSize="4xl"
                fontWeight="bolder"
                textAlign="center"
                textShadow="2px 2px 2px black"
              >
                Campañas
              </Text>
            </Stack>
            <Stack
              alignItems="center"
              backgroundColor="white"
              backgroundImage={bgCampañaEscolar}
              backgroundPosition="-150px"
              backgroundSize="cover"
              borderRadius={10}
              boxShadow="2px 2px 2px gray"
              className="ecolar-container"
              justifyContent="center"
              minH={{ base: '30vh', md: '35vh' }}
            >
              <Stack alignItems="center" className="escolar-link" justifyContent="center">
                <FaAngleDown color="white" size={50} />
                <Link to="/campaña-escolar">
                  <Text
                    color="white"
                    fontSize={{ base: '2xl', md: '4xl' }}
                    fontWeight="bolder"
                    textShadow="2px 2px 5px gray"
                  >
                    Ir a campaña escolar
                  </Text>
                </Link>
              </Stack>
            </Stack>
            <Stack
              alignItems="center"
              backgroundColor="white"
              backgroundImage={bgCampañaJuguetes}
              backgroundSize="cover"
              borderRadius={10}
              boxShadow="2px 2px 2px gray"
              className="juguete-container"
              justifyContent="center"
              minH={{ base: '30vh', md: '35vh' }}
            >
              <Stack alignItems="center" className="juguete-link" justifyContent="center">
                <FaAngleDown color="white" size={50} />
                <Link to="/campaña-juguetes">
                  <Text
                    color="white"
                    fontSize={{ base: '2xl', md: '4xl' }}
                    fontWeight="bolder"
                    textShadow="2px 2px 5px gray"
                  >
                    Ir a campaña de juguetes
                  </Text>
                </Link>
              </Stack>
            </Stack>
          </Stack>
        </Stack>
      )}
    </Stack>
  );
};

export default Home;
