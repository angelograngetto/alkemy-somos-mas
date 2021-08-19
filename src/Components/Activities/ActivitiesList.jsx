import React, { useEffect, useState } from 'react';
import TitleComponent from '../Title/TitleComponent';
import ActivityContent from './ActivityContent';
import { Box, Flex, SimpleGrid, Alert as ChakraAlert, AlertIcon, Button } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchActivitiesList,
  searchActivitiesList,
} from '../../features/activities/activitiesSlice';
import ProgressBar from '../Utils/ProgressBar';
import '../CardListStyles.css';
import Alert from '../Utils/Alert';
import getError from '../Utils/HttpErrors';
import { SearchInput } from '../Utils/SearchInput/SearchInput';

const ActivitiesList = () => {
  const dispatch = useDispatch();
  const [term, setTerm] = useState('');
  const [activitiesFiltered, setActivitiesFiltered] = useState([]);
  const { activitiesList, searchResults, error, loading } = useSelector(
    (state) => state.activities,
  );

  useEffect(() => {
    dispatch(fetchActivitiesList());
  }, []);

  useEffect(() => {
    setActivitiesFiltered(activitiesList);
  }, [activitiesList]);

  useEffect(() => {
    if (term.length >= 3) {
      dispatch(searchActivitiesList(term));
    }
  }, [term]);

  useEffect(() => {
    setActivitiesFiltered(searchResults);
  }, [searchResults]);

  if (loading) return <ProgressBar colorScheme="blue" isIndeterminate={true} />;

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
      <SearchInput
        onDebounce={(value) => {
          setTerm(value);
        }}
      />
      <SimpleGrid columns={activitiesList.length > 0 ? [1, 2, 3] : [1, 1, 1]} gap={12} mt={4}>
        {activitiesList.length > 0 ? (
          activitiesFiltered.map((activity) => {
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
          <Box alignItems="center" d="flex" flexDirection="column" justifyContent="center" m="4">
            <ChakraAlert
              alignItems="center"
              d="flex"
              flexDirection="column"
              justifyContent="center"
              status="error"
              textAlign="center"
            >
              <AlertIcon />
              Ocurrió un error al visualizar las actividades, comprueba tu conexión a internet o
              inténtalo de nuevo.
            </ChakraAlert>
            <Button
              colorScheme="blue"
              my="2"
              variant="outline"
              w="fit-content"
              onClick={() => dispatch(fetchActivitiesList())}
            >
              Volver a intentar
            </Button>
          </Box>
        )}
      </SimpleGrid>
    </Flex>
  );
};

export default ActivitiesList;
