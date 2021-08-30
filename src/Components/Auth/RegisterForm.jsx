import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../features/auth/authSlice';
import { Formik } from 'formik';
import {
  Alert,
  Checkbox,
  Button,
  Container,
  FormControl,
  FormErrorMessage,
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
    <Container
      alignItems="center"
      bg="white"
      borderRadius="15px"
      borderWidth="1px"
      boxShadow="3px 1px 7px 2px #4c4c4c"
      flex="1"
      m="auto"
      marginBottom="50px"
      mt="80px"
      padding="80px"
      width={{ base: '90%', lg: '100%' }}
    >
      <Heading
        align="center"
        as="h1"
        fontSize={{ base: '2em', sm: '1.3em', lg: '2em' }}
        marginBottom="30px"
        marginTop="-20px"
      >
        REGISTRO
      </Heading>
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
        {({ errors, handleChange, handleSubmit, touched }) => (
          <form onSubmit={handleSubmit}>
            <FormControl isInvalid={touched.name && errors.name} my="2">
              <Text fontWeight="bold" mb="2">
                Nombre:
              </Text>
              <Input
                autoFocus
                backgroundColor="transparent"
                border="none"
                isInvalid={touched.name}
                name="name"
                outline="none"
                variant="flushed"
                onChange={handleChange}
              />
              <FormErrorMessage>
                <Alert borderRadius="md" mt="8px" status="error">
                  {errors.name}
                </Alert>
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={touched.lastname && errors.lastname} my="2">
              <Text fontWeight="bold" mt="15px">
                Apellido:
              </Text>
              <Input
                backgroundColor="transparent"
                border="none"
                isInvalid={touched.lastname}
                name="lastname"
                outline="none"
                variant="flushed"
                onChange={handleChange}
              />
              <FormErrorMessage>
                <Alert borderRadius="md" mt="15px" status="error">
                  {errors.lastname}
                </Alert>
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={touched.email && errors.email} my="2">
              <Text fontWeight="bold" mt="15px">
                Email:
              </Text>
              <Input
                backgroundColor="transparent"
                border="none"
                isInvalid={touched.email}
                name="email"
                outline="none"
                type="email"
                variant="flushed"
                onChange={handleChange}
              />
              <FormErrorMessage>
                <Alert borderRadius="md" mt="8px" status="error">
                  {errors.email}
                </Alert>
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={touched.password && errors.password} my="2">
              <Text fontWeight="bold" mt="15px">
                Contraseña:
              </Text>
              <InputGroup size="md">
                <Input
                  backgroundColor="transparent"
                  border="none"
                  isInvalid={touched.password}
                  name="password"
                  outline="none"
                  type={show ? 'text' : 'password'}
                  variant="flushed"
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

              <FormErrorMessage>
                <Alert borderRadius="md" mt="8px" status="error">
                  {errors.password}
                </Alert>
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={touched.confirmPassword && errors.confirmPassword} my="2">
              <Text fontWeight="bold" mt="15px">
                Confirmar Contraseña:
              </Text>
              <Input
                backgroundColor="transparent"
                border="none"
                isInvalid={touched.confirmPassword}
                name="confirmPassword"
                outline="none"
                type={show ? 'text' : 'password'}
                variant="flushed"
                onChange={handleChange}
              />

              <FormErrorMessage>
                <Alert borderRadius="md" mt="8px" status="error">
                  {errors.confirmPassword}
                </Alert>
              </FormErrorMessage>
            </FormControl>

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
              <Button backgroundColor="#6767ff" color="white" mt={16} type="submit" w="100%">
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
    </Container>
  );
};

export default RegisterForm;
