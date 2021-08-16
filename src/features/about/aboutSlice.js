import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import OrganizationService from '../../Services/OrganitationService';
import MembersService from '../../Services/MembersService';

const initialState = {
  aboutUS: [],
  membersList: [],
  loading: false,
};

export const getOrganization = createAsyncThunk('organization/get', async () => {
  try {
    const response = await OrganizationService.get();
    return response.data;
  } catch (err) {
    console.log(err);
  }
});

export const postOrganization = createAsyncThunk('organization/post', async (organization) => {
  try {
    const response = await OrganizationService.edit(organization);
    return response.data;
  } catch (err) {
    console.log(err);
  }
});

export const getMembers = createAsyncThunk('members/get', async () => {
  try {
    const response = await MembersService.getAll();
    return response.data;
  } catch (err) {
    console.log(err);
  }
});

const aboutSlice = createSlice({
  name: 'about',
  initialState,
  reducers: {},
  extraReducers: {
    [getOrganization.pending]: (state) => {
      state.loading = true;
    },
    [getOrganization.fulfilled]: (state, action) => {
      state.aboutUS = action.payload;
      state.loading = false;
    },
    [getOrganization.rejected]: (state, action) => {
      state.loading = false;
    },
    [postOrganization.pending]: (state) => {
      state.loading = true;
    },
    [postOrganization.fulfilled]: (state, action) => {
      state.aboutUS = state.aboutUS.push(action.payload);
      state.loading = false;
    },
    [postOrganization.rejected]: (state, action) => {
      state.loading = false;
    },
    [getMembers.fulfilled]: (state, action) => {
      state.membersList = action.payload;
      state.loading = false;
    },
    [getMembers.rejected]: (state, action) => {
      state.loading = true;
    },
    [getMembers.pending]: (state) => {
      state.loading = true;
    },
  },
});

export default aboutSlice.reducer;
