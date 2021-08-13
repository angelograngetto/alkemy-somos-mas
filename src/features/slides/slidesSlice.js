import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import SlidesServices from '../../Services/SlidesService';

const initialState = {
  slidesList: [],
  loading: false,
  error: '',
};
