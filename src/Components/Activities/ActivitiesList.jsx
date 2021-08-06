import React from 'react';
import TitleComponent from '../Title/TitleComponent';
import ActivityContent from './ActivityContent';
import '../CardListStyles.css';
import { Box, Flex, SimpleGrid } from '@chakra-ui/react';

const ActivitiesList = () => {
  const activitiesMock = [
    {
      id: 1,
      name: 'Actividad 1',
      image: 'http://ongapi.alkemy.org/storage/ROcLEJ3iTb.jpeg',
      description:
        '<p>Para todas las edades. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut quaerat molestias, nobis ipsum dolor, facere esse repudiandae exercitationem eos consectetur eum ipsam incidunt voluptate assumenda dolores. Eum, a. Nostrum, sapiente!.</p>',
    },
    {
      id: 2,
      name: 'Actividad 2',
      image: 'http://ongapi.alkemy.org/storage/ROcLEJ3iTb.jpeg',
      description:
        '<p>Para todas las edades. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut quaerat molestias, nobis ipsum dolor, facere esse repudiandae exercitationem eos consectetur eum ipsam incidunt voluptate assumenda dolores. Eum, a. Nostrum, sapiente!.</p>',
    },
    {
      id: 3,
      name: 'Actividad 3',
      image: 'http://ongapi.alkemy.org/storage/ROcLEJ3iTb.jpeg',
      description:
        '<p>Para todas las edades. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut quaerat molestias, nobis ipsum dolor, facere esse repudiandae exercitationem eos consectetur eum ipsam incidunt voluptate assumenda dolores. Eum, a. Nostrum, sapiente!.</p>',
    },
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
      <SimpleGrid columns={[1, 2, 3]} gap={12} mt={4}>
        {activitiesMock.length > 0 ? (
          activitiesMock.map((activity) => {
            return (
              <Box
                key={activity.id}
                alignItems="center"
                className="card-info"
                display="flex"
                justifyContent="center"
                w="300px"
              >
                <ActivityContent activity={activity} />
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
