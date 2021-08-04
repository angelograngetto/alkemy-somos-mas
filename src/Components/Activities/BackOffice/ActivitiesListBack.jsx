import React from 'react';

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

import LinkActivities from './LinkActivities';

const ActivitiesListBack = () => {
  const ActivitiesMock = [
    {
      name: 'Titulo de prueba 1',
      image: 'https://i.blogs.es/aa1b9a/luna-100mpx/450_1000.jpg',
      createdAt: new Date().toString(),
    },
    {
      name: 'Titulo de prueba 2',
      image: 'https://i.blogs.es/aa1b9a/luna-100mpx/450_1000.jpg',
      createdAt: new Date().toString(),
    },
    {
      name: 'Titulo de prueba 3',
      image: '',
      createdAt: new Date().toString(),
    },
  ];

  return (
    <Box mt="3">
      <Text fontSize={24} fontWeight="bold" textAlign="center">
        Listado de Actividades
      </Text>
      <Box m="5">
        <Table size="md" variant="striped">
          <TableCaption mb="2" placement="top">
            <LinkActivities />
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
            {ActivitiesMock.length > 0 ? (
              ActivitiesMock.map((activity, index) => (
                <Tr key={index}>
                  <Td textAlign="center">{activity.name}</Td>
                  <Td>
                    <AspectRatio maxW="100px" ratio={4 / 3}>
                      <Image
                        alt="Image Card"
                        fallbackSrc="../images/placeholder/100x100.png"
                        objectFit="cover"
                        src={activity.image}
                      />
                    </AspectRatio>
                  </Td>
                  <Td textAlign="center">{activity.createdAt}</Td>
                  <Td textAlign="center">
                    <Button backgroundColor="yellow">Editar</Button>
                    <Button backgroundColor="red.500" m="2">
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
    </Box>
  );
};

export default ActivitiesListBack;
