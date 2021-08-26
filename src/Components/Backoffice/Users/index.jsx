import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, searchedUsers, filteredUsers } from '../../../features/users/usersSlice';
import {
  Flex,
  Button,
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
  Select,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuOptionGroup,
  MenuItemOption,
  MenuDivider,
  Spacer,
} from '@chakra-ui/react';
import { AddIcon, ChevronLeftIcon, ChevronRightIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { FaBullseye, FaFilter } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import UserForm from '../../Users/UsersForm';
import Error from '../Utils/Error';
import ModalDelete from '../Utils/ModalDelete';
import ModalEdit from '../Utils/ModalEdit';
import { SearchInput } from '../../Utils/SearchInput/SearchInput';

const UsersListScreen = (props) => {
  const dispatch = useDispatch();
  const { usersList, error } = useSelector((state) => state.users);
  const [toSearch, setToSearch] = useState('');
  const history = useHistory();

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

  const handleFilter = (role) => {
    dispatch(filteredUsers({ keys: toSearch, role }));
    console.log(role);
  };

  useEffect(() => {
    if (toSearch.length >= 2) {
      dispatch(searchedUsers(toSearch));
    } else {
      dispatch(fetchUsers());
    }
  }, [isDeleteOpen, isEditOpen, toSearch]);

  if (error) {
    return <Error error={error} />;
  }
  return (
    <Flex align="center" justify="center" minH="100vh" p={{ base: 0, sm: 0, lg: 5 }}>
      <Flex
        borderRadius={{ base: '0', sm: '0', lg: 'xl' }}
        borderWidth="1px"
        boxShadow="2xl"
        flexDir="column"
        justify="center"
        overflow="hidden"
        p={{ base: 0, sm: 1, lg: 2 }}
        w="5xl"
      >
        <Flex align="center" flexWrap="wrap" justify="space-between" m={{ base: 3, sm: 0 }}>
          <Text isTruncated as="h1" fontSize="xx-large" fontWeight="semibold" lineHeight="tall">
            Usuarios
          </Text>
          <Spacer />
          <Menu closeOnSelect={false}>
            <MenuButton
              as={Button}
              colorScheme="blue"
              mr="2"
              rightIcon={<FaFilter />}
              title="Buscar y filtrar"
            >
              Buscar
            </MenuButton>
            <MenuList minWidth="230px">
              <Center pl="2" pr="2">
                <SearchInput
                  placeholder="Buscar por nombre"
                  w="90%"
                  onDebounce={(value) => setToSearch(value)}
                />
              </Center>
              <MenuOptionGroup
                defaultValue="0"
                title="Ver:"
                type="radio"
                onChange={(e) => handleFilter(e)}
              >
                <MenuItemOption value="0">Todos los usuarios</MenuItemOption>
                <MenuItemOption value="1">Usuarios administrativos</MenuItemOption>
                <MenuItemOption value="2">Usuarios regulares</MenuItemOption>
              </MenuOptionGroup>
            </MenuList>
          </Menu>
          <Button colorScheme="green" mr="2" title="Crear nuevo usuario" onClick={toCreate}>
            Nuevo <AddIcon ml="2" />
          </Button>
        </Flex>
        {usersList.length !== 0 ? (
          <Table
            colorScheme="green"
            mt="3"
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
                title="Ver los usuarios anteriores"
                w="100px"
                onClick={handlePrev}
              >
                <ChevronLeftIcon /> Anterior
              </Button>
              {`${prev === 0 ? 1 : prev} - ${next >= usersList.length ? usersList.length : next}`}
              <Button
                colorScheme="blue"
                isDisabled={next <= usersList.length - 1 ? false : true}
                m="3"
                title="Ver los usuarios siguientes"
                w="100px"
                onClick={handleNext}
              >
                Siguiente <ChevronRightIcon />
              </Button>
            </TableCaption>
            <Thead>
              <Tr>
                <Th>Nombre</Th>
                <Th>Email</Th>
                <Th textAlign="center">Acciones</Th>
              </Tr>
            </Thead>
            <Tbody>
              {usersList ? (
                usersList.slice(prev, next).map((user) => (
                  <Tr key={user.id}>
                    <Td lineHeight="10" title={`Nombre: ${user.name}`}>
                      {user.name}
                    </Td>
                    <Td title={`Email: ${user.email}`}>{user.email}</Td>
                    <Td w="2">
                      <ButtonGroup d="flex" justifyContent="center">
                        <Button
                          colorScheme="green"
                          size="xs"
                          title={`Editar a ${user.name}`}
                          onClick={() => handleEditOpen(user)}
                        >
                          <EditIcon />
                        </Button>
                        <Button
                          colorScheme="red"
                          size="xs"
                          title={`Eliminar a ${user.name}`}
                          onClick={() => handleDeleteOpen(user)}
                        >
                          <DeleteIcon />
                        </Button>
                      </ButtonGroup>
                    </Td>
                  </Tr>
                ))
              ) : (
                <Tr>
                  <Td colSpan="3" textAlign="center">
                    No hay datos...
                  </Td>
                </Tr>
              )}
            </Tbody>
          </Table>
        ) : (
          <>
            <Center flexDirection="column" m="5">
              <Text>Aun no hay usuarios 😢</Text>
              <Text>Cree uno nuevo!</Text>
            </Center>
          </>
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
