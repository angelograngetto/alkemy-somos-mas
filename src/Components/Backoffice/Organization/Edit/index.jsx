import React from 'react';
import * as Yup from 'yup';
import CKEditor from 'ckeditor4-react';
import { Formik, Form, Field } from 'formik';
import { FaRegEnvelope, FaInstagram, FaFacebookF, FaLinkedinIn, FaCheck } from 'react-icons/fa';
import {
  Flex,
  Box,
  Divider,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  InputGroup,
  InputLeftAddon,
} from '@chakra-ui/react';
import OrganizationService from '../../../../Services/OrganitationService';
import Alert from '../../../Utils/Alert';

const Edit = (props) => {
  /*   let { name, file, shortDesc, longDesc, email, instagram, facebook, linkedin } = props;
   */
  const validationSchema = Yup.object({
    name: Yup.string().required('The name is Required'),
    file: Yup.mixed().required('Image is Required'),
    shortDesc: Yup.string().required('Short description is Required'),
    longDesc: Yup.string().required('Long Description is Required'),
    email: Yup.string().email(
      'Email must be a valid email, remember to use "@gmail.com", "@hotmail.com" or an other',
    ),
    instagram: Yup.string().url(
      'Instagram must be a valid URL / Link, remeber to use "https://" at the start',
    ),
    facebook: Yup.string().url(
      'Facebook must be a valid URL / Link, remeber to use "https://" at the start',
    ),
    linkedin: Yup.string().url(
      'Linkedin must be a valid URL / Link, remeber to use "https://" at the start',
    ),
  });

  return (
    <Flex align="center" justify="center" minH="100vh" p="5">
      <Box borderRadius="lg" borderWidth="1px" maxW="3xl" overflow="hidden">
        <Box p="6">
          <Box
            isTruncated
            as="h1"
            fontSize="xx-large"
            fontWeight="semibold"
            lineHeight="tall"
            mb="5"
            mt="1"
          >
            Edit information
          </Box>
          <Divider mb="5" />
          <Formik
            validateOnBlur
            initialValues={{
              name: props.name || '',
              file: props.file || '',
              shortDesc: props.shortDesc || '',
              longDesc: props.longDesc || '',
              email: props.email || '',
              instagram: props.instagram || '',
              facebook: props.facebook || '',
              linkedin: props.linkedin || '',
            }}
            validationSchema={validationSchema}
            onSubmit={async (values, actions) => {
              try {
                const organization = { ...values };
                organization.id = props.id;
                const response = await OrganizationService.edit(organization);
                const responseAlert = await Alert(
                  'success',
                  'Operación satisfactoria',
                  `La organización se editó correctamente a ${organization.name}`,
                );
              } catch (error) {
                // eslint-disable-next-line no-console
                const responseAlert = await Alert(
                  'error',
                  'Ocurrió un error',
                  'Comprueba tu conexión a internet o inténtalo nuevamente más tarde',
                );
              } finally {
                actions.setSubmitting(false);
              }
            }}
          >
            {(props) => (
              <Form noValidate align="right" display="flex">
                <Field name="name">
                  {({ field, form }) => (
                    <FormControl
                      isRequired
                      isInvalid={form.errors.name && form.touched.name}
                      mb="7"
                    >
                      <FormLabel htmlFor="name">Name</FormLabel>
                      <Input {...field} id="name" placeholder="Name" title="Put here the name" />
                      <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name="file">
                  {({ field, form }) => (
                    <FormControl
                      isRequired
                      isInvalid={form.errors.file && form.touched.file}
                      mb="7"
                    >
                      <FormLabel htmlFor="file">Image</FormLabel>
                      <Input
                        {...field}
                        accept="image/*"
                        id="file"
                        name="file"
                        placeholder="Chooise a image"
                        size="lg"
                        title="Browse in your files to chooise an image"
                        type="file"
                      />
                      <FormErrorMessage>{form.errors.file}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name="shortDesc">
                  {({ field, form }) => (
                    <FormControl
                      isRequired
                      isInvalid={form.errors.shortDesc && form.touched.shortDesc}
                      mb="7"
                    >
                      <FormLabel htmlFor="shortDesc">Short Description</FormLabel>
                      <Input
                        {...field}
                        id="shortDesc"
                        placeholder="Short Description"
                        title="Put here your short description"
                      />
                      <FormErrorMessage>{form.errors.shortDesc}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name="longDesc">
                  {({ field, form, setTouched, setFieldValue }) => (
                    <FormControl
                      isRequired
                      isInvalid={form.errors.longDesc && form.touched.longDesc}
                      mb="7"
                    >
                      <FormLabel htmlFor="longDesc">Long Description</FormLabel>
                      <CKEditor
                        {...field}
                        id="longDesc"
                        name="longDesc"
                        title="Put your description here"
                        value={props.values.longDesc}
                        onBlur={(e) => props.setFieldValue('longDesc', e.editor.getData())}
                        onChange={(e) => props.setFieldValue('longDesc', e.editor.getData())}
                      />
                      <FormErrorMessage>{form.errors.longDesc}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name="email">
                  {({ field, form }) => (
                    <FormControl isInvalid={form.errors.email && form.touched.email} mb="7">
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <InputGroup>
                        <InputLeftAddon>
                          <FaRegEnvelope />
                        </InputLeftAddon>
                        <Input
                          {...field}
                          id="email"
                          name="email"
                          placeholder="example@email.com"
                          title="Put your email link here"
                          type="email"
                        />
                      </InputGroup>
                      <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name="instagram">
                  {({ field, form }) => (
                    <FormControl isInvalid={form.errors.instagram && form.touched.instagram} mb="7">
                      <FormLabel htmlFor="instagram">Instagram</FormLabel>
                      <InputGroup>
                        <InputLeftAddon>
                          <FaInstagram />
                        </InputLeftAddon>
                        <Input
                          {...field}
                          id="instagram"
                          name="instagram"
                          pattern="https://.*"
                          placeholder="https://instagram.com/your_user"
                          title="Put your Instagram link here"
                          type="url"
                        />
                      </InputGroup>
                      <FormErrorMessage>{form.errors.instagram}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name="facebook">
                  {({ field, form }) => (
                    <FormControl isInvalid={form.errors.facebook && form.touched.facebook} mb="7">
                      <FormLabel htmlFor="facebook">Facebook</FormLabel>
                      <InputGroup>
                        <InputLeftAddon>
                          <FaFacebookF />
                        </InputLeftAddon>
                        <Input
                          {...field}
                          id="facebook"
                          name="facebook"
                          pattern="https://.*"
                          placeholder="https://facebook.com/your_user"
                          title="Put your Facebook link here"
                          type="url"
                        />
                      </InputGroup>
                      <FormErrorMessage>{form.errors.facebook}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Field name="linkedin">
                  {({ field, form }) => (
                    <FormControl isInvalid={form.errors.linkedin && form.touched.linkedin} mb="7">
                      <FormLabel htmlFor="linkedin">linkedin</FormLabel>
                      <InputGroup>
                        <InputLeftAddon>
                          <FaLinkedinIn />
                        </InputLeftAddon>
                        <Input
                          {...field}
                          id="linkedin"
                          name="linkedin"
                          pattern="https://.*"
                          placeholder="https://linkedin.com/in/your_user"
                          title="Put your Linkedin link here"
                          type="url"
                        />
                      </InputGroup>
                      <FormErrorMessage>{form.errors.linkedin}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>

                <Button
                  colorScheme="teal"
                  isLoading={props.isSubmitting}
                  mt="4"
                  rightIcon={<FaCheck />}
                  type="submit"
                >
                  Submit
                </Button>
              </Form>
            )}
          </Formik>
        </Box>
      </Box>
    </Flex>
  );
};

export default Edit;
