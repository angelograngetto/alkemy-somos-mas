import React from 'react';
import { EmailIcon, InfoIcon, PhoneIcon } from '@chakra-ui/icons';
import {
  Textarea,
  Alert,
  InputGroup,
  InputLeftElement,
  Input,
  Stack,
  FormControl,
  Flex,
  FormLabel,
  Button,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import '../../Components/FormStyles.css';
import validationSchema from './ValidationSchema';
import '../FormStyles.css';
import ContactService from './ContactService';

const ContactForm = () => {
  const onSubmit = (e) => {
    e.preventDefault();
  };

  //INITIAL VALUES

  const initialValues = {
    name: '',
    email: '',
    phone: '',
    message: '',
    roleId: '',
  };

  //FORMIK INITIAL VALUES

  const formik = useFormik({
    initialValues: initialValues,
    validateOnBlur: true,
    onSubmit: async (values) => {
      const response = await ContactService.create(values);
    },
    validationSchema: validationSchema,
  });

  return (
    <>
      <Flex align="center" alignItems="center" direction="column" justify="center" margin="auto">
        <Flex
          align="center"
          h="100vh"
          justify="center"
          w={{ base: '400px', md: '600px', lg: '850px' }}
        >
          <form className="form-container" onSubmit={formik.handleSubmit}>
            <Stack spacing={3}>
              <FormControl isRequired rounded="sm">
                <FormLabel>Nombre</FormLabel>
                <InputGroup>
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
            </Stack>
          </form>
        </Flex>
      </Flex>
    </>
  );
};

export default ContactForm;
