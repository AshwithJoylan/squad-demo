import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { DefaultRootState } from 'react-redux';
import { Api } from './config';

const initialState: { isLoading: boolean; data: any[]; offset: number } = {
  isLoading: true,
  data: [],
  offset: 0,
};

const limit = 5;

export const getJobs = createAsyncThunk(
  'jobs/get',
  async (_, { getState, rejectWithValue }) => {
    try {
      const offset = (getState() as DefaultRootState).jobs.offset;
      console.log('offset:', offset);
      const response = await Api.get(Api.EndPoints.JOBS, {
        offset: offset,
        limit,
      });
      console.log('response:', response);
      return [];
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const jobsSlice = createSlice({
  name: 'jobs',
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {},
});

export default jobsSlice.reducer;
