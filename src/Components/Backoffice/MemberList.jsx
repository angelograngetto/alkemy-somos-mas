import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMembers, searchedMembers } from '../../features/members/membersSlice';
import {
  Table,
  Thead,
  Tbody,
  Flex,
  Tr,
  Th,
  Td,
  Image,
  Button,
  Text,
  Spacer,
} from '@chakra-ui/react';
import { AddIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import ModalDelete from './Utils/ModalDelete';
import { SearchInput } from '../Utils/SearchInput/SearchInput';

export const MemberList = () => {
  const { membersList } = useSelector((state) => state.members);
  const dispatch = useDispatch();
  const history = useHistory();
  const [toSearch, setToSearch] = useState('');

  const handleEdit = (id) => {
    history.push(`/backoffice/organization/edit/${id}`);
  };

  // ↓↓↓ MODAL DELETE ↓↓↓ //
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [toDeleteUser, setToDeleteUser] = useState([]);
  const handleDeleteOpen = (user) => {
    setIsDeleteOpen(true);
    setToDeleteUser(user);
  };

  const toCreate = () => {
    history.push('/backoffice/members/create');
  };

  useEffect(() => {
    if (toSearch.length > 2) {
      dispatch(searchedMembers(toSearch));
    } else {
      dispatch(fetchMembers());
    }
  }, [dispatch, toSearch]);

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
        <Flex align="center" flexWrap="wrap" justify="space-between" m={{ base: 3, sm: 0 }}>
          <Text isTruncated as="h1" fontSize="xx-large" fontWeight="semibold" lineHeight="tall">
            Miembros
          </Text>
          <Spacer />
          <Button colorScheme="green" title="Crear nuevo Slide" onClick={toCreate}>
            Nuevo <AddIcon ml="2" />
          </Button>
        </Flex>
        <SearchInput
          placeholder="Buscar por nombre"
          w="100%"
          onDebounce={(value) => setToSearch(value)}
        />
        {membersList?.length > 0 ? (
          <Table w="100%">
            <Thead>
              <Tr>
                <Th textAlign="center">Imagen</Th>
                <Th textAlign="center">Nombre</Th>
                <Th textAlign="center">Acciones</Th>
              </Tr>
            </Thead>
            <Tbody>
              {membersList.map((member) => (
                <Tr key={member.id}>
                  <Td>
                    <Image
                      alt={member.name}
                      borderRadius="full"
                      boxShadow="md"
                      boxSize="80px"
                      fit="cover"
                      m="auto"
                      src={member.image}
                      title={`Imagen de: ${member.name}`}
                    />
                  </Td>
                  <Td textAlign="center" title={`Nombre: ${member.name}`}>
                    {member.name}
                  </Td>
                  <Td textAlign="center">
                    <Button
                      colorScheme="green"
                      m="1"
                      title="Editar"
                      onClick={() => handleEdit(member.id)}
                    >
                      <EditIcon />
                    </Button>
                    <Button
                      backgroundColor="red.500"
                      title="Eliminar"
                      onClick={() => handleDeleteOpen(member)}
                    >
                      <DeleteIcon color="#fff" />
                    </Button>
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        ) : (
          <Text align="center" p="10">
            No hay miembros registrados.
          </Text>
        )}
      </Flex>
      <ModalDelete
        isDeleteOpen={isDeleteOpen}
        setIsDeleteOpen={setIsDeleteOpen}
        toDeleteComponent="users"
        toDeleteObj={toDeleteUser}
      />
    </Flex>
  );
};

export default MemberList;
