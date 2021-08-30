import React, { useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, createUser, updateUser } from '../../features/users/usersSlice';
import {
  FormControl,
  Input,
  FormErrorMessage,
  Select,
  Button,
  Alert as ChakraAlert,
  AlertIcon,
  Container,
  Box,
  Link,
} from '@chakra-ui/react';
import Alert from '../Utils/Alert';

const UsersForm = ({ user, setIsEditOpen }) => {
  const dispatch = useDispatch();
  const { usersList, loading } = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  // const convertBase64 = (file) => {
  //   if (file) {
  //     return new Promise((resolve, reject) => {
  //       const fileReader = new FileReader();
  //       fileReader.readAsDataURL(file);
  //       fileReader.onload = function () {
  //         resolve(fileReader.result);
  //       };
  //       fileReader.onerror = function () {
  //         reject(Error('Algo salió mal, vuelve a intentarlo'));
  //       };
  //     });
  //   }
  // };

  // const formatFileSupported = ['image/jpg', 'image/png', 'image/jpeg'];

  const usersEmail = usersList
    ?.filter((item) => item?.email !== user?.email)
    .map((item) => item?.email);

  const validationSchema = Yup.object().shape({
    name: Yup.string()
      .required('Campo requerido')
      .min(4, 'El nombre no puede tener menos de 4 carácteres'),
    email: Yup.string()
      .email('Ingresa un email válido')
      .required('Campo requerido')
      .test({
        name: 'uniqueEmail',
        exclusive: true,
        message: 'Este email ya fue utilizado, prueba con otro',
        test: (value) => !usersEmail.includes(value),
      }),
    password: Yup.string()
      .min(10, 'La contraseña no puede ser menor a 10 carácteres')
      .required('Campo requerido'),
    role: Yup.number().oneOf([0, 1], 'Este rol no existe').required('Rol requerido'),
    // profilePhoto: Yup.mixed()
    //   .required('Foto de perfil requerida')
    //   .test(
    //     'fileType',
    //     'Formato de imagen incorrecto, sólo se permite .png o .jpg',
    //     (value) => value?.originalImage && formatFileSupported.includes(value.originalImage?.type),
    //   ),
  });

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        name: user?.name ?? '',
        email: user?.email ?? '',
        password: user?.password ?? '',
        role: user?.roleId ?? 0,
        // profilePhoto: user?.profilePhoto ?? '',
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, actions) => {
        if (user && !user.id) return;
        const userData = {
          name: values.name,
          email: values.email,
          password: values.password,
          role_id: values.role,
        };
        if (user) {
          dispatch(updateUser({ ...userData, id: user.id })).then((resp) => {
            if (resp.error) {
              Alert(
                'error',
                'Error',
                'Hubo un error en la edición del usuario, inténtalo nuevamente',
              );
            }
            Alert('success', 'Operación exitosa', 'El usuario ha sido editado exitosamente');
            setIsEditOpen(false);
          });
        } else {
          dispatch(createUser(userData)).then((resp) => {
            if (resp.error) {
              Alert(
                'error',
                'Error',
                'Hubo un error en la creación del usuario, inténtalo nuevamente',
              );
            }
            Alert('success', 'Operación exitosa', 'El usuario ha sido creado exitosamente');
            actions.resetForm({
              values: {
                name: '',
                email: '',
                role: 0,
                password: '',
                // file: '',
              },
            });
          });
        }
      }}
    >
      {/* {({ setFieldValue, values, errors }) => ( */}
      <Container>
        <Form>
          <Box color="gray.900" fontSize="3xl" fontWeight="bold">
            {user ? 'Edición de usuario' : 'Creación de usuario'}
          </Box>
          {user && !user.id ? (
            <ChakraAlert my="2" status="error">
              <AlertIcon />
              <Link as={RouterLink} to="backoffice/users/create">
                Este usuario no existe, haz clic aquí para crearlo
              </Link>
            </ChakraAlert>
          ) : null}
          <Field name="name">
            {({ field, form, meta }) => (
              <FormControl isInvalid={form.errors.name && form.touched.name} my="2">
                <Input id="name" placeholder="Nombre completo" type="text" {...field} />
                {meta.touched && meta.error && <FormErrorMessage>{meta.error}</FormErrorMessage>}
              </FormControl>
            )}
          </Field>
          <Field name="email">
            {({ field, form, meta }) => (
              <FormControl isInvalid={form.errors.email && form.touched.email} my="2">
                <Input id="email" placeholder="Email" type="email" {...field} />
                {meta.touched && meta.error && <FormErrorMessage>{meta.error}</FormErrorMessage>}
              </FormControl>
            )}
          </Field>
          <Field name="password">
            {({ field, form, meta }) => (
              <FormControl isInvalid={form.errors.password && form.touched.password} my="2">
                <Input id="password" placeholder="Contraseña" type="password" {...field} />
                {meta.touched && meta.error && <FormErrorMessage>{meta.error}</FormErrorMessage>}
              </FormControl>
            )}
          </Field>
          <Field name="role">
            {({ field, form, meta }) => (
              <FormControl isInvalid={form.errors.role && form.touched.role} my="2">
                <Select id="role" {...field}>
                  <option value="0">Regular</option>
                  <option value="1">Administrador</option>
                </Select>
                {meta.touched && meta.error && <FormErrorMessage>{meta.error}</FormErrorMessage>}
              </FormControl>
            )}
          </Field>
          {/* <FormControl isInvalid={errors.profilePhoto}>
              <input
                id="profilePhoto"
                name="profilePhoto"
                type="file"
                onChange={async (event) => {
                  const imageFile = event.currentTarget.files[0];
                  const imageParsed = await convertBase64(imageFile);
                  setFieldValue('profilePhoto', {
                    originalImage: imageFile,
                    imageParsed,
                  });
                }}
              />
              {errors.profilePhoto && <FormErrorMessage>{errors.profilePhoto}</FormErrorMessage>}
            </FormControl> */}
          {/* Show the image if is valid */}
          {/* {values.profilePhoto && !errors.profilePhoto && (
              <img
                alt={values.profilePhoto.originalImage?.name}
                src={values.profilePhoto?.imageParsed}
              />
            )} */}
          {loading ? (
            <Button isLoading colorScheme="blue" loadingText="Enviando" my="2">
              Enviar
            </Button>
          ) : (
            <Button colorScheme="blue" disabled={user && !user.id} my="2" type="submit">
              Enviar
            </Button>
          )}
        </Form>
      </Container>
      {/* )} */}
    </Formik>
  );
};

export default UsersForm;
