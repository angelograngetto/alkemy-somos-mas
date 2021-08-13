import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMembers, deleteMember } from '../../features/members/membersSlice';
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Image,
  Box,
  Button,
  Heading,
  Text,
} from '@chakra-ui/react';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';

export const MemberList = () => {
  const { membersList } = useSelector((state) => state.members);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchMembers());
  }, []);

  const handleEdit = (id) => {
    history.push(`/backoffice/organization/edit/${id}`);
  };

  const handleDelete = async (id) => {
    dispatch(deleteMember(id));
  };

  return (
    <>
      <Box m="auto" mb="10px" mt="25px" w="85%">
        <Heading align="center" mb="20px">
          Lista de miembros
        </Heading>
        <Link to="/backoffice/members/create">
          <Button>Crear nuevo miembro</Button>
        </Link>
      </Box>
      <Box borderRadius="md" borderWidth="1px" m="auto" shadow="md" w="85%">
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
                      boxSize="80px"
                      fit="cover"
                      m="auto"
                      src={member.image}
                    />
                  </Td>
                  <Td textAlign="center">{member.name}</Td>
                  <Td textAlign="center">
                    <Button
                      backgroundColor="yellow.200"
                      m="1"
                      title="Editar"
                      onClick={() => handleEdit(member.id)}
                    >
                      <EditIcon />
                    </Button>
                    <Button
                      backgroundColor="red.500"
                      title="Eliminar"
                      onClick={() => handleDelete(member.id)}
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
      </Box>
    </>
  );
};

export default MemberList;
