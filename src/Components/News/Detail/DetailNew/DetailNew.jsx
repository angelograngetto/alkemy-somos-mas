import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Image, Stack, Text } from '@chakra-ui/react';
import TitleComponent from '../../../Title/TitleComponent';
import NewsService from '../../../../Services/NewsService';
import CategoriesService from '../../../../Services/CategoriesServices';

const DetailNew = () => {
  const { id } = useParams();
  const [newItem, setNewItem] = useState('');
  const [category, setCategory] = useState('');
  const fetchData = async () => {
    try {
      const newsResponse = await NewsService.getNews(id);
      setNewItem(newsResponse.data.data);
      const categoriesResponse = await CategoriesService.getById(
        newsResponse.data.data.category_id,
      );
      setCategory(categoriesResponse.data);
    } catch (err) {
      alert(err);
    }
  };
  useEffect(() => {
    fetchData();
  }, [id]);

  const content = newItem?.content?.replace(/<[^>]+>/g, '');
  const image = newItem?.image !== '' ? newItem?.image : 'https://via.placeholder.com/350';
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
            <Text>{category?.name}</Text>
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
