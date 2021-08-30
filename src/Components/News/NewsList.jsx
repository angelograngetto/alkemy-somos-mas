/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react';
import {
  AspectRatio,
  Button,
  Center,
  Divider,
  Flex,
  Image,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  Spacer,
  Stack,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchNewsList,
  deleteNews,
  searchNewsList,
  filterNewsList,
} from '../../features/news/newsSlice';
import LinkNews from './LinkNews';
import Alert from '../Utils/Alert';
import ModalEdit from '../Backoffice/Utils/ModalEdit';
import NewsForm from './NewsForm';
import { SearchInput } from '../Utils/SearchInput/SearchInput';
import { FaFilter } from 'react-icons/fa';
import { fetchCategories } from '../../features/categories/categoriesSlice';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import SpinnerComponent from '../Spinner/SpinnerComponent';

const NewsList = () => {
  const dispatch = useDispatch();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [toEditNew, setToEditNew] = useState([]);
  const [newsFiltered, setNewsFiltered] = useState([]);
  const { newsList, loading } = useSelector((state) => state.news);
  const { categories } = useSelector((state) => state.categories);
  const [toSearch, setToSearch] = useState('');

  useEffect(() => {
    const fetchNews = async () => {
      const response = await dispatch(fetchNewsList());

      if (response.error) {
        Alert('error', 'Algo salió mal', response.payload);
      }
    };
    fetchNews();
  }, []);

  const searchNews = async () => {
    if (toSearch.length >= 3) {
      const resp = await dispatch(searchNewsList(toSearch));
      setNewsFiltered(resp.payload);
    } else {
      const resp = await dispatch(fetchNewsList());
      setNewsFiltered(resp.payload);
    }
  };

  useEffect(() => {
    searchNews();
    dispatch(fetchCategories());
  }, [toSearch, isEditOpen]);

  const handleFilter = (category) => {
    if (category !== 'todas') {
      dispatch(filterNewsList({ value: toSearch, category: category })).then(
        setNewsFiltered(categories),
      );
    } else {
      searchNews();
    }
  };

  const handleEditOpen = (newItem) => {
    setIsEditOpen(true);
    setToEditNew(newItem);
  };

  const handleDelete = async (id) => {
    const respAlert = await Alert(
      'confirm',
      '¿Estás seguro de querer eliminar esta novedad?',
      'Esta acción no se puede deshacer',
    );
    if (respAlert) {
      const response = await dispatch(deleteNews(id));

      if (response.error) {
        Alert('error', 'Algo salió mal', response.error);
      }

      if (response.meta.requestStatus == 'fulfilled') {
        searchNews();
        dispatch(fetchCategories());
        Alert('success', 'Éxito', 'Novedad eliminada correctamente');
      }
    }
  };

  return (
    <Flex align="center" justify="center" minH="100vh" p={{ base: 0, sm: 5 }}>
      <Flex
        borderRadius={{ base: 0, sm: 'xl' }}
        borderWidth="1px"
        boxShadow="2xl"
        flexDir="column"
        justify="center"
        overflow="hidden"
        p={{ base: 1, sm: 5 }}
        w="5xl"
      >
        <Flex align="center" justify="space-between" m={{ base: 3, sm: 0 }}>
          <Text isTruncated as="h1" fontSize="xx-large" fontWeight="semibold" lineHeight="tall">
            Novedades
          </Text>
          <Spacer />
          <Menu closeOnSelect={false}>
            <MenuButton
              as={Button}
              colorScheme="blue"
              mr="2"
              rightIcon={<FaFilter />}
              title="Buscar y filtrar"
            >
              Buscar
            </MenuButton>
            <MenuList minWidth="230px">
              <Center pl="2" pr="2">
                <SearchInput
                  placeholder="Buscar por nombre"
                  w="90%"
                  onDebounce={(value) => setToSearch(value)}
                />
              </Center>
              <MenuOptionGroup
                defaultValue="todas"
                title="Filtrar por categorias:"
                type="radio"
                onChange={(e) => handleFilter(e)}
              >
                <MenuItemOption value="todas">Ver todos</MenuItemOption>
                {categories.map((category) => (
                  <MenuItemOption key={category.id} value={category.name}>
                    {category.name}
                  </MenuItemOption>
                ))}
              </MenuOptionGroup>
            </MenuList>
          </Menu>
          <LinkNews />
        </Flex>
        <Divider mb="5" mt="5" />
        <Table size="md" variant="striped">
          <Thead>
            <Tr>
              <Th textAlign="center">Nombre</Th>
              <Th textAlign="center">Imagen</Th>
              <Th textAlign="center">Fecha de creacion</Th>
              <Th textAlign="center">Accion</Th>
            </Tr>
          </Thead>
          <Tbody>
            {newsList?.length > 0
              ? newsFiltered.map((news, index) => (
                <Tr key={index}>
                  <Td textAlign="center">{news.name}</Td>
                  <Td>
                    <AspectRatio maxW="100px" ratio={4 / 3}>
                      <Image
                        alt="Image Card"
                        fallbackSrc="../images/placeholder/100x100.png"
                        objectFit="cover"
                        src={news.image}
                      />
                    </AspectRatio>
                  </Td>
                  <Td textAlign="center">{new Date(news.created_at).toLocaleString()}</Td>
                  <Td textAlign="center">
                    <Button
                      colorScheme="green"
                      rightIcon={<EditIcon />}
                      title={`Editar ${news.name}`}
                      onClick={() => handleEditOpen(news)}
                    >
                      Editar
                    </Button>
                    <Button
                      colorScheme="red"
                      m="2"
                      rightIcon={<DeleteIcon />}
                      title={`Borrar ${news.name}`}
                      onClick={() => handleDelete(news.id)}
                    >
                      Borrar
                    </Button>
                  </Td>
                </Tr>
              ))
              : null}
          </Tbody>
        </Table>
        {newsFiltered?.length < 1 ? (
          <Stack
            alignItems="center"
            direction="row"
            height="100%"
            justifyContent="center"
            width="100%"
          >
            <SpinnerComponent />
          </Stack>
        ) : null}
        <ModalEdit isEditOpen={isEditOpen} setIsEditOpen={setIsEditOpen}>
          <NewsForm news={toEditNew} setIsEditOpen={setIsEditOpen} />
        </ModalEdit>
      </Flex>
    </Flex>
  );
};

export default NewsList;
