import React, { useEffect, useState } from 'react';
import {
  AspectRatio,
  Box,
  Button,
  Image,
  Stack,
  Table,
  TableCaption,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchNewsList, deleteNews } from '../../features/news/newsSlice';
import LinkNews from './LinkNews';
import Alert from '../Utils/Alert';
import ModalEdit from '../Backoffice/Utils/ModalEdit';
import NewsForm from './NewsForm';
import { useHistory } from 'react-router-dom';

const NewsList = () => {
  const dispatch = useDispatch();
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [toEditNew, setToEditNew] = useState([]);
  const { newsList, loading } = useSelector((state) => state.news);

  useEffect(() => {
    const fetchNews = async () => {
      const response = await dispatch(fetchNewsList());

      if (response.error) {
        Alert('error', 'Algo salió mal', response.payload);
      }
    };
    fetchNews();
  }, []);

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
        Alert('success', 'Éxito', 'Novedad eliminada correctamente');
      }
    }
  };

  return (
    <Box mt="3">
      <Text fontSize={24} fontWeight="bold" textAlign="center">
        Listado de Novedades
      </Text>
      <Box m="5">
        <Table size="md" variant="striped">
          <TableCaption mb="2" placement="top">
            <LinkNews />
          </TableCaption>
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
              ? newsList.map((news, index) => (
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
                      <Button backgroundColor="yellow" onClick={() => handleEditOpen(news)}>
                        Editar
                      </Button>
                      <Button backgroundColor="red.500" m="2" onClick={() => handleDelete(news.id)}>
                        Borrar
                      </Button>
                    </Td>
                  </Tr>
                ))
              : null}
          </Tbody>
        </Table>
        {!loading && !newsList.length ? (
          <Stack
            alignItems="center"
            direction="row"
            height="100%"
            justifyContent="center"
            width="100%"
          >
            <Text textAlign="center">No hay novedades.</Text>
          </Stack>
        ) : null}
      </Box>

      <ModalEdit isEditOpen={isEditOpen} setIsEditOpen={setIsEditOpen}>
        <NewsForm news={toEditNew} setIsEditOpen={setIsEditOpen} />
      </ModalEdit>
    </Box>
  );
};

export default NewsList;
