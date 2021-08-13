import React, { useEffect, useState } from 'react';
import {
  AspectRatio,
  Box,
  Button,
  Image,
  Table,
  TableCaption,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';

import LinkNews from './LinkNews';
import NewsService from '../../Services/NewsService';
import Alert from '../Utils/Alert';
import ModalEdit from '../Backoffice/Utils/ModalEdit';
import NewsForm from './NewsForm';

const NewsList = () => {
  const [news, setNews] = useState([]);
  const fetchNews = async () => {
    try {
      const resp = await NewsService.getNews();
      setNews(resp.data.data);
    } catch (err) {
      alert(err);
    }
  };

  //MODAL EDIT
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [toEditNew, setToEditNew] = useState([]);
  const handleEditOpen = (newItem) => {
    setIsEditOpen(true);
    setToEditNew(newItem);
  };

  useEffect(() => {
    fetchNews();
  }, [isEditOpen]);

  const handleClick = async (id) => {
    const respAlert = await Alert(
      'confirm',
      '¿Estás seguro de querer eliminar esta novedad?',
      'Esta acción no se puede deshacer',
    );
    if (respAlert) {
      await NewsService.remove(id);
      await fetchNews();
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
            {news.length > 0 ? (
              news.map((news, index) => (
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
                    <Button backgroundColor="red.500" m="2" onClick={() => handleClick(news.id)}>
                      Borrar
                    </Button>
                  </Td>
                </Tr>
              ))
            ) : (
              <p>No hay novedades</p>
            )}
          </Tbody>
        </Table>
      </Box>

      <ModalEdit isEditOpen={isEditOpen} setIsEditOpen={setIsEditOpen}>
        <NewsForm news={toEditNew} />
      </ModalEdit>
    </Box>
  );
};

export default NewsList;
