import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import UsersService from '../../Services/UsersService';

const initialState = {
  user: null,
  token: null,
  auth: false,
  isAdmin: false,
  status: 'idle',
  error: false,
};

export const loginUser = createAsyncThunk('auth/login', async (user) => {
  const resp = await UsersService.get();
  const userData = resp.data.data.find(
    (item) => item.email === user.email && item.password === user.password,
  );
  if (userData) return userData;
  else throw new Error('Credenciales inválidas');
});

export const registerUser = createAsyncThunk('auth/register', async (user) => {
  try {
    const resp = await UsersService.create(user);
    return resp.data.data;
  } catch (error) {
    throw new Error(error);
  }
});

const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.token = localStorage.removeItem('token');
      state.auth = false;
      state.isAdmin = false;
    },
  },
  extraReducers: {
    [loginUser.pending]: (state) => {
      state.status = 'loading';
    },
    [loginUser.fulfilled]: (state, action) => {
      state.status = 'complete';
      state.auth = true;
      state.user = action.payload;
      state.isAdmin = action?.payload?.role_id === 1 ? true : false;
    },
    [loginUser.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },

    [registerUser.pending]: (state) => {
      state.status = 'loading';
    },
    [registerUser.fulfilled]: (state, action) => {
      state.status = 'complete';
      state.auth = true;
      state.user = action.payload;
      state.isAdmin = false;
    },
    [registerUser.rejected]: (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    },
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
