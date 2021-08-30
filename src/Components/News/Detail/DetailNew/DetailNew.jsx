import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Box, Heading, Image, Stack, Tag, Text } from '@chakra-ui/react';
import TitleComponent from '../../../Title/TitleComponent';
import { fetchNewsList } from '../../../../features/news/newsSlice';
import { fetchCategoryById } from '../../../../features/categories/categoriesSlice';
import Alert from '../../../Utils/Alert';
import Comments from '../../Comments';

const DetailNew = () => {
  const { id } = useParams();
  const { newsList: newItem } = useSelector((state) => state.news);
  const { category } = useSelector((state) => state.categories);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchNew = async () => {
      const response = await dispatch(fetchNewsList(id));

      if (response.error) {
        Alert('error', 'Algo salió mal', response.payload);
      }
    };

    const getCategory = async () => {
      const response = await dispatch(fetchCategoryById(newItem.category_id));
      if (response.error) {
        Alert('error', 'Algo salió mal', response.payload);
      }
    };
    fetchNew();
    if (newItem) {
      getCategory();
    }
  }, [id]);

  const content = newItem?.content?.replace(/<[^>]+>/g, '');
  const image = newItem?.image !== '' ? newItem?.image : 'https://via.placeholder.com/350';
  if (!newItem) return null;

  return (
    <Box>
      <TitleComponent
        img={
          'https://cdn.discordapp.com/attachments/872973629376319500/881352780260966400/foto.png'
        }
        text={'Novedades'}
      />
      <Box h="100%" mb={6}>
        <Heading p={6} textAlign="center">
          {newItem?.name}
        </Heading>
        <Stack direction={{ base: 'column', md: 'row' }} marginTop={10} mx="10%" spacing={10}>
          <Stack alignItems="center" justifyContent="center">
            <Image borderRadius="xl" maxWidth={{ base: '100%', md: 350, lg: 500 }} src={image} />
          </Stack>
          <Stack alignItems={{ base: 'center', md: 'flex-start' }} spacing={4} width="100%">
            {category ? <Tag colorScheme="blue">{category.name}</Tag> : null}
            <Text fontSize={24} fontWeight="bold">
              Descripción
            </Text>
            <Text textAlign="justify">{content}</Text>
          </Stack>
        </Stack>
        <Comments />
      </Box>
    </Box>
  );
};

export default DetailNew;
