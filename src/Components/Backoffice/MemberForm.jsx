import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import CKEditor from 'ckeditor4-react';
import { useParams, useHistory } from 'react-router-dom';
import { Box, Input, Text, Button, Image, Heading, Alert } from '@chakra-ui/react';

const MemberForm = () => {
  const history = useHistory();
  const { id } = useParams();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [facebookURL, setFacebookURL] = useState('');
  const [linkedinURL, setLinkedinURL] = useState('');

  useEffect(() => {
    // if received id in params get the member data for edit
    if (id) {
      fetch(`http://ongapi.alkemy.org/api/members/${id}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.success === true) {
            setName(data.data.name);
            setDescription(data.data.description);
            setImage(data.data.image);
            setFacebookURL(data.data.facebookUrl);
            setLinkedinURL(data.data.linkedinUrl);
          } else {
            // if member id not exist goes to backoffice home
            history.push('/backoffice');
          }
        });
    }
  }, []);

  // this function reads the image file to preview
  const showImage = (fileToRead) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileToRead);
    reader.onload = () => {
      const dataURL = reader.result;
      setImage(dataURL);
    };
  };

  const handleChangeImage = (file) => {
    if (file) {
      if (file.type === 'image/jpg' || file.type === 'image/png' || file.type === 'image/jpeg') {
        showImage(file);
      }
    }
  };

  return (
    <Box borderRadius="md" borderWidth="1px" flex="1" m="auto" mt="80px" p="5" shadow="md" w="80%">
      <Heading align="center" m="15px">
        {id ? 'Editar miembro' : 'Crear miembro'}
      </Heading>
      <Formik
        enableReinitialize
        initialValues={{
          name,
          description,
          facebookURL,
          linkedinURL,
          file: null,
        }}
        validate={(values) => {
          const errors = {};
          if (!values.name) errors.name = 'Debes ingresar un nombre.';
          if (!values.facebookURL) errors.facebookURL = 'Debes ingresar una URL de Facebook.';
          if (!values.linkedinURL) errors.linkedinURL = 'Debes ingresar una URL de LinkedIn.';
          if (!values.description) errors.description = 'Debes ingresar una descripción.';
          /*
            Validation image: 
            if a member is beign created, the image is required and the allowed
            formats are png and jpg (or jpeg). 
            If is editing a member the image is not required.
          */
          if (!id && !values.file) {
            errors.file = 'Imagen requerida.';
          } else if (
            values.file &&
            values.file.type !== 'image/png' &&
            values.file.type !== 'image/jpg' &&
            values.file.type !== 'image/jpeg'
          ) {
            errors.file = 'Los formatos soportados son .png y .jpg.';
          }
          return errors;
        }}
        onSubmit={({ name, description, facebookURL, linkedinURL }) => {
          const data = {
            name,
            description,
            facebookUrl: facebookURL,
            linkedinUrl: linkedinURL,
          };

          //send data to api here
        }}
      >
        {({ values, errors, handleChange, handleSubmit, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <Image
              alt="Miembro"
              borderRadius="full"
              boxSize="150px"
              fit="cover"
              m="auto"
              src={image ? image : '/images/no-user.jpg'}
            />
            <Text mb="8px">Subir imagen: </Text>
            <Input
              isInvalid={errors.file}
              m="auto"
              name="file"
              padding="5px"
              style={{ margin: 'auto', display: 'block', marginTop: '8px' }}
              type="file"
              onChange={(e) => {
                setFieldValue('file', e.currentTarget.files[0]);
                handleChangeImage(e.currentTarget.files[0]);
              }}
            />
            {errors.file && (
              <Alert borderRadius="md" mt="8px" status="error">
                {errors.file}
              </Alert>
            )}
            <Text mb="8px" mt="8px">
              Nombre:
            </Text>
            <Input
              isInvalid={errors.name}
              name="name"
              placeholder="Nombre"
              type="text"
              value={values.name}
              onChange={handleChange}
            />
            {errors.name && (
              <Alert borderRadius="md" mt="8px" status="error">
                {errors.name}
              </Alert>
            )}
            <Text mb="8px" mt="8px">
              Redes sociales:
            </Text>
            <Input
              isInvalid={errors.facebookURL}
              mb="8px"
              name="facebookURL"
              placeholder="URL de Facebook"
              type="text"
              value={values.facebookURL}
              onChange={handleChange}
            />
            {errors.facebookURL && (
              <Alert borderRadius="md" mb="8px" status="error">
                {errors.facebookURL}
              </Alert>
            )}
            <Input
              isInvalid={errors.linkedinURL}
              name="linkedinURL"
              placeholder="URL de LinkedIn"
              type="text"
              value={values.linkedinURL}
              onChange={handleChange}
            />
            {errors.linkedinURL && (
              <Alert borderRadius="md" mb="8px" mt="8px" status="error">
                {errors.linkedinURL}
              </Alert>
            )}
            <Text mb="8px" mt="8px">
              Descripción:
            </Text>
            <CKEditor
              data={values.description}
              name="description"
              onChange={(e) => setFieldValue('description', e.editor.getData())}
            />
            {errors.description && (
              <Alert borderRadius="md" mt="8px" status="error">
                {errors.description}
              </Alert>
            )}
            <Button mt="8px" type="submit">
              Guardar
            </Button>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default MemberForm;
