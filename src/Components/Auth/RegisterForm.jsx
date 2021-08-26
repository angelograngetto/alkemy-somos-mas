import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../features/auth/authSlice';
import { Formik } from 'formik';
import {
  Alert,
  Checkbox,
  Box,
  Button,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Text,
} from '@chakra-ui/react';
import Swal from 'sweetalert2';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import TermsPopup from './TermsPopup';

const RegisterForm = () => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const [isPopupVisible, setPopupVisible] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const openPopup = () => {
    setPopupVisible(true);
  };

  const closePopup = () => {
    setPopupVisible(false);
  };

  const handleCancel = () => {
    setPopupVisible(false);
    setTermsAccepted(false);
  };

  const acceptTerms = () => {
    setTermsAccepted(true);
    setPopupVisible(false);
  };

  const handleCheckChange = () => {
    setTermsAccepted(!termsAccepted);
  };

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
          if (!termsAccepted) {
            Swal.fire({
              title: 'Warning',
              text: 'You have to accept terms and conditions',
              icon: 'warning',
              confirmButtonText: 'Ok',
            });
            return;
          }
          const data = {
            name: `${name} ${lastname}`,
            email,
            password,
            role_id: 0,
          };
          dispatch(registerUser(data));
          history.push(location?.state?.from?.pathname || '/');
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
            <Stack alignItems="center" direction="row">
              <Checkbox
                isChecked={termsAccepted}
                isDisabled={!termsAccepted}
                marginY={5}
                onChange={handleCheckChange}
              ></Checkbox>
              <Text cursor="pointer" fontWeight="bold" onClick={openPopup}>
                Términos y Condiciones
              </Text>
            </Stack>

            <Stack direction="row" justifyContent="center">
              <Button mt={16} type="submit">
                Registrarme
              </Button>
            </Stack>
          </form>
        )}
      </Formik>
      <TermsPopup
        acceptTerms={acceptTerms}
        closePopup={closePopup}
        isPopupVisible={isPopupVisible}
        onCancel={handleCancel}
      />
    </Box>
  );
};

export default RegisterForm;
