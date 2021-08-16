import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Container, Image, Stack, Text, Button, Alert, Box, AlertIcon } from '@chakra-ui/react';
import TitleComponent from '../../Title/TitleComponent';
import { fetchActivitiesList } from '../../../features/activities/activitiesSlice';
import CategoriesService from '../../../Services/CategoriesServices';
import ProgressBar from '../../Utils/ProgressBar';

const DetailView = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { activitiesList, loading, error } = useSelector((state) => state.activities);
  const [category, setCategory] = useState('');
  const getData = async () => {
    dispatch(fetchActivitiesList(id));
    const resp = await CategoriesService.getById(activitiesList.category_id);
    setCategory(resp.data);
  };
  useEffect(() => {
    getData();
  }, [id]);

  const description = activitiesList?.description?.replace(/<[^>]+>/g, '');
  const image =
    activitiesList?.image !== '' ? activitiesList?.image : 'https://via.placeholder.com/350';
  return (
    <>
      {loading ? (
        <ProgressBar colorScheme="blue" isIndeterminate={true} />
      ) : error ? (
        <Box
          alignItems="center"
          d="flex"
          flexDirection="column"
          justifyContent="center"
          m="4"
          minH="100vh"
        >
          <Alert
            alignItems="center"
            d="flex"
            flexDirection="column"
            justifyContent="center"
            status="error"
            textAlign="center"
          >
            <AlertIcon />
            Ocurrió un error al visualizar las actividades, comprueba tu conexión a internet o
            inténtalo de nuevo.
          </Alert>
          <Button
            colorScheme="blue"
            my="2"
            variant="outline"
            w="fit-content"
            onClick={() => dispatch(fetchActivitiesList(id))}
          >
            Volver a intentar
          </Button>
        </Box>
      ) : (
        <Container maxWidth={{ base: 'container.xl', md: 'container.xl' }} paddingY={20}>
          <TitleComponent text={activitiesList?.name} />
          <Stack direction={{ base: 'column', md: 'row' }} marginTop={10} spacing={10}>
            <Stack alignItems="center" justifyContent="center">
              <Image src={image} width={350} />
            </Stack>
            <Stack alignItems={{ base: 'center', md: 'flex-start' }} spacing={4} width="100%">
              <Stack
                border="1px solid gray"
                borderRadius={15}
                direction="row"
                justifyContent="center"
                minWidth={{ base: '40%', md: '25%' }}
                padding={1}
              >
                <Text>{category?.name}</Text>
              </Stack>
              <Text fontSize={24} fontWeight="bold">
                Descripción
              </Text>
              <Text textAlign="justify">{description}</Text>
            </Stack>
          </Stack>
        </Container>
      )}
    </>
  );
};

export default DetailView;
