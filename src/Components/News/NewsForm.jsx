import React, { useEffect } from 'react';
import { createNews, updateNews } from '../../features/news/newsSlice';
import { fetchCategories } from '../../features/categories/categoriesSlice';
import { useDispatch, useSelector } from 'react-redux';
import { convertBase64 } from './helpers/ConvertBase64';
import CKEditor from 'ckeditor4-react';
import {
  Button,
  FormControl,
  FormLabel,
  Image,
  Input,
  InputGroup,
  Select,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useFormik } from 'formik';
import validationSchema from './ValidationSchema';
import { useHistory } from 'react-router-dom';
import Alert from '../../Components/Utils/Alert';
import '../../Components/FormStyles.css';

const NewsForm = ({ news, setIsEditOpen }) => {
  const { categories } = useSelector((state) => state.categories);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(fetchCategories());
  }, []);

  const onSubmit = async (values) => {
    let data = {
      name: values.name,
      required: false,
      content: values.content,
      category_id: values.category,
    };

    if (news) {
      data.id = news?.id;
      const response = await dispatch(updateNews(data));
      if (response.error) {
        Alert('error', 'Algo salió mal', response.payload);
      }
      setIsEditOpen(false);
      Alert('success', 'Éxito', 'Novedad editada correctamente');
    } else {
      data.image = values.image;
      const response = await dispatch(createNews(data));
      if (response.error) {
        Alert('error', 'Algo salió mal', response.payload);
      }
      Alert('success', 'Éxito', 'Novedad creada correctamente');
      history.push('/backoffice/news');
    }
  };

  const initialValues = {
    name: news?.name ?? '',
    content: news?.content ?? '',
    category: news?.category_id ?? '',
    image: news?.image ?? '',
  };

  const formik = useFormik({
    initialValues: initialValues,
    validateOnBlur: true,
    onSubmit,
    validationSchema: validationSchema,
    enableReinitialize: true,
  });

  const handleSelectChanged = (e) => {
    formik.setFieldValue('category', e.currentTarget.value);
  };

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
              onChange={handleSelectChanged}
            >
              <option disabled value="">
                Elija una categoría
              </option>
              {categories &&
                categories.map((category) => (
                  <option key={category.id} value={category.id}>
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

        <FormControl>
          <FormLabel>Imagen</FormLabel>
          <InputGroup noValidate>
            <Input
              accept="image/png, image/jpg, image/jpeg"
              color="transparent"
              name="image"
              padding="5px 30px"
              placeholder="Imagen"
              type="file"
              onChange={async (event) => {
                const image = await convertBase64(event.currentTarget.files[0]);
                formik.setFieldValue('image', image);
              }}
            ></Input>
          </InputGroup>
          <Stack marginTop={2}>
            <Image src={formik.values.image} />
          </Stack>
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
