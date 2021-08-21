import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import UsersService from '../../Services/UsersService';

const initialState = {
  usersList: [],
  usersSearch: [],
  loading: false,
  success: false,
  error: null,
};

export const fetchUsers = createAsyncThunk('users/fetch', async () => {
  try {
    const response = await UsersService.get();
    return response.data.data;
  } catch (error) {
    throw error;
  }
});

export const fetchUser = createAsyncThunk('user/fetch', async () => {
  try {
    const response = await UsersService.getById(id);
    return response.data.data;
  } catch (error) {
    throw error;
  }
});

export const createUser = createAsyncThunk('user/create', async (user) => {
  try {
    const response = await UsersService.create(user);
    return response.data.data;
  } catch (error) {
    throw error;
  }
});

export const updateUser = createAsyncThunk('user/update', async (user) => {
  try {
    const response = await UsersService.update(user.id, user);
    return response.data.data;
  } catch (error) {
    throw error;
  }
});

export const deleteUser = createAsyncThunk('user/delete', async (id) => {
  try {
    await UsersService.delete(id);
    return id;
  } catch (error) {
    throw error;
  }
});

export const searchedUsers = createAsyncThunk('users/search', async (keys) => {
  try {
    const response = await UsersService.search(keys);
    return response.data.data;
  } catch (error) {
    throw error;
  }
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchUsers.pending]: (state) => {
      state.loading = true;
      state.success = false;
    },
    [fetchUsers.fulfilled]: (state, action) => {
      state.usersList = action.payload;
      state.loading = false;
      state.success = true;
      state.error = null;
    },
    [fetchUsers.rejected]: (state, action) => {
      state.error = action.error.message;
      state.loading = false;
      state.success = false;
    },

    [fetchUser.pending]: (state) => {
      state.loading = true;
      state.success = false;
    },
    [fetchUser.fulfilled]: (state, action) => {
      state.usersList = action.payload;
      state.loading = false;
      state.success = true;
      state.error = null;
    },
    [fetchUser.rejected]: (state, action) => {
      state.error = action.error.message;
      state.loading = false;
      state.success = false;
    },

    [deleteUser.pending]: (state) => {
      state.loading = true;
      state.success = false;
    },
    [deleteUser.fulfilled]: (state, action) => {
      state.loading = false;
      state.success = true;
      state.error = null;
      state.usersList = state.usersList.filter((user) => user.id !== action.payload);
    },
    [deleteUser.rejected]: (state, action) => {
      state.error = action.error.message;
      state.loading = false;
      state.success = false;
    },

    [createUser.pending]: (state) => {
      state.loading = true;
      state.success = false;
    },
    [createUser.fulfilled]: (state, action) => {
      state.usersList = [...state.usersList, action.payload];
      state.loading = false;
      state.success = true;
      state.error = null;
    },
    [createUser.rejected]: (state, action) => {
      state.error = action.error.message;
      state.loading = false;
      state.success = false;
    },

    [updateUser.pending]: (state) => {
      state.loading = true;
      state.success = false;
    },
    [updateUser.fulfilled]: (state, action) => {
      const payload = action.payload;
      state.usersList = state.usersList.map((user) => (user.id === payload.id ? payload : user));
      state.loading = false;
      state.success = true;
      state.error = null;
    },
    [updateUser.rejected]: (state, action) => {
      state.error = action.error.message;
      state.loading = false;
      state.success = false;
    },

    [searchedUsers.pending]: (state) => {
      state.loading = true;
      state.success = false;
    },
    [searchedUsers.fulfilled]: (state, action) => {
      state.usersSearch = action.payload;
      state.loading = false;
      state.success = true;
      state.error = null;
    },
    [searchedUsers.rejected]: (state, action) => {
      state.error = action.error.message;
      state.loading = false;
      state.success = false;
    },
  },
});

export default usersSlice.reducer;
