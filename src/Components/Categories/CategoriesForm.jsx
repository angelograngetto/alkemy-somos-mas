import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import CKEditor from 'ckeditor4-react';
import * as Yup from 'yup';
import {
  Alert as ChakraAlert,
  AlertIcon,
  Button,
  FormControl,
  FormErrorMessage,
  Input,
  Box,
  Container,
  Link,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { updateCategory, createCategory } from '../../features/categories/categoriesSlice';
import Alert from '../Utils/Alert';

const CategoriesForm = ({ category, setIsEditOpen }) => {
  const dispatch = useDispatch();
  const { status } = useSelector((state) => state.categories);

  const convertBase64 = (file) => {
    if (file) {
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = function () {
          resolve(fileReader.result);
        };
        fileReader.onerror = function () {
          reject(Error('Algo salió mal, vuelve a intentarlo'));
        };
      });
    }
  };

  const formatFileSupported = ['image/png', 'image/jpg', 'image/jpeg'];
  const validateSchema = Yup.object().shape({
    name: Yup.string()
      .required('Campo requerido')
      .min(4, 'El nombre debe tener un mínimo de 4 carácteres'),
    description: Yup.string().required('Campo requerido'),
    image: Yup.mixed()
      .required('Campo requerido')
      .test({
        name: 'formatFile',
        exclusive: true,
        message: 'El formato de imagen es inválido, sólo se permite .png o .jpg',
        test: (value) => formatFileSupported.includes(value?.originalImage?.type) || value.url,
      }),
  });

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        name: category?.name ?? '',
        description: category?.description ?? '',
        image: { url: category?.image } ?? '',
      }}
      validationSchema={validateSchema}
      onSubmit={(values, actions) => {
        if (category && !category.id) return;
        const { name, description, image } = values;
        let data = { name, description };
        if (category) {
          data.id = category.id;
          if (image.imageParsed) data.image = image.imageParsed;
          dispatch(updateCategory(data)).then((resp) => {
            if (resp.error) {
              Alert(
                'error',
                'Ocurrió un error',
                'Algo salió mal editando la categoría, inténtalo de nuevo',
              );
            } else {
              Alert('success', 'Operación exitosa', 'La categoría se ha editado exitosamente');
            }
            setIsEditOpen(false);
          });
        } else {
          data.image = image.imageParsed;
          dispatch(createCategory(data)).then((resp) => {
            if (resp.error) {
              Alert(
                'error',
                'Ocurrió un error',
                'Algo salió mal creando la categoría, inténtalo de nuevo',
              );
            } else {
              actions.resetForm({
                name: '',
                description: '',
                image: '',
              });
              Alert('success', 'Operación exitosa', 'La categoría se ha creado exitosamente');
            }
          });
        }
      }}
    >
      {({ values, errors, setFieldValue, setFieldTouched, touched }) => (
        <Container>
          <Form>
            <Box color="gray.900" fontSize="3xl" fontWeight="bold">
              {category ? 'Edición de categoría' : 'Creación de categoría'}
            </Box>
            {category && !category.id ? (
              <ChakraAlert my="2" status="error">
                <AlertIcon />
                <Link as={RouterLink} to="backoffice/categories/create">
                  Esta categoría no existe, haz clic aquí para crearlo
                </Link>
              </ChakraAlert>
            ) : null}

            <Field name="name">
              {({ field, form, meta }) => (
                <FormControl isInvalid={form.errors.name && form.touched.name} my="2">
                  <Input id="name" placeholder="Nombre de la categoría" type="text" {...field} />
                  {meta.touched && meta.error && <FormErrorMessage>{meta.error}</FormErrorMessage>}
                </FormControl>
              )}
            </Field>

            <FormControl isInvalid={errors.description && touched.description} my="2">
              <CKEditor
                data={values.description}
                id="description"
                name="description"
                onBlur={() => setFieldTouched('description', true, true)}
                onChange={(event) => setFieldValue('description', event.editor.getData())}
              />
              {touched.description && errors.description && (
                <FormErrorMessage>{errors.description}</FormErrorMessage>
              )}
            </FormControl>

            <FormControl isInvalid={errors.image && touched.image} my="2">
              <input
                id="image"
                name="image"
                type="file"
                onBlur={() => setFieldTouched('image', true, true)}
                onChange={async (event) => {
                  const imageFile = event.currentTarget.files[0];
                  const imageParsed = await convertBase64(imageFile);
                  setFieldValue('image', {
                    originalImage: imageFile,
                    imageParsed,
                  });
                }}
              />
              {errors.image && touched.image && <FormErrorMessage>{errors.image}</FormErrorMessage>}
            </FormControl>

            {values.image && !errors.image && (values.image.url || touched.image) ? (
              <img
                alt={category ? values?.image?.description : values?.image?.originalImage?.name}
                src={
                  category
                    ? values?.image?.url || values?.image?.imageParsed
                    : values?.image?.imageParsed
                }
                style={{ height: '200px', width: '100%', objectFit: 'cover' }}
              />
            ) : null}

            {status === 'loading' ? (
              <Button isLoading colorScheme="blue" loadingText="Enviando" my="2">
                Enviar
              </Button>
            ) : (
              <Button colorScheme="blue" disabled={category && !category.id} my="2" type="submit">
                Enviar
              </Button>
            )}
          </Form>
        </Container>
      )}
    </Formik>
  );
};
export default CategoriesForm;
