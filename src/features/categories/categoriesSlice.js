import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import CategoriesService from '../../Services/CategoriesServices';

const initialState = {
  categories: [],
  category: {},
  status: 'idle',
  error: null,
};

export const fetchCategories = createAsyncThunk('categories/fetchCategories', async () => {
  const resp = await CategoriesService.getAll();
  return resp;
});
export const fetchCategoryById = createAsyncThunk('categories/fetchCategoryById', async (id) => {
  const resp = await CategoriesService.getById(id);
  return resp;
});
export const createCategory = createAsyncThunk('categories/createCategory', async (data) => {
  const resp = await CategoriesService.create(data);
  return resp;
});
export const updateCategory = createAsyncThunk('categories/updateCategory', async (data) => {
  const resp = await CategoriesService.update(data, data.id);
  return resp;
});
export const deleteCategory = createAsyncThunk('categories/deleteCategory', async (id) => {
  const resp = await CategoriesService.delete(id);
  return { resp, id };
});

export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchCategories.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchCategories.fulfilled]: (state, action) => {
      state.status = 'complete';
      state.categories = action.payload;
    },
    [fetchCategories.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },

    [fetchCategoryById.pending]: (state) => {
      state.status = 'loading';
    },
    [fetchCategoryById.fulfilled]: (state, action) => {
      state.status = 'complete';
      state.category = action.payload.data[0];
    },
    [fetchCategoryById.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },

    [createCategory.pending]: (state) => {
      state.status = 'loading';
    },
    [createCategory.fulfilled]: (state, action) => {
      state.status = 'complete';
      state.categories.push(action.payload.data);
    },
    [createCategory.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },

    [updateCategory.pending]: (state) => {
      state.status = 'loading';
    },
    [updateCategory.fulfilled]: (state, action) => {
      state.status = 'complete';
      const index = state.categories.findIndex((item) => item.id === action.payload.data.id);
      state.categories[index] = action.payload.data;
    },
    [updateCategory.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },

    [deleteCategory.pending]: (state) => {
      state.status = 'loading';
    },
    [deleteCategory.fulfilled]: (state, action) => {
      state.status = 'complete';
      state.categories = state.categories.filter((item) => item.id !== action.payload.id);
    },
    [deleteCategory.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
  },
});

export default categoriesSlice.reducer;
