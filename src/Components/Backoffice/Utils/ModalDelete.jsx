import React from 'react';
import axios from 'axios';
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

const ModalDelete = ({ isDeleteOpen, setIsDeleteOpen, toDeleteObj, toDeleteComponent }) => {
  const toast = useToast();
  const toDelDescHTML = toDeleteObj.description || '';
  const plainStrToDelDesc = toDelDescHTML.replace(/<[^>]+>/g, '') || '';

  const onDelete = (toDeleteObj) => {
    async function deleteComponent() {
      await axios
        .delete(`http://ongapi.alkemy.org/api/${toDeleteComponent}/${toDeleteObj.id}`)
        .then((res) => {
          setIsDeleteOpen(false);
          toast({
            title: `${toDeleteObj.name} has been successfully removed`,
            status: 'success',
            duration: 3000,
            isClosable: true,
          });
        })
        .catch((error) =>
          toast({
            title: `Error on delete ${toDeleteObj.name}`,
            description: error.message,
            status: 'error',
            duration: 9000,
            isClosable: true,
          }),
        );
    }
    deleteComponent();
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
