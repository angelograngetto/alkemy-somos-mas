import React, { useEffect, useState } from 'react';
import { Formik } from 'formik';
import CKEditor from 'ckeditor4-react';
import { useParams, useHistory } from 'react-router-dom';
import { Box, Input, Text, Button, Image, Heading, Alert, Spacer, Flex } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMembers, createMember, updateMember } from '../../features/members/membersSlice';
import CustomAlert from '../Utils/Alert';

const MemberForm = () => {
  const dispatch = useDispatch();
  const { membersList, loading, error } = useSelector((state) => state.members);
  const history = useHistory();
  const { id } = useParams();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('/images/no-user.jpg');
  const [facebookURL, setFacebookURL] = useState('');
  const [linkedinURL, setLinkedinURL] = useState('');

  useEffect(() => {
    dispatch(fetchMembers());
  }, [id]);

  useEffect(() => {
    if (id) {
      const member = membersList.filter((member) => member.id == id);
      setName(member[0]?.name);
      setDescription(member[0]?.description);
      setImage(member[0]?.image);
      setLinkedinURL(member[0]?.linkedinUrl);
      setFacebookURL(member[0]?.facebookUrl);
    }
  }, [membersList]);

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
    <Box
      borderRadius="lg"
      borderWidth="1px"
      flex="1"
      m="auto"
      mb="50px"
      mt="50px"
      p="5"
      shadow="lg"
      w="80%"
    >
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
        onSubmit={async ({ name, description, facebookURL, linkedinURL, file }) => {
          let data = {
            id,
            name,
            description,
            facebookUrl: facebookURL,
            linkedinUrl: linkedinURL,
          };

          if (id) {
            if (file) data = { ...data, image };
            dispatch(updateMember(data));
          } else {
            data = { ...data, image };
            dispatch(createMember(data)).then((res) => {
              if (res.error) {
                CustomAlert('error', 'Error', 'Ocurrió un error al guardar, vuelve a intentarlo.');
              } else {
                history.push('/backoffice/members');
              }
            });
          }
          // if (!loading) history.push('/backoffice/members');
        }}
      >
        {({ values, errors, handleChange, handleSubmit, setFieldValue }) => (
          <form onSubmit={handleSubmit}>
            <img
              src={image}
              style={{
                borderRadius: '100%',
                width: '180px',
                height: '180px',
                margin: 'auto',
                objectFit: 'cover',
              }}
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
            <Flex>
              <Spacer />
              {loading ? (
                <Button isLoading colorScheme="green" loadingText="Enviando" mt="8px" type="submit">
                  Guardar
                </Button>
              ) : (
                <Button colorScheme="green" mt="8px" type="submit">
                  Guardar
                </Button>
              )}
            </Flex>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default MemberForm;
