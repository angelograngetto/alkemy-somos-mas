import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Tag, Image, Stack, Text, Button, Alert, Box, Heading, AlertIcon } from '@chakra-ui/react';
import TitleComponent from '../../Title/TitleComponent';
import { fetchActivitiesList } from '../../../features/activities/activitiesSlice';
import CategoriesService from '../../../Services/CategoriesServices';
import ProgressBar from '../../Utils/ProgressBar';
import Comments from '../../News/Comments';

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
        <Box>
          <TitleComponent
            img={
              'https://cdn.discordapp.com/attachments/872973629376319500/881352780260966400/foto.png'
            }
            text={'Actividades'}
          />
          <Heading p={6} textAlign="center">
            {activitiesList?.name}
          </Heading>
          <Stack direction={{ base: 'column', md: 'row' }} marginTop={10} mx="10%" spacing={10}>
            <Stack alignItems="center" justifyContent="center">
              <Image
                borderRadius="xl"
                maxWidth={{ base: '100%', md: 350, lg: 500 }}
                src={image}
                width={350}
              />
            </Stack>
            <Stack alignItems={{ base: 'center', md: 'flex-start' }} spacing={4} width="100%">
              <Tag colorScheme="blue">Programas Educativos</Tag>
              <Text fontSize={24} fontWeight="bold">
                Descripción
              </Text>
              <Text
                dangerouslySetInnerHTML={{ __html: activitiesList?.description }}
                textAlign="justify"
              />
            </Stack>
          </Stack>
          <Comments />
        </Box>
      )}
    </>
  );
};

export default DetailView;
