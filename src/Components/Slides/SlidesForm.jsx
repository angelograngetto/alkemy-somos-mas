import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field } from 'formik';
import CKEditor from 'ckeditor4-react';
import {
  Button,
  Alert,
  AlertIcon,
  FormControl,
  FormErrorMessage,
  Input,
  Box,
  Container,
  Link,
} from '@chakra-ui/react';
import * as Yup from 'yup';

import { createSlide, getSlidesList, updateSlide } from '../../features/slides/slidesSlice';

const SlidesForm = ({ slide }) => {
  const dispatch = useDispatch();
  const { slidesList } = useSelector((state) => state.slides);
  const [utils, setUtils] = useState({
    error: null,
    success: null,
    loading: null,
  });

  useEffect(() => {
    dispatch(getSlidesList());
  }, [dispatch]);

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

  const formatFileSupported = ['image/jpg', 'image/png', 'image/jpeg'];
  const orders = slidesList
    .filter((item) => item?.order !== slide?.order)
    .map((item) => item?.order);
  const validateSchema = Yup.object().shape({
    name: Yup.string()
      .required('Campo requerido')
      .min(4, 'El nombre debe tener una longitud mínima de 4 carácteres'),
    description: Yup.string().required('Campo requerido'),
    order: Yup.mixed()
      .required('Campo requerido')
      .test({
        name: 'orderNumberValidation',
        exclusive: true,
        message: 'Este campo tiene que ser numérico y mayor o igual a 0',
        test: (value) => !isNaN(value) && value >= 0,
      })
      .test({
        name: 'uniqueOrderValidation',
        exclusive: true,
        message: 'Este orden ya fue utilizado en otro Slide, prueba con otro',
        test: (value) => !orders.includes(parseInt(value)),
      }),
    file: Yup.mixed()
      .required('Campo requerido')
      .test({
        name: 'formatFile',
        exclusive: true,
        message: 'El formato de imagen es inválido, sólo se permite .png o .jpg',
        test: (value) => formatFileSupported.includes(value?.image?.type) || value.url,
      }),
  });

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        name: slide?.name ?? '',
        description: slide?.description ?? '',
        order: slide?.order ?? '',
        file: { url: slide?.image } ?? '',
      }}
      validationSchema={validateSchema}
      onSubmit={async (values, actions) => {
        if (slide && !slide.id) return;
        setUtils({ error: null, success: null, loading: true });
        const { name, description, order, file } = values;
        let newSlide = { name, description, order };

        if (slide) {
          newSlide.id = slide.id;
          if (file.imageParsed) newSlide.image = file.imageParsed;
          dispatch(updateSlide(newSlide))
            .then((resp) => {
              if (resp.error) {
                setUtils({ error: true, sucess: false, loading: false });
              } else {
                setUtils({ error: false, success: true, loading: false });
              }
            })
            .finally(() => {
              setTimeout(() => {
                setUtils({ error: false, success: false, loading: false });
              }, 5000);
            });
        } else {
          newSlide.image = file.imageParsed;
          dispatch(createSlide(newSlide))
            .then((resp) => {
              if (resp.error) {
                setUtils({ error: true, sucess: false, loading: false });
              } else {
                setUtils({ error: false, success: true, loading: false });
                actions.resetForm();
              }
            })
            .finally(() => {
              setTimeout(() => {
                setUtils({ error: false, success: false, loading: false });
              }, 5000);
            });
        }
      }}
    >
      {({ setFieldValue, values, errors, touched, setTouched }) => (
        <Container>
          <Form>
            <Box color="gray.900" fontSize="3xl" fontWeight="bold">
              {slide ? 'Edición de Slide' : 'Creación de Slide'}
            </Box>
            {slide && !slide.id ? (
              <Alert my="2" status="error">
                <AlertIcon />
                <Link as={RouterLink} to="backoffice/slides/create">
                  Este slide no existe, haz clic aquí para crearlo
                </Link>
              </Alert>
            ) : null}
            <Field name="name">
              {({ field, form, meta }) => (
                <FormControl isInvalid={form.errors.name && form.touched.name} my="2">
                  <Input id="name" placeholder="Nombre del slide" type="text" {...field} />
                  {meta.touched && meta.error && <FormErrorMessage>{meta.error}</FormErrorMessage>}
                </FormControl>
              )}
            </Field>

            <FormControl isInvalid={errors.description && touched.description} my="2">
              <CKEditor
                data={values.description}
                id="description"
                name="description"
                onBlur={(evt) => {
                  setTouched({ ...touched, description: true }, true);
                  setFieldValue('description', evt.editor.getData());
                }}
                onChange={(evt) => {
                  setTouched({ ...touched, description: true }, true);
                  setFieldValue('description', evt.editor.getData());
                }}
              />
              {touched.description && errors.description && (
                <FormErrorMessage>{errors.description}</FormErrorMessage>
              )}
            </FormControl>

            <Field name="order">
              {({ field, form, meta }) => (
                <FormControl isInvalid={form.errors.order && form.touched.order} my="2">
                  <Input id="order" placeholder="Orden del slide" type="text" {...field} />
                  {meta.touched && meta.error && <FormErrorMessage>{meta.error}</FormErrorMessage>}
                </FormControl>
              )}
            </Field>

            <FormControl isInvalid={errors.file && touched.file} my="2">
              <input
                id="file"
                name="file"
                type="file"
                onBlur={(evt) => setTouched({ ...touched, description: true }, true)}
                onChange={async (event) => {
                  const fileImage = event.currentTarget.files[0];
                  const imageParsed = await convertBase64(fileImage);
                  setTouched({ ...touched, file: true }, true);
                  setFieldValue('file', {
                    image: fileImage,
                    imageParsed,
                  });
                }}
              />
              {errors.file && (typeof values.file === 'object' || values.file.length === 0) && (
                <FormErrorMessage>{errors.file}</FormErrorMessage>
              )}
            </FormControl>

            {/* {show the image if is a valid image or comes from the api} */}
            {values.file && !errors.file && (touched.file || values.file.url) ? (
              <img
                alt={slide && values.file.url ? values?.description : values?.file?.image?.name}
                src={slide && values.file.url ? values?.file.url : values?.file?.imageParsed}
                style={{ height: '200px', width: '100%', objectFit: 'cover' }}
              />
            ) : null}

            {utils.loading ? (
              <Button isLoading colorScheme="blue" loadingText="Enviando" my="2">
                Enviar
              </Button>
            ) : (
              <Button colorScheme="blue" disabled={slide && !slide.id} my="2" type="submit">
                Enviar
              </Button>
            )}

            {utils.success ? (
              <Alert my="2" status="success">
                <AlertIcon />
                {slide
                  ? 'El slide ha sido editado exitosamente '
                  : 'El slide se ha creado exitosamente'}
              </Alert>
            ) : utils.error ? (
              <Alert my="2" status="error">
                <AlertIcon />
                {slide
                  ? 'Algo salió mal editando el slide, inténtalo de nuevo'
                  : 'Algo salió mal creando el slide, inténtalo de nuevo'}
              </Alert>
            ) : null}
          </Form>
        </Container>
      )}
    </Formik>
  );
};
export default SlidesForm;
