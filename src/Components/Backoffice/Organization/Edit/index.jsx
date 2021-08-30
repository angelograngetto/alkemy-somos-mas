import React, { useEffect, useState } from 'react';
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
  const [organizationData, setOrganizationData] = useState({});
  const fetchData = async () => {
    try {
      const resp = await OrganizationService.get();
      setOrganizationData(resp.data);
    } catch (err) {
      Alert(
        'error',
        'Error',
        'Ocurrió un error al traer la información solicitada, por favor comprueba tu conexión a internet o vuélvelo a intentar más tarde',
      );
    }
  };
  useEffect(() => {
    fetchData();
  });

  const validationSchema = Yup.object({
    name: Yup.string().required('El nombre es requerido.'),
    file: Yup.mixed().required('La imágen es requerida.'),
    shortDesc: Yup.string().required('Descripción corta es requerida.'),
    longDesc: Yup.string().required('Descripción larga es requerida.'),
    email: Yup.string().email(
      'Debe ser un email válido, recuerda usar "@gmail.com", "@hotmail.com" u otro',
    ),
    instagram: Yup.string().url(
      'Instagram debe tener una URL válida, recuerda usar "https://" al inicio',
    ),
    facebook: Yup.string().url(
      'Facebook debe tener una URL válida, recuerda usar "https://" al inicio',
    ),
    linkedin: Yup.string().url(
      'LinkedIn debe tener una URL válida, recuerda usar "https://" al inicio',
    ),
  });

  return (
    <Flex align="center" justify="center" minH="100vh" p={{ base: 0, sm: 0, lg: 5 }}>
      <Flex
        borderRadius={{ base: '0', sm: '0', lg: 'xl' }}
        borderWidth="1px"
        boxShadow="2xl"
        flexDir="column"
        justify="center"
        overflow="hidden"
        p={{ base: 1, sm: 3, lg: 5 }}
        w="5xl"
      >
        <Box
          isTruncated
          as="h1"
          fontSize="xx-large"
          fontWeight="semibold"
          lineHeight="tall"
          mb="5"
          mt="1"
        >
          Editar información de la organización
        </Box>
        <Divider mb="5" />
        <Formik
          validateOnBlur
          enableReinitialize={true}
          initialValues={{
            name: organizationData?.name ?? '',
            file: '',
            shortDesc: organizationData?.short_description ?? '',
            longDesc: organizationData?.long_description ?? '',
            email: organizationData?.address ?? '',
            instagram: organizationData?.instagram_url ?? '',
            facebook: organizationData?.facebook_url ?? '',
            linkedin: organizationData?.linkedin_url ?? '',
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
                  <FormControl isRequired isInvalid={form.errors.name && form.touched.name} mb="7">
                    <FormLabel htmlFor="name">Nombre</FormLabel>
                    <Input
                      {...field}
                      id="name"
                      placeholder="Coloque el nombre de la ONG aquí"
                      title="Ingresa el nombre"
                    />
                    <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Field name="file">
                {({ field, form }) => (
                  <FormControl isRequired isInvalid={form.errors.file && form.touched.file} mb="7">
                    <FormLabel htmlFor="file">Imagen</FormLabel>
                    <Input
                      {...field}
                      accept="image/*"
                      id="file"
                      name="file"
                      placeholder="Elige una imágen"
                      size="lg"
                      title="Busca en tus archivos tu imagen"
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
                    <FormLabel htmlFor="shortDesc">Descripción corta</FormLabel>
                    <Input
                      {...field}
                      id="shortDesc"
                      placeholder="Descripción corta"
                      title="Ingresa aqui la descripción corta"
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
                    <FormLabel htmlFor="longDesc">Descripción larga</FormLabel>
                    <CKEditor
                      {...field}
                      id="longDesc"
                      name="longDesc"
                      title="Coloque su descripción aquí"
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
                        placeholder="ejemplo@email.com"
                        title="Ingresa el email aquí"
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
                        placeholder="https://instagram.com/su_usuario"
                        title="Ingresa tu instagram aquí"
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
                        placeholder="https://facebook.com/su_usuario"
                        title="Ingresa el Facebook aquí"
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
                    <FormLabel htmlFor="linkedin">Linkedin</FormLabel>
                    <InputGroup>
                      <InputLeftAddon>
                        <FaLinkedinIn />
                      </InputLeftAddon>
                      <Input
                        {...field}
                        id="linkedin"
                        name="linkedin"
                        pattern="https://.*"
                        placeholder="https://linkedin.com/in/su_usuario"
                        title="Ingresa el linkedin aquí"
                        type="url"
                      />
                    </InputGroup>
                    <FormErrorMessage>{form.errors.linkedin}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Button
                colorScheme="green"
                isLoading={props.isSubmitting}
                mt="4"
                rightIcon={<FaCheck />}
                title="Guardar información"
                type="submit"
              >
                Guardar
              </Button>
            </Form>
          )}
        </Formik>
      </Flex>
    </Flex>
  );
};

export default Edit;
