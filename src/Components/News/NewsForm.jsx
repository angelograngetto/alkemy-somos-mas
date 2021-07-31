import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { postNews, updateNews } from './helpers/NewsService';
import { convertBase64 } from './helpers/ConvertBase64';
import CKEditor from 'ckeditor4-react';
import {
  Text,
  InputGroup,
  Input,
  Stack,
  FormControl,
  Select,
  FormLabel,
  Button,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import validationSchema from './ValidationSchema';
import '../../Components/FormStyles.css';

const NewsForm = ({ news }) => {
  const [categories, setCategories] = useState([]);

  //FETCHING CATEGORIES

  const fetchCategories = async () => {
    const response = await axios.get('http://ongapi.alkemy.org/api/categories');
    setCategories(response.data.data);
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  //SUBMIT OR EDIT FUNCTION DEPENDING ON EXISTENCE OF NEWS
  const onSubmit = async (values) => {
    const img = await convertBase64(values.image);
    const data = {
      id: values.id,
      name: values.name,
      content: values.content,
      category: values.category,
      image: img,
    };

    if (news) {
      data.id = news.id;
      updateNews(news, data);
      formik.resetForm();
    } else {
      postNews(data);
      formik.resetForm();
    }
  };

  //INITIAL VALUES

  const initialValues = {
    name: news ? news.name : '',
    content: news ? news.content : '',
    category: news ? news.category : '',
    image: news ? news.image : '',
  };

  //FORMIK INITIAL VALUES

  const formik = useFormik({
    initialValues: initialValues,
    validateOnBlur: true,
    onSubmit,
    validationSchema: validationSchema,
  });

  return (
    <form className="form-container" onSubmit={formik.handleSubmit}>
      <Stack spacing={8}>
        <FormControl isRequired rounded="sm">
          <FormLabel>Título</FormLabel>
          <InputGroup>
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
            <Text fontSize="md" marginTop={2}>
              {formik.errors.name}
            </Text>
          ) : null}
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Contenido</FormLabel>
          <CKEditor
            className="input-field"
            config={{ placeholder: 'Descripción' }}
            data={formik.values.content}
            name="content"
            onChange={(event) => formik.setFieldValue('content', event.editor.getData())}
          />
          {formik.touched.content && formik.errors.content ? (
            <Text fontSize="md" marginTop={2}>
              {formik.errors.content}
            </Text>
          ) : null}
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Categoría</FormLabel>
          <InputGroup>
            <Select
              className="select-field"
              name="category"
              value={formik.values.category}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
            >
              <option disabled value="">
                Elija una categoría
              </option>
              {categories &&
                categories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
            </Select>
          </InputGroup>
          {formik.touched.category && formik.errors.category ? (
            <Text fontSize="md" marginTop={2}>
              {formik.errors.category}
            </Text>
          ) : null}
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Imagen</FormLabel>
          <InputGroup>
            <Input
              accept="image/png, image/jpg, image/jpeg"
              name="image"
              padding="5px 30px"
              placeholder="Imagen"
              type="file"
              onChange={(event) => formik.setFieldValue('image', event.currentTarget.files[0])}
            ></Input>
          </InputGroup>
          {formik.touched.image && formik.errors.image ? (
            <Text fontSize="md" marginTop={2}>
              {formik.errors.image}
            </Text>
          ) : null}
        </FormControl>

        <Button
          _active={{ boxShadow: 'lg' }}
          _hover={{ boxShadow: 'md' }}
          boxShadow="sm"
          className="submit-btn"
          colorScheme="blue"
          type="submit"
          variant="solid"
        >
          {news ? 'Editar' : 'Crear'}
        </Button>
      </Stack>
    </form>
  );
};

export default NewsForm;
