import React, { useState, useEffect } from 'react';
import ActivitiesService from '../../../Services/ActivitiesService';
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
import ModalDelete from '../../Backoffice/Utils/ModalDelete';
import ModalEdit from '../../Backoffice/Utils/ModalEdit';
import Error from '../../Backoffice/Utils/Error';
import ActivitiesForm from '../ActivitiesForm';

const ActivitiesListBack = () => {
  const [activities, setActivities] = useState([]);
  const [error, setError] = useState('');

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
    const getActivities = async () => {
      try {
        const resp = await ActivitiesService.getActivities();
        setActivities(resp.data.data);
      } catch (error) {
        setActivities([]);
        setError(error);
      }
    };
    getActivities();
  }, [isDeleteOpen, isEditOpen]);

  if (error) {
    return <Error error={error} />;
  } else {
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
              {activities.length > 0 ? (
                activities.map((activity, index) => (
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
              ) : (
                <p>No hay novedades</p>
              )}
            </Tbody>
          </Table>
        </Box>
        <ModalDelete
          isDeleteOpen={isDeleteOpen}
          setIsDeleteOpen={setIsDeleteOpen}
          toDeleteComponent="activities"
          toDeleteObj={toDeleteActivity}
        />

        <ModalEdit isEditOpen={isEditOpen} setIsEditOpen={setIsEditOpen}>
          <ActivitiesForm activity={toEditActivity} />
        </ModalEdit>
      </Box>
    );
  }
};

export default ActivitiesListBack;
