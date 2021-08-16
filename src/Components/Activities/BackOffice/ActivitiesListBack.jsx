/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchActivitiesList } from '../../../features/activities/activitiesSlice';
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
import LinkActivities from './LinkActivities';
import ModalDelete from '../../Backoffice/Utils/ModalDelete';
import ModalEdit from '../../Backoffice/Utils/ModalEdit';
import ActivitiesForm from '../ActivitiesForm';

const ActivitiesListBack = () => {
  const dispatch = useDispatch();
  const { activitiesList, loading } = useSelector((state) => state.activities);

  // Modal Delete
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [toDeleteActivity, setToDeleteActivity] = useState([]);
  const handleDeleteOpen = (activity) => {
    setIsDeleteOpen(true);
    setToDeleteActivity(activity);
  };
  // Modal edit
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [toEditActivity, setToEditActivity] = useState([]);
  const handleEditOpen = (activity) => {
    setIsEditOpen(true);
    setToEditActivity(activity);
  };

  useEffect(() => {
    dispatch(fetchActivitiesList());
  }, [isDeleteOpen, isEditOpen]);

  if (loading) return 'Loading...';

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
            {activitiesList.length > 0
              ? activitiesList.map((activity, index) => (
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
                  <Td textAlign="center">{new Date(activity.created_at).toLocaleDateString()}</Td>
                  <Td textAlign="center">
                    <Button backgroundColor="yellow" onClick={() => handleEditOpen(activity)}>
                      Editar
                    </Button>
                    <Button
                      backgroundColor="red.500"
                      m="2"
                      onClick={() => handleDeleteOpen(activity)}
                    >
                      Borrar
                    </Button>
                  </Td>
                </Tr>
              ))
              : null}
          </Tbody>
        </Table>
        {!activitiesList.length && (
          <Stack direction="row" justifyContent="center" marginTop={5} width="100%">
            <Text textAlign="center">No hay novedades</Text>
          </Stack>
        )}
      </Box>
      <ModalDelete
        isDeleteOpen={isDeleteOpen}
        setIsDeleteOpen={setIsDeleteOpen}
        setIsEditOpen={setIsEditOpen}
        toDeleteComponent="activities"
        toDeleteObj={toDeleteActivity}
      />

      <ModalEdit isEditOpen={isEditOpen} setIsEditOpen={setIsEditOpen}>
        <ActivitiesForm activity={toEditActivity} setIsEditOpen={setIsEditOpen} />
      </ModalEdit>
    </Box>
  );
};
export default ActivitiesListBack;
