import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EditIcon, DeleteIcon, AddIcon } from '@chakra-ui/icons';
import { Flex, Text, Spacer, ButtonGroup, Button, Box, Alert, AlertIcon } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import { getSlidesList } from '../../../features/slides/slidesSlice';
import { getSlidesSearched } from '../../../features/slides/slidesSlice';
import Spinner from '../../Spinner/SpinnerComponent';
import Error from '../Utils/Error';
import ModalEdit from '../Utils/ModalEdit';
import ModalDelete from '../Utils/ModalDelete';
import SlidesForm from '../../Slides/SlidesForm';
import { SearchInput } from '../../Utils/SearchInput/SearchInput';

const SlidesListScreen = () => {
  const [error] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();
  const { slidesList } = useSelector((state) => state.slides);
  const [toSearch, setToSearch] = useState('');

  // ↓↓↓ MODAL EDIT ↓↓↓ //
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [toEditSlide, setToEditSlide] = useState([]);
  const handleEditOpen = (slide) => {
    setIsEditOpen(true);
    setToEditSlide(slide);
  };

  // ↓↓↓ MODAL DELETE ↓↓↓ //
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [toDeleteSlide, setToDeleteSlide] = useState([]);
  const handleDeleteOpen = (slide) => {
    setIsDeleteOpen(true);
    setToDeleteSlide(slide);
  };

  useEffect(() => {
    if (toSearch.length > 2) {
      dispatch(getSlidesSearched(toSearch));
    } else {
      dispatch(getSlidesList());
    }
  }, [isDeleteOpen, isEditOpen, toSearch]);

  const toCreate = () => history.push('/backoffice/slides/create');

  if (slidesList.length < 1) {
    return (
      <Box alignItems="center" d="flex" justifyContent="center" minH="100vh">
        <Spinner />
      </Box>
    );
  }
  if (error) {
    return <Error error={error} />;
  } else {
    return (
      <Flex align="center" justify="center" minH="100vh" p={{ base: 0, sm: 0, md: 5 }}>
        <Flex
          borderRadius={{ base: 0, sm: 'xl' }}
          borderWidth="1px"
          boxShadow="2xl"
          flexDir="column"
          justify="center"
          overflow="hidden"
          p={{ base: 0, sm: 5 }}
          w="5xl"
        >
          <Flex align="center" justify="space-between" m={{ base: 3, sm: 0 }}>
            <Text isTruncated as="h1" fontSize="xx-large" fontWeight="semibold" lineHeight="tall">
              Diapositivas
            </Text>
            <Spacer />
            <Button colorScheme="green" title="Crear nuevo Slide" onClick={toCreate}>
              Nuevo <AddIcon ml="2" />
            </Button>
          </Flex>
          <SearchInput
            placeholder="Buscar por nombre"
            w="100%"
            onDebounce={(value) => setToSearch(value)}
          />
          {slidesList ? (
            <Flex wrap="wrap">
              {slidesList.map((slide) => (
                <Box
                  key={slide.id}
                  d="flex"
                  flexGrow="2"
                  m={{ base: 0, sm: 3, md: 5 }}
                  minWidth="275px"
                >
                  <Box w="100%">
                    <Box
                      alignItems="center"
                      bgImage={`url('${slide.image}')`}
                      bgPosition="center"
                      bgRepeat="no-repeat"
                      bgSize="cover"
                      borderTopRadius="xl"
                      boxShadow="xl"
                      h="150px"
                      src={slide.image}
                      title={`Diapositiva ${slide.name}, Orden ${slide.order}`}
                    />
                    <Flex
                      align="center"
                      bgColor="gray.300"
                      borderBottomRadius="md"
                      boxShadow="xl"
                      p="2"
                    >
                      <Text>
                        {slide.name} - Orden: {slide.order}
                      </Text>
                      <Spacer />
                      <ButtonGroup d="flex" justifyContent="center">
                        <Button
                          colorScheme="green"
                          size="xs"
                          title={`Editar ${slide.name}`}
                          onClick={() => handleEditOpen(slide)}
                        >
                          <EditIcon />
                        </Button>
                        <Button
                          colorScheme="red"
                          size="xs"
                          title={`Eliminar ${slide.name}`}
                          onClick={() => handleDeleteOpen(slide)}
                        >
                          <DeleteIcon />
                        </Button>
                      </ButtonGroup>
                    </Flex>
                  </Box>
                </Box>
              ))}
            </Flex>
          ) : (
            <Box alignItems="center" d="flex" flexDirection="column" justifyContent="center" m="4">
              <Alert
                alignItems="center"
                d="flex"
                flexDirection="column"
                justifyContent="center"
                status="error"
                textAlign="center"
              >
                <AlertIcon />
                Aún no hay diapositivas 😥 Crea uno nuevo!
              </Alert>
            </Box>
          )}
        </Flex>
        <ModalDelete
          isDeleteOpen={isDeleteOpen}
          setIsDeleteOpen={setIsDeleteOpen}
          toDeleteComponent="slides"
          toDeleteObj={toDeleteSlide}
        />

        <ModalEdit isEditOpen={isEditOpen} setIsEditOpen={setIsEditOpen}>
          <SlidesForm slide={toEditSlide} />
        </ModalEdit>
      </Flex>
    );
  }
};

export default SlidesListScreen;
