import React, { useState } from 'react';
import { Formik } from 'formik';
import {
  Alert,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  Button,
  IconButton,
  Box,
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

const RegisterForm = () => {
  const [show, setShow] = useState(false);
  return (
    <Box borderRadius="md" borderWidth="1px" flex="1" m="auto" mt="80px" p="5" shadow="md" w="80%">
      <Heading align="center">Registro</Heading>
      <Formik
        initialValues={{ name: '', lastname: '', email: '', password: '', confirmPassword: '' }}
        // Inputs validation
        validate={(values) => {
          const errors = {};
          const { name, lastname, email, password, confirmPassword } = values;
          const regex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[.$,@$!|+¬%*?&/_()¡{}¿=#])/;
          if (!name) errors.name = 'Nombre requerido.';
          if (!lastname) errors.lastname = 'Apellido requerido.';
          if (!email) errors.email = 'Email requerido.';
          if (password.length < 6)
            errors.password = 'La contraseña debe tener más de 6 caracteres.';
          if (!regex.test(password))
            errors.password = 'Debe incluir al menos una letra, un número y un caracter.';
          if (password !== confirmPassword)
            errors.confirmPassword = 'Las contraseñas no son iguales.';
          return errors;
        }}
        onSubmit={({ name, lastname, email, password }) => {
          const data = {
            name: name + ' ' + lastname,
            email,
            password,
          };
          // send data to api here
        }}
      >
        {({ errors, handleChange, handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Text mb="8px">Tu nombre: </Text>
            <Input
              isInvalid={errors.name}
              name="name"
              placeholder="Ingresa tu nombre"
              onChange={handleChange}
            />
            {errors.name && (
              <Alert borderRadius="md" mt="8px" status="error">
                {errors.name}
              </Alert>
            )}
            <Text mb="8px" mt="8px">
              Tu apellido:
            </Text>
            <Input
              isInvalid={errors.lastname}
              name="lastname"
              placeholder="Ingresa tu apellido"
              onChange={handleChange}
            />
            {errors.lastname && (
              <Alert borderRadius="md" mt="8px" status="error">
                {errors.lastname}
              </Alert>
            )}
            <Text mb="8px" mt="8px">
              Tu email:
            </Text>
            <Input
              isInvalid={errors.Email}
              name="email"
              placeholder="Ingresa tu email"
              type="email"
              onChange={handleChange}
            />
            {errors.email && (
              <Alert borderRadius="md" mt="8px" status="error">
                {errors.email}
              </Alert>
            )}
            <Text mb="8px" mt="8px">
              Contraseña:
            </Text>
            <InputGroup size="md">
              <Input
                isInvalid={errors.password}
                name="password"
                placeholder="Ingresa tu contraseña"
                type={show ? 'text' : 'password'}
                onChange={handleChange}
              />
              <InputRightElement>
                <IconButton
                  icon={show ? <ViewOffIcon /> : <ViewIcon />}
                  variant="outline"
                  onClick={() => setShow(!show)}
                />
              </InputRightElement>
            </InputGroup>
            {errors.password && (
              <Alert borderRadius="md" mt="8px" status="error">
                {errors.password}
              </Alert>
            )}
            <Text mb="8px" mt="8px">
              Confirmar contraseña:
            </Text>
            <Input
              isInvalid={errors.confirmPassword}
              name="confirmPassword"
              placeholder="Confirma tu contraseña"
              type={show ? 'text' : 'password'}
              onChange={handleChange}
            />
            {errors.confirmPassword && (
              <Alert borderRadius="md" mt="8px" status="error">
                {errors.confirmPassword}
              </Alert>
            )}
            <Button mt="8px" type="submit">
              Registrarme
            </Button>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default RegisterForm;
