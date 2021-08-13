import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers } from '../../../features/users/usersSlice';
import {
  Flex,
  Button,
  Divider,
  Text,
  Table,
  TableCaption,
  Thead,
  Tbody,
  Td,
  Tr,
  Th,
  ButtonGroup,
  Center,
} from '@chakra-ui/react';
import { ChevronLeftIcon, ChevronRightIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { useHistory } from 'react-router-dom';
import UserForm from '../../Users/UsersForm';
import Error from '../Utils/Error';
import ModalDelete from '../Utils/ModalDelete';
import ModalEdit from '../Utils/ModalEdit';

const UsersListScreen = (props) => {
  const dispatch = useDispatch();
  const { usersList, error } = useSelector((state) => state.users);

  const [next, setNext] = useState(10);
  const [prev, setPrev] = useState(0);
  const handlePrev = () => {
    setNext(next - 10);
    setPrev(prev - 10);
  };
  const handleNext = () => {
    setNext(next + 10);
    setPrev(prev + 10);
  };

  const history = useHistory();

  const toCreate = () => {
    history.push('/backoffice/users/create');
  };
  // ↓↓↓ MODAL EDIT ↓↓↓ //
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [toEditUser, setToEditUser] = useState([]);
  const handleEditOpen = (user) => {
    setIsEditOpen(true);
    setToEditUser(user);
  };

  // ↓↓↓ MODAL DELETE ↓↓↓ //
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [toDeleteUser, setToDeleteUser] = useState([]);
  const handleDeleteOpen = (user) => {
    setIsDeleteOpen(true);
    setToDeleteUser(user);
  };

  useEffect(() => {
    dispatch(fetchUsers());
  }, [isDeleteOpen, isEditOpen]);

  if (error) {
    return <Error error={error} />;
  }
  return (
    <Flex align="center" justify="center" minH="100vh" p={{ base: 0, sm: 5 }}>
      <Flex
        borderRadius={{ base: '0', sm: 'xl' }}
        borderWidth="1px"
        boxShadow="2xl"
        flexDir="column"
        justify="center"
        overflow="hidden"
        p={{ base: 1, sm: 5 }}
        w="5xl"
      >
        <Flex align="center" justify="space-between" m={{ base: 3, sm: 0 }}>
          <Text isTruncated as="h1" fontSize="xx-large" fontWeight="semibold" lineHeight="tall">
            Users - Total: {usersList.length}
          </Text>
          <Button colorScheme="green" onClick={toCreate}>
            Create
          </Button>
        </Flex>
        <Divider mb="5" />
        {usersList.length !== 0 ? (
          <Table
            colorScheme="green"
            size={{ base: 'sm', md: 'md', lg: 'lg' }}
            style={{ tableLayout: 'fixed' }}
            variant="striped"
          >
            {/* ↓↓↓ Pagination Buttons ↓↓↓ */}
            <TableCaption>
              <Button
                colorScheme="blue"
                isDisabled={prev >= 5 ? false : true}
                m="3"
                w="100px"
                onClick={handlePrev}
              >
                <ChevronLeftIcon /> Previous
              </Button>
              {`${prev === 0 ? 1 : prev} - ${next >= usersList.length ? usersList.length : next}`}
              <Button
                colorScheme="blue"
                isDisabled={next <= usersList.length - 1 ? false : true}
                m="3"
                w="100px"
                onClick={handleNext}
              >
                Next <ChevronRightIcon />
              </Button>
            </TableCaption>
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th textAlign="center">Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {usersList ? (
                usersList.slice(prev, next).map((user) => (
                  <Tr key={user.id}>
                    <Td lineHeight="10">{user.name}</Td>
                    <Td>{user.email}</Td>
                    <Td w="2">
                      <ButtonGroup d="flex" justifyContent="center">
                        <Button colorScheme="green" size="xs" onClick={() => handleEditOpen(user)}>
                          <EditIcon />
                        </Button>
                        <Button colorScheme="red" size="xs" onClick={() => handleDeleteOpen(user)}>
                          <DeleteIcon />
                        </Button>
                      </ButtonGroup>
                    </Td>
                  </Tr>
                ))
              ) : (
                <Tr>
                  <Td colSpan="3" textAlign="center">
                    No data...
                  </Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        ) : (
          <Center m="5">there are no users yet, create one!</Center>
        )}
      </Flex>
      <ModalDelete
        isDeleteOpen={isDeleteOpen}
        setIsDeleteOpen={setIsDeleteOpen}
        toDeleteComponent="users"
        toDeleteObj={toDeleteUser}
      />
      <ModalEdit isEditOpen={isEditOpen} setIsEditOpen={setIsEditOpen}>
        <UserForm user={toEditUser} />
      </ModalEdit>
    </Flex>
  );
};

export default UsersListScreen;
