import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { FormControl, FormErrorMessage, Input } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import '../FormStyles.css';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { loginUser } from '../../features/auth/authSlice';

const LoginForm = () => {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();
  // Expresion regular para un número, una letra y un símbolo
  const passRegex = /^(?=.*[A-Za-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-])/;

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('direccion de email incorrecta').required('requerido'),
      password: Yup.string()
        .min(6, 'minimo 6 caracteres')
        .matches(passRegex, 'la contraseña debe contener un número, una letra y un símbolo')
        .required('requerido'),
    }),
    onSubmit: (values) => {
      const { email, password } = values;
      dispatch(loginUser({ email, password }));
      history.push(location?.state?.from?.pathname || '/');
    },
  });

  return (
    <form className="form-container" onSubmit={formik.handleSubmit}>
      <FormControl isInvalid={formik.touched.email && formik.errors.email}>
        <Input
          className="input-field"
          name="email"
          placeholder="Enter email"
          type="email"
          value={formik.values.email}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />

        <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
      </FormControl>

      <FormControl isInvalid={formik.touched.password && formik.errors.password}>
        <Input
          className="input-field"
          name="password"
          placeholder="Enter password"
          type="password"
          value={formik.values.password}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        ></Input>
        <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
      </FormControl>

      <Button className="" colorScheme="blue" type="submit">
        Log In
      </Button>
    </form>
  );
};

export default LoginForm;
