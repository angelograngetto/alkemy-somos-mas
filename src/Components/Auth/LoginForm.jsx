import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { FormControl, FormErrorMessage, Input, Button, Heading, Container } from '@chakra-ui/react';
import Alert from '../Utils/Alert';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../../features/auth/authSlice';

const LoginForm = () => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.auth);
  // Expresion regular para un número, una letra y un símbolo
  const passRegex = /^(?=.*[A-Za-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/;

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Email inválido, por favor, intente con otro')
        .required('Requerido'),
      password: Yup.string()
        .min(6, 'Mínimo 6 carácteres')
        .matches(passRegex, 'La contraseña debe contener un número, una letra y un símbolo')
        .required('Requerido'),
    }),
    onSubmit: (values) => {
      const { email, password } = values;
      dispatch(loginUser({ email, password })).then((resp) => {
        if (resp.error) {
          Alert('error', 'Fallo de sesión', 'Credenciales inválidas');
        } else {
          history.push(location?.state?.from?.pathname || '/');
        }
      });
    },
  });

  return (
    <Container>
      <Heading as="h1" my="2" size="lg">
        Iniciar sesión
      </Heading>
      <form onSubmit={formik.handleSubmit}>
        <FormControl isInvalid={formik.touched.email && formik.errors.email} my="2">
          <Input
            className="input-field"
            name="email"
            placeholder="Ingresa tu email"
            type="email"
            value={formik.values.email}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          />

          <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={formik.touched.password && formik.errors.password} my="2">
          <Input
            className="input-field"
            name="password"
            placeholder="Ingresa tu contraseña"
            type="password"
            value={formik.values.password}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
          ></Input>
          <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
        </FormControl>

        {status === 'loading' ? (
          <Button isLoading colorScheme="blue" loadingText="Enviando" my="2">
            Ingresar
          </Button>
        ) : (
          <Button colorScheme="blue" my="2" type="submit">
            Ingresar
          </Button>
        )}
      </form>
    </Container>
  );
};

export default LoginForm;
