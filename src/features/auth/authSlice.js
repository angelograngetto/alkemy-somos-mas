import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  token: null,
  auth: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    register(state, action) {
      state.user = action.payload;
      state.token = localStorage.setItem('token', 'tokenValueExample');
      state.auth = true;
    },
    login(state, action) {
      state.user = action.payload;
      state.token = localStorage.setItem('token', 'tokenValueExample');
      state.auth = true;
    },
    logout(state) {
      state.user = null;
      state.token = localStorage.removeItem('token');
      state.auth = false;
    },
  },
});

export const { register, login, logout } = userSlice.actions;
export default userSlice.reducer;
