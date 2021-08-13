import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import MembersService from '../../Services/MembersService';

const initialState = {
  membersList: [],
  loading: false,
  error: '',
};

export const fetchMembers = createAsyncThunk('members/fetch', async () => {
  try {
    const response = await MembersService.getAll();
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const deleteMember = createAsyncThunk('members/delete', async (id) => {
  try {
    await MembersService.delete(id);
    return id;
  } catch (error) {
    throw error;
  }
});

export const createMember = createAsyncThunk('members/create', async (member) => {
  try {
    const response = await MembersService.create(member);
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const updateMember = createAsyncThunk('members/update', async (member) => {
  try {
    const response = await MembersService.update(member);
    return response.data;
  } catch (error) {
    throw error;
  }
});

export const membersSlice = createSlice({
  name: 'members',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchMembers.pending]: (state) => {
      state.loading = true;
    },
    [fetchMembers.fulfilled]: (state, action) => {
      state.membersList = action.payload;
      state.loading = false;
      state.error = '';
    },
    [fetchMembers.rejected]: (state, action) => {
      state.error = action.error.message;
      state.loading = false;
    },
    [deleteMember.pending]: (state) => {
      state.loading = true;
    },
    [deleteMember.fulfilled]: (state, action) => {
      state.loading = false;
      state.membersList = state.membersList.filter((member) => member.id !== action.payload);
    },
    [deleteMember.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    },
    [createMember.pending]: (state) => {
      state.loading = true;
    },
    [createMember.fulfilled]: (state, action) => {
      state.membersList = [...state.membersList, action.payload];
      state.loading = false;
    },
    [createMember.rejected]: (state, action) => {
      state.error = action.error.message;
    },
    [updateMember.pending]: (state) => {
      state.loading = true;
    },
    [updateMember.fulfilled]: (state, action) => {
      const payload = action.payload;
      state.membersList = state.membersList.map((member) =>
        member.id === payload.id ? payload : member,
      );
      state.loading = false;
    },
    [updateMember.rejected]: (state, action) => {
      state.error = action.error.message;
    },
  },
});

export default membersSlice.reducer;
