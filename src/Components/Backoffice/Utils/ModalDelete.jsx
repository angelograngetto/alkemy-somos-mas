import React from 'react';
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
  useToast,
} from '@chakra-ui/react';
import { useDispatch } from 'react-redux';
import { deleteActivity } from '../../../features/activities/activitiesSlice';
import { deleteSlide } from '../../../features/slides/slidesSlice';
import { deleteCategory } from '../../../features/categories/categoriesSlice';

const ModalDelete = ({ isDeleteOpen, setIsDeleteOpen, toDeleteObj, toDeleteComponent }) => {
  const toast = useToast();
  const dispatch = useDispatch();

  const toDelDescHTML = toDeleteObj.description || '';
  const plainStrToDelDesc = toDelDescHTML.replace(/<[^>]+>/g, '') || '';

  const onDelete = (toDeleteObj) => {
    switch (toDeleteComponent) {
      case 'slides':
        dispatch(deleteSlide(toDeleteObj.id));
        break;
      case 'activities':
        dispatch(deleteActivity(toDeleteObj.id));
        break;
      case 'categories':
        dispatch(deleteCategory(toDeleteObj.id));
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
          Do you want to delete {toDeleteObj.name}?
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
                      Information
                    </Td>
                  </Tr>
                </Thead>
                <Tbody>
                  <Tr>
                    <Td>Name:</Td>
                    <Td>{toDeleteObj.name}</Td>
                  </Tr>
                  <Tr>
                    <Td>Created at:</Td>
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
                      <Td>Description:</Td>
                      <Td>{plainStrToDelDesc}</Td>
                    </Tr>
                  )}
                  {!toDeleteObj.role_id ? null : (
                    <Tr>
                      <Td>Role:</Td>
                      <Td>{toDeleteObj.role_id === 1 ? 'Administrator' : 'Regular'}</Td>
                    </Tr>
                  )}
                  {!toDeleteObj.address ? null : (
                    <Tr>
                      <Td>Address:</Td>
                      <Td>{toDeleteObj.adress}</Td>
                    </Tr>
                  )}
                </Tbody>
              </Table>
            </Box>
          </Flex>
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button onClick={onDeleteClose}>Cancel</Button>
          <Button colorScheme="red" ml={3} onClick={() => onDelete(toDeleteObj)}>
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ModalDelete;
