import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteActivity } from '../../../features/activities/activitiesSlice';
import { deleteSlide } from '../../../features/slides/slidesSlice';
import { deleteCategory } from '../../../features/categories/categoriesSlice';
import { deleteUser } from '../../../features/users/usersSlice';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  Box,
  Button,
  Divider,
  Flex,
  Image,
  Table,
  Tbody,
  Td,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { deleteMember } from '../../../features/members/membersSlice';

const ModalDelete = ({ isDeleteOpen, setIsDeleteOpen, toDeleteObj, toDeleteComponent }) => {
  const dispatch = useDispatch();

  const toDelDescHTML = toDeleteObj.description || '';
  const plainStrToDelDesc = toDelDescHTML.replace(/<[^>]+>/g, '') || '';

  const onDelete = (toDeleteObj) => {
    switch (toDeleteComponent) {
      case 'users':
        dispatch(deleteUser(toDeleteObj.id));
        break;
      case 'slides':
        dispatch(deleteSlide(toDeleteObj.id));
        break;
      case 'activities':
        dispatch(deleteActivity(toDeleteObj.id));
        break;
      case 'categories':
        dispatch(deleteCategory(toDeleteObj.id));
      case 'members':
        dispatch(deleteMember(toDeleteObj.id));
      default:
        break;
    }

    setIsDeleteOpen(false);
  };

  const onDeleteClose = () => setIsDeleteOpen(false);
  return (
    <AlertDialog isOpen={isDeleteOpen} size="full" onEditClose={onDeleteClose}>
      <AlertDialogContent m="0">
        <AlertDialogHeader fontSize="x-large" fontWeight="bold" textAlign="center">
          Quiere eliminar {toDeleteObj.name}?
          <Divider />
        </AlertDialogHeader>
        <AlertDialogBody>
          <Flex flexWrap="wrap" justifyContent="center">
            <Box alignItems="center" d="flex" justifyContent="center">
              <Image
                borderRadius="full"
                boxShadow="lg"
                boxSize="200px"
                objectFit="cover"
                src={!toDeleteObj.image ? 'https://via.placeholder.com/200' : toDeleteObj.image}
              />
            </Box>
            <Box>
              <Table m={{ base: '1', sm: '5' }}>
                <Thead>
                  <Tr>
                    <Td colSpan="2" fontSize="xl" fontWeight="bold" textAlign="center">
                      Información
                    </Td>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>Nombre:</Td>
                    <Td>{toDeleteObj.name}</Td>
                  </Tr>
                  <Tr>
                    <Td>Creado el:</Td>
                    <Td>{new Date(toDeleteObj.created_at).toLocaleDateString()}</Td>
                  </Tr>
                  {!toDeleteObj.email ? null : (
                    <Tr>
                      <Td>Email:</Td>
                      <Td>{toDeleteObj.email}</Td>
                    </Tr>
                  )}
                  {!toDeleteObj.description ? null : (
                    <Tr>
                      <Td>Descripción:</Td>
                      <Td>{plainStrToDelDesc}</Td>
                    </Tr>
                  )}
                  {!toDeleteObj.role_id ? null : (
                    <Tr>
                      <Td>Rol:</Td>
                      <Td>{toDeleteObj.role_id === 1 ? 'Administrator' : 'Regular'}</Td>
                    </Tr>
                  )}
                  {!toDeleteObj.address ? null : (
                    <Tr>
                      <Td>Dirección:</Td>
                      <Td>{toDeleteObj.adress}</Td>
                    </Tr>
                  )}
                </Tbody>
              </Table>
            </Box>
          </Flex>
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button onClick={onDeleteClose}>Cancelar</Button>
          <Button colorScheme="red" ml={3} onClick={() => onDelete(toDeleteObj)}>
            Eliminar
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ModalDelete;
