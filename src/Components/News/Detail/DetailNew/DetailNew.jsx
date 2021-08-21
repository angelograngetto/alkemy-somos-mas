import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Container, Image, Stack, Text } from '@chakra-ui/react';
import TitleComponent from '../../../Title/TitleComponent';
import CategoriesService from '../../../../Services/CategoriesServices';
import { fetchNewsList } from '../../../../features/news/newsSlice';
import { fetchCategoryById } from '../../../../features/categories/categoriesSlice';
import Alert from '../../../Utils/Alert';

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
    <Container maxWidth={{ base: 'container.xl', md: 'container.xl' }} paddingY={20}>
      <TitleComponent text={newItem?.name} />
      <Stack direction={{ base: 'column', md: 'row' }} marginTop={10} spacing={10}>
        <Stack alignItems="center" justifyContent="center">
          <Image maxWidth={{ base: '100%', md: 350, lg: 500 }} src={image} />
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
            {category ? <Text>{category.name}</Text> : null}
          </Stack>
          <Text fontSize={24} fontWeight="bold">
            Descripción
          </Text>
          <Text textAlign="justify">{content}</Text>
        </Stack>
      </Stack>
    </Container>
  );
};

export default DetailNew;
