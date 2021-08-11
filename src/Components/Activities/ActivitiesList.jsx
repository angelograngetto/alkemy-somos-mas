import React, { useEffect } from 'react';
import TitleComponent from '../Title/TitleComponent';
import ActivityContent from './ActivityContent';
import { Box, Flex, SimpleGrid } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchActivitiesList } from '../../features/activities/activitiesSlice';
import '../CardListStyles.css';

const ActivitiesList = () => {
  const dispatch = useDispatch();
  const { activitiesList, loading } = useSelector((state) => state.activities);

  useEffect(() => {
    dispatch(fetchActivitiesList());
  }, []);

  if (loading) return 'Loading...';

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
        {activitiesList.length > 0 ? (
          activitiesList.map((activity) => {
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
