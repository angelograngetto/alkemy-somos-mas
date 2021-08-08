import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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

const MEMBERS = [
  {
    id: 1,
    name: 'Mariela Perez',
    image:
      'https://www.dzoom.org.es/wp-content/uploads/2020/02/portada-foto-perfil-redes-sociales-consejos.jpg',
  },
  {
    id: 2,
    name: 'Juan Perez',
    image:
      'https://st.depositphotos.com/1224365/2408/i/600/depositphotos_24084839-stock-photo-portrait-of-a-normal-boy.jpg',
  },
  {
    id: 3,
    name: 'Eliana',
    image:
      'https://img.freepik.com/foto-gratis/mujer-hermosa-joven-mirando-camara-chica-moda-verano-casual-camiseta-blanca-pantalones-cortos-hembra-positiva-muestra-emociones-faciales-modelo-divertido-aislado-amarillo_158538-15796.jpg?size=626&ext=jpg',
  },
];

export const MemberList = () => {
  const [members, setMembers] = useState(MEMBERS);

  const handleEdit = (id) => {
    // Edit member here
  };

  const handleDelete = (id) => {
    // Delete member here
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
        {members.length > 0 ? (
          <Table w="100%">
            <Thead>
              <Tr>
                <Th textAlign="center">Imagen</Th>
                <Th textAlign="center">Nombre</Th>
                <Th textAlign="center">Acciones</Th>
              </Tr>
            </Thead>
            <Tbody>
              {members.map((member) => (
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
