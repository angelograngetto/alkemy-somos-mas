import React, { useEffect, useState } from 'react';
import TitleComponent from '../Title/TitleComponent';
import ActivityContent from './ActivityContent';
import { Box, SimpleGrid, Alert as ChakraAlert, AlertIcon, Button } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchActivitiesList,
  searchActivitiesList,
} from '../../features/activities/activitiesSlice';
import ProgressBar from '../Utils/ProgressBar';
import '../CardListStyles.css';
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
    <>
      <TitleComponent
        img="https://cdn.discordapp.com/attachments/872973629376319500/881352780260966400/foto.png"
        text="ACTIVIDADES"
      />

      <SearchInput
        onDebounce={(value) => {
          setTerm(value);
        }}
      />
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 3 }}
        justifyItems="center"
        m={{ base: 1, md: 6 }}
        p="3"
        px="12"
        spacing={9}
      >
        {activitiesList.length > 0 ? (
          activitiesFiltered.map((activity) => {
            return (
              <Box
                key={activity.id}
                _hover={{ boxShadow: 'dark-lg' }}
                borderRadius="lg"
                borderWidth="1px"
                boxShadow="lg"
                m="3"
                overflow="hidden"
                p="3"
                w="100%"
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
    </>
  );
};

export default ActivitiesList;
