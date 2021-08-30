import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import getSpanishError from '../../Components/Utils/HttpErrors';

import ActivitiesService from '../../Services/ActivitiesService';

const initialState = {
  activitiesList: [],
  searchResults: [],
  loading: false,
  error: null,
};

export const fetchActivitiesList = createAsyncThunk(
  'activities/fetchList',
  async (id, { rejectWithValue }) => {
    try {
      const response = await ActivitiesService.getActivities(id);
      return response.data.data;
    } catch (error) {
      const errorMessage = getSpanishError(error.message);
      return rejectWithValue(errorMessage || error.message);
    }
  },
);

export const createActivity = createAsyncThunk(
  'activities/create',
  async (activity, { rejectWithValue }) => {
    try {
      const response = await ActivitiesService.create(activity);
      return response.data.data;
    } catch (error) {
      const errorMessage = getSpanishError(error.message);
      return rejectWithValue(errorMessage || error.message);
    }
  },
);

export const updateActivity = createAsyncThunk(
  'activities/update',
  async (activity, { rejectWithValue }) => {
    try {
      const response = await ActivitiesService.update(activity);
      return response.data.data;
    } catch (error) {
      const errorMessage = getSpanishError(error.message);
      return rejectWithValue(errorMessage || error.message);
    }
  },
);

export const deleteActivity = createAsyncThunk(
  'activities/delete',
  async (id, { rejectWithValue }) => {
    try {
      const response = await ActivitiesService.remove(id);
      return id;
    } catch (error) {
      const errorMessage = getSpanishError(error.message);
      return rejectWithValue(errorMessage || error.message);
    }
  },
);

export const searchActivitiesList = createAsyncThunk(
  'activities/searchList',
  async (value, { rejectWithValue }) => {
    try {
      const response = await ActivitiesService.search(value);
      return response.data.data;
    } catch (error) {
      const errorMessage = getSpanishError(error.message);
      return rejectWithValue(errorMessage || error.message);
    }
  },
);

const activitiesSlice = createSlice({
  name: 'activities',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchActivitiesList.pending]: (state, action) => {
      state.loading = true;
    },

    [fetchActivitiesList.fulfilled]: (state, { payload }) => {
      state.activitiesList = payload;
      state.loading = false;
      state.error = null;
    },

    [fetchActivitiesList.rejected]: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },

    [createActivity.pending]: (state, action) => {
      state.loading = true;
    },

    [createActivity.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.activitiesList = [...state.activitiesList, payload];
    },
    [createActivity.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [updateActivity.pending]: (state, action) => {
      state.loading = true;
    },

    [updateActivity.fulfilled]: (state, { payload }) => {
      const index = state.activitiesList.findIndex((activity) => activity.id === payload.id);
      const updatedActivity = { ...state.activitiesList[index], ...payload };

      state.loading = false;
      state.error = null;
      state.activitiesList = [
        ...state.activitiesList.slice(0, index),
        updatedActivity,
        ...state.activitiesList.slice(index + 1),
      ];
    },

    [updateActivity.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [deleteActivity.pending]: (state, action) => {
      state.loading = true;
    },

    [deleteActivity.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.error = null;
      state.activitiesList = state.activitiesList.filter((activity) => activity.id !== payload);
    },

    [deleteActivity.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    [searchActivitiesList.pending]: (state, action) => {
      state.loading = true;
    },

    [searchActivitiesList.fulfilled]: (state, { payload }) => {
      state.searchResults = payload;
      state.loading = false;
      state.error = null;
    },

    [searchActivitiesList.rejected]: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export default activitiesSlice.reducer;
