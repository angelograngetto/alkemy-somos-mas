import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Flex,
  Divider,
  Text,
  Spacer,
  ButtonGroup,
  Button,
  Table,
  Thead,
  Tr,
  Td,
  Th,
  Tbody,
  Box,
} from '@chakra-ui/react';
import { EditIcon, CloseIcon } from '@chakra-ui/icons';
import { useHistory } from 'react-router-dom';
import CategoriesForm from '../../Categories/CategoriesForm';
import ModalEdit from '../Utils/ModalEdit';
import ModalDelete from '../Utils/ModalDelete';
import Error from '../Utils/Error';
import { fetchCategories, searchCategories } from '../../../features/categories/categoriesSlice';
import { SearchInput } from '../../Utils/SearchInput/SearchInput';

const CategoriesListScreen = () => {
  const dispatch = useDispatch();
  const [term, setTerm] = useState('');
  const [categoriesFiltered, setCategoriesFiltered] = useState([]);
  const { categories, status, error } = useSelector((state) => state.categories);
  const history = useHistory();

  const searchCategoriesList = async () => {
    if (term.length >= 3) {
      const response = await dispatch(searchCategories(term));
      setCategoriesFiltered(response.payload);
    } else {
      const response = await dispatch(fetchCategories());
      setCategoriesFiltered(response.payload);
    }
  };

  useEffect(() => {
    searchCategoriesList();
  }, [term]);

  // ↓↓↓ MODAL EDIT ↓↓↓ //
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [toEditCategorie, setToEditCategorie] = useState([]);
  const handleEditOpen = (categorie) => {
    setIsEditOpen(true);
    setToEditCategorie(categorie);
  };

  // ↓↓↓ MODAL DELETE ↓↓↓ //
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [toDeleteCategorie, setToDeleteCategorie] = useState([]);
  const handleDeleteOpen = (categorie) => {
    setIsDeleteOpen(true);
    setToDeleteCategorie(categorie);
  };

  const toCreate = () => history.push('/backoffice/categories/create');

  if (error) {
    return <Error error={error} />;
  } else {
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
              Categories
              <Spacer />
            </Text>
            <Box w="50%">
              <SearchInput
                placeholder="Buscar por nombre"
                onDebounce={(value) => {
                  setTerm(value);
                }}
              />
            </Box>
            <Button colorScheme="green" onClick={toCreate}>
              Create
            </Button>
          </Flex>
          <Divider mb="5" />
          <Table
            colorScheme="green"
            mb="5"
            size={{ base: 'sm', md: 'md', lg: 'lg' }}
            style={{ tableLayout: 'fixed' }}
            variant="striped"
          >
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th textAlign="center">Created at</Th>
                <Th textAlign="center">Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {categoriesFiltered.map((categorie) => (
                <Tr key={categorie.id}>
                  <Td lineHeight="10">{categorie.name}</Td>
                  <Td textAlign="center">{new Date(categorie.created_at).toLocaleDateString()}</Td>
                  <Td>
                    <ButtonGroup d="flex" justifyContent="center">
                      <Button
                        colorScheme="green"
                        size="xs"
                        onClick={() => handleEditOpen(categorie)}
                      >
                        <EditIcon />
                      </Button>
                      <Button
                        colorScheme="red"
                        size="xs"
                        onClick={() => handleDeleteOpen(categorie)}
                      >
                        <CloseIcon />
                      </Button>
                    </ButtonGroup>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Flex>
        <ModalDelete
          isDeleteOpen={isDeleteOpen}
          setIsDeleteOpen={setIsDeleteOpen}
          toDeleteComponent="categories"
          toDeleteObj={toDeleteCategorie}
        />

        <ModalEdit isEditOpen={isEditOpen} setIsEditOpen={setIsEditOpen}>
          <CategoriesForm categorie={toEditCategorie} />
        </ModalEdit>
      </Flex>
    );
  }
};

export default CategoriesListScreen;
