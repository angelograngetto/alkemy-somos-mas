import React from 'react';
import TitleComponent from '../Title/TitleComponent';
import '../CardListStyles.css';
import { Box, Flex, SimpleGrid } from '@chakra-ui/react';

const ActivitiesList = () => {
  const activitiesMock = [
    { id: 2, name: 'Titulo de prueba', description: 'Descripcion de prueba' },
    { id: 1, name: 'Titulo de prueba', description: 'Descripcion de prueba' },
    { id: 3, name: 'Titulo de prueba', description: 'Descripcion de prueba' },
  ];

  return (
    <Flex alignItems="center" flexDirection="column" flexWrap="wrap" justifyContent="center">
      <Box
        alignItems="center"
        d="flex"
        fontSize="2em"
        fontWeight="bold"
        h="80px"
        justifyContent="center"
        w="100%"
      >
        <TitleComponent img="" text="ACTIVIDADES" />
      </Box>
      <SimpleGrid columns={[1, 2, 3]} gap={14} mt={4}>
        {activitiesMock.length > 0 ? (
          activitiesMock.map((activity) => {
            return (
              <Box key={activity.id} className="card-info" w="300px">
                <h3>{activity.name}</h3>
                <p>{activity.description}</p>
              </Box>
            );
          })
        ) : (
          <p>No hay actividades</p>
        )}
      </SimpleGrid>
    </Flex>
  );
};

export default ActivitiesList;
