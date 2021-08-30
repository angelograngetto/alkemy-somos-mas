import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import {
  FormControl,
  Alert as AlertMessage,
  FormErrorMessage,
  Text,
  Input,
  Button,
  Heading,
  Container,
  Box,
} from '@chakra-ui/react';
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
  const passRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[.$,@$!|+¬%*?&/_()¡{}¿=#])/;
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Email inválido, por favor, intente con otro')
        .required('Ingrese Email'),
      password: Yup.string()
        .min(6, 'Mínimo 6 carácteres')
        .matches(passRegex, 'La contraseña debe contener un número, una letra y un símbolo')
        .required('Ingrese Contraseña'),
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
    <Container
      alignItems="center"
      bg="white"
      borderRadius="15px"
      boxShadow="3px 1px 7px 2px #4c4c4c"
      display="flex"
      flexDirection="column"
      height="500px"
      justifyContent="center"
      margin="auto"
      padding="80px"
      width={{ base: '85%', lg: '400px' }}
    >
      <Heading as="h1" marginTop="-40px" my="2" size="lg">
        INGRESAR
      </Heading>
      <form style={{ padding: '30px', width: '300px' }} onSubmit={formik.handleSubmit}>
        <FormControl isInvalid={formik.touched.email && formik.errors.email} my="2">
          <Text fontWeight="bold" mb="3">
            Email:
          </Text>
          <Input
            autoFocus
            backgroundColor="transparent"
            border="none"
            className="input-field"
            marginTop="-30px"
            name="email"
            outline="none"
            type="email"
            value={formik.values.email}
            variant="flushed"
            onChange={formik.handleChange}
          />

          <FormErrorMessage>
            <AlertMessage borderRadius="md" status="error">
              {formik.errors.email}
            </AlertMessage>
          </FormErrorMessage>
        </FormControl>

        <FormControl isInvalid={formik.touched.password && formik.errors.password} my="2">
          <Text fontWeight="bold" marginTop="15px" mb="3">
            Contraseña:
          </Text>
          <Input
            backgroundColor="transparent"
            border="none"
            borderBottom="2px solid #adadad"
            className="input-field"
            name="password"
            outline="none"
            type="password"
            value={formik.values.password}
            variant="flushed"
            onChange={formik.handleChange}
          ></Input>
          <FormErrorMessage>
            <AlertMessage magtin borderRadius="md" status="error">
              {formik.errors.password}
            </AlertMessage>
          </FormErrorMessage>
        </FormControl>

        {status === 'loading' ? (
          <Box d="flex" justifyContent="center">
            <Button
              isLoading
              backgroundColor="#6767ff"
              color="white"
              loadingText="Enviando"
              marginTop="20px"
              w="100%"
            >
              Ingresar
            </Button>
          </Box>
        ) : (
          <Box d="flex" justifyContent="center">
            <Button backgroundColor="#6767ff" color="white" marginTop="30px" type="submit" w="100%">
              Ingresar
            </Button>
          </Box>
        )}
      </form>
    </Container>
  );
};

export default LoginForm;
