import React, { useEffect, useState } from 'react';
import ActivitiesService from './ActivitiesService';
import TitleComponent from '../Title/TitleComponent';
import ActivityContent from './ActivityContent';
import '../CardListStyles.css';
import { Box, Flex, SimpleGrid } from '@chakra-ui/react';

const ActivitiesList = () => {
  const [activities, setActivities] = useState([]);
  useEffect(() => {
    const getActivities = async () => {
      try {
        const resp = await ActivitiesService.getActivities();
        setActivities(resp.data.data);
      } catch (error) {
        alert(error);
        setActivities([]);
      }
    };
    getActivities();
  }, []);

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
        {activities.length > 0 ? (
          activities.map((activity) => {
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
