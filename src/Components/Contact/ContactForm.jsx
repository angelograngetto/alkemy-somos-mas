import React from 'react';
import { EmailIcon, InfoIcon, PhoneIcon } from '@chakra-ui/icons';
import {
  Textarea,
  Alert,
  InputGroup,
  InputLeftElement,
  Input,
  FormControl,
  Box,
  FormLabel,
  Button,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import '../../Components/FormStyles.css';
import validationSchema from './ValidationSchema';
import '../FormStyles.css';
import ContactService from './ContactService';
import AlertComponent from '../Utils/Alert';
import styles from './contact.module.css';

const ContactForm = () => {
  //INITIAL VALUES
  const initialValues = {
    name: '',
    email: '',
    phone: '',
    message: '',
    roleId: '',
  };

  const formik = useFormik({
    initialValues: initialValues,
    validateOnBlur: true,
    onSubmit: async (values) => {
      try {
        const response = await ContactService.create(values);
        if (response.success === true) {
          AlertComponent(
            'success',
            'Mensaje Enviado',
            'Nos pondremos en contacto con usted a la brevedad',
          );
          formik.resetForm();
        }
      } catch (error) {
        AlertComponent('error', 'Error', 'Ups! Algo salió mal!');
      }
    },
    validationSchema: validationSchema,
  });

  return (
    <>
      <Box
        alignItems="center"
        bg="whitesmoke"
        borderRadius="15px"
        d="flex"
        justifyContent="center"
        marginBottom="50px"
        marginTop="30px"
        padding="20px"
      >
        <form className={styles.formContainer} onSubmit={formik.handleSubmit}>
          <FormControl isRequired rounded="sm">
            <FormLabel>Nombre</FormLabel>
            <InputGroup width="100%">
              <InputLeftElement>
                <InfoIcon />
              </InputLeftElement>
              <Input
                className="input-field"
                name="name"
                type="text"
                value={formik.values.name}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
            </InputGroup>
            {formik.touched.name && formik.errors.name ? (
              <Alert fontSize="md" status="warning" textAlign="center">
                {formik.errors.name}
              </Alert>
            ) : null}
          </FormControl>

          <FormControl isRequired rounded="sm">
            <FormLabel>Email</FormLabel>
            <InputGroup>
              <InputLeftElement>
                <EmailIcon />
              </InputLeftElement>
              <Input
                className="input-field"
                name="email"
                type="email"
                value={formik.values.email}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
            </InputGroup>
            {formik.touched.email && formik.errors.email ? (
              <Alert fontSize="md" status="warning">
                {formik.errors.email}
              </Alert>
            ) : null}
          </FormControl>

          <FormControl isRequired rounded="sm">
            <FormLabel>Teléfono</FormLabel>
            <InputGroup>
              <InputLeftElement alignItems="center" justify="center">
                <PhoneIcon />
              </InputLeftElement>
              <Input
                className="input-field"
                name="phone"
                type="number"
                value={formik.values.phone}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
            </InputGroup>
            {formik.touched.phone && formik.errors.phone ? (
              <Alert fontSize="md" status="warning" textAlign="center">
                {formik.errors.phone}
              </Alert>
            ) : null}
          </FormControl>

          <FormControl isRequired rounded="sm">
            <FormLabel>Mensaje</FormLabel>
            <InputGroup>
              <Textarea
                name="message"
                size="lg"
                type="text"
                value={formik.values.message}
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
              />
            </InputGroup>
            {formik.touched.message && formik.errors.message ? (
              <Alert fontSize="md" status="warning">
                {formik.errors.message}
              </Alert>
            ) : null}
          </FormControl>

          <Button
            className="submit-btn"
            colorScheme="#6767ff"
            disabled={!formik.isValid}
            type="submit"
            variant="solid"
          >
            Enviar
          </Button>
        </form>
      </Box>
    </>
  );
};

export default ContactForm;
