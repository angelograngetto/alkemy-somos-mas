import React, { useState, useEffect } from 'react';
import SlidesForm from '../../Slides/SlidesForm';
import { useHistory } from 'react-router-dom';
import ModalEdit from '../Utils/ModalEdit';
import axios from 'axios';
import { Flex, Divider, Text, Spacer, ButtonGroup, Button, Box } from '@chakra-ui/react';
import { EditIcon, CloseIcon } from '@chakra-ui/icons';
import Error from '../Utils/Error';
import ModalDelete from '../Utils/ModalDelete';

const SlidesListScreen = () => {
  const [slides, setSlides] = useState([]);
  const [error, setError] = useState('');
  const history = useHistory();

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
    async function getSlides() {
      await axios
        .get('http://ongapi.alkemy.org/api/slides')
        .then(function (response) {
          setSlides(response.data.data);
        })
        .catch(function (error) {
          setError(error);
        });
    }
    getSlides();
  }, [isDeleteOpen, isEditOpen]);

  const toCreate = () => history.push('/backoffice/slides/create');

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
              Slides
              <Spacer />
            </Text>
            <Button colorScheme="green" onClick={toCreate}>
              Create
            </Button>
          </Flex>
          <Divider mb="5" />
          <Flex wrap="wrap">
            {slides.map((slide) => (
              <Box key={slide.id} d="flex" flexGrow="2" m="5" minWidth="275px">
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
                  />
                  <Flex
                    align="center"
                    bgColor="gray.300"
                    borderBottomRadius="md"
                    boxShadow="xl"
                    p="2"
                  >
                    <Text>
                      {slide.name} - Order: {slide.order}
                    </Text>
                    <Spacer />
                    <ButtonGroup d="flex" justifyContent="center">
                      <Button colorScheme="green" size="xs" onClick={() => handleEditOpen(slide)}>
                        <EditIcon />
                      </Button>
                      <Button colorScheme="red" size="xs" onClick={() => handleDeleteOpen(slide)}>
                        <CloseIcon />
                      </Button>
                    </ButtonGroup>
                  </Flex>
                </Box>
              </Box>
            ))}
          </Flex>
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
