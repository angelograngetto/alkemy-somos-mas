import React from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  Button,
  Flex,
} from '@chakra-ui/react';

const ModalEdit = ({ children, isEditOpen, setIsEditOpen }) => {
  const onEditClose = () => setIsEditOpen(false);

  return (
    <AlertDialog isOpen={isEditOpen} size="full" onClose={onEditClose}>
      <AlertDialogContent m="0">
        <AlertDialogBody>
          <Flex alignContent="center" justifyContent="center">
            {children}
          </Flex>
        </AlertDialogBody>
        <AlertDialogFooter>
          <Button colorScheme="green" onClick={onEditClose}>
            Terminar de editar
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ModalEdit;
