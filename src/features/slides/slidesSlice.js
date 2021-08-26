import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import SlidesServices from '../../Services/SlidesService';

const initialState = {
  slidesList: [],
  slideActive: [],
  slidesSearch: [],
  loading: false,
  error: false,
};

export const getSlidesList = createAsyncThunk('slides/fetchList', async () => {
  try {
    const response = await SlidesServices.getAll();
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const getSlideById = createAsyncThunk('slides/id', async (id, { rejectWithValue }) => {
  try {
    const response = await SlidesServices.getById(id);
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const createSlide = createAsyncThunk('slide/create', async (slide, { rejectWithValue }) => {
  try {
    const response = await SlidesServices.create(slide);
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const updateSlide = createAsyncThunk('slide/update', async (slide, { rejectWithValue }) => {
  try {
    const response = await SlidesServices.update(slide);
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const deleteSlide = createAsyncThunk('slide/delete', async (id, { rejectWithValue }) => {
  try {
    await SlidesServices.delete(id);
    return id;
  } catch (error) {
    throw error;
  }
});

export const getSlidesSearched = createAsyncThunk('slides/search', async (keys) => {
  try {
    const response = await SlidesServices.search(keys);
    return response.data;
  } catch (error) {
    throw error;
  }
});

const slidesSlice = createSlice({
  name: 'slides',
  initialState,
  reducers: {},
  extraReducers: {
    [getSlidesList.pending]: (state) => {
      state.loading = true;
    },
    [getSlidesList.fulfilled]: (state, { payload }) => {
      state.slidesList = payload;
      state.loading = false;
      state.error = false;
    },
    [getSlidesList.rejected]: (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    },

    [getSlideById.pending]: (state) => {
      state.loading = true;
    },
    [getSlideById.fulfilled]: (state, { payload }) => {
      state.slideActive = payload;
      state.loading = false;
      state.error = false;
    },
    [getSlideById.rejected]: (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    },

    [createSlide.pending]: (state) => {
      state.loading = true;
    },
    [createSlide.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.slidesList = [...state.slidesList, payload];
    },
    [createSlide.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.payload;
    },

    [updateSlide.pending]: (state) => {
      state.loading = true;
    },
    [updateSlide.fulfilled]: (state, { payload }) => {
      state.slidesList = state.slidesList.map((slide) =>
        slide.id === payload.id ? payload : slide,
      );
      state.loading = false;
    },
    [updateSlide.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [deleteSlide.pending]: (state) => {
      state.loading = true;
    },
    [deleteSlide.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.slidesList = state.slidesList.filter((slide) => slide.id !== payload.id);
    },
    [deleteSlide.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },

    [getSlidesSearched.pending]: (state) => {
      state.loading = true;
    },
    [getSlidesSearched.fulfilled]: (state, { payload }) => {
      state.slidesList = payload;
      state.loading = false;
      state.error = false;
    },
    [getSlidesSearched.rejected]: (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    },
  },
});

export default slidesSlice.reducer;
