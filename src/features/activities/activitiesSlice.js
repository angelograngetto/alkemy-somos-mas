import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import ActivitiesService from '../../Services/ActivitiesService';

const initialState = {
  activitiesList: [],
  loading: false,
  error: '',
};

export const fetchActivitiesList = createAsyncThunk(
  'activities/fetchList',
  async (_, { rejectWithValue }) => {
    try {
      const response = await ActivitiesService.getActivities();
      return response.data.data;
    } catch (error) {
      return rejectWithValue([], error);
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
      return rejectWithValue(error);
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
      return rejectWithValue(error);
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
      return rejectWithValue(error);
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
      state.error = '';
    },
    [fetchActivitiesList.rejected]: (state, { payload, error }) => {
      state.activitiesList = payload;
      state.error = error;
      state.loading = false;
    },

    [createActivity.pending]: (state, action) => {
      state.loading = true;
    },
    [createActivity.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.error = '';
      state.activitiesList = [...state.activitiesList, payload];
    },
    [createActivity.rejected]: (state, { error }) => {
      state.loading = false;
      state.error = error;
    },

    [updateActivity.pending]: (state, action) => {
      state.loading = true;
    },
    [updateActivity.fulfilled]: (state, { payload }) => {
      const index = state.activitiesList.findIndex((activity) => activity.id === payload.id);
      const updatedActivity = { ...payload, ...state.activitiesList[index] };
      state.loading = false;
      state.error = '';
      state.activitiesList = [
        ...state.activitiesList.slice(0, index),
        updatedActivity,
        ...state.activitiesList.slice(index + 1),
      ];
    },
    [updateActivity.rejected]: (state, { error }) => {
      state.loading = false;
      state.error = error;
    },

    [deleteActivity.pending]: (state, action) => {
      state.loading = true;
    },
    [deleteActivity.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.error = '';
      state.activitiesList = state.activitiesList.filter((activity) => activity.id !== payload.id);
    },
    [deleteActivity.rejected]: (state, { error }) => {
      state.loading = false;
      state.error = error;
    },
  },
});

export default activitiesSlice.reducer;
