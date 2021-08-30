import React from 'react';
import { EmailIcon, InfoIcon, PhoneIcon, CheckIcon } from '@chakra-ui/icons';
import {
  Textarea,
  Alert,
  InputGroup,
  InputLeftAddon,
  Input,
  FormControl,
  Box,
  FormLabel,
  Button,
  Text,
  VStack,
  HStack,
  Spacer,
  Heading,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import validationSchema from './ValidationSchema';
import ContactService from './ContactService';
import AlertComponent from '../Utils/Alert';

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
    <VStack py={{ sm: 4, md: 6, lg: 10 }}>
      <Heading as="h1" fontSize={{ sm: 24, md: 32, lg: 40 }} fontWeight="bold" textAlign="center">
        ¡Pongámonos en contacto!
      </Heading>

      <Box d="flex" flexDirection="column" w={{ sm: '95%', md: '80%', lg: '60%' }}>
        <form onSubmit={formik.handleSubmit}>
          <FormControl isRequired mt={{ sm: 3, md: 5, lg: 7 }} rounded="sm">
            <FormLabel>Nombre</FormLabel>
            <InputGroup title="Ingrese su nombre" width="100%">
              <InputLeftAddon>
                <InfoIcon />
              </InputLeftAddon>
              <Input
                name="name"
                placeholder="Manuel Belgrano"
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

          <FormControl isRequired mt={{ sm: 3, md: 5, lg: 7 }} rounded="sm">
            <FormLabel>Email</FormLabel>
            <InputGroup>
              <InputLeftAddon title="Ingrese su email">
                <EmailIcon />
              </InputLeftAddon>
              <Input
                name="email"
                placeholder="ejemplo@suemail.com"
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

          <FormControl isRequired mt={{ sm: 3, md: 5, lg: 7 }} rounded="sm">
            <FormLabel>Teléfono</FormLabel>
            <InputGroup>
              <InputLeftAddon alignItems="center" justify="center" title="Ingrese su teléfono">
                <PhoneIcon />
              </InputLeftAddon>
              <Input
                name="phone"
                placeholder="011 15 3899-9612"
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

          <FormControl isRequired mt={{ sm: 3, md: 5, lg: 7 }} rounded="sm">
            <FormLabel>Mensaje</FormLabel>
            <InputGroup title="Ingrese su mensaje">
              <Textarea
                name="message"
                placeholder="Escribe tu mensaje aquí..."
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

          <HStack my="5">
            <Spacer />
            <Button
              colorScheme="green"
              disabled={!formik.isValid}
              rightIcon={<CheckIcon />}
              title="Enviar mensaje"
              type="submit"
              variant="solid"
            >
              Enviar
            </Button>
          </HStack>
        </form>
      </Box>
    </VStack>
  );
};

export default ContactForm;
