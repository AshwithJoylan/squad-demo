import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { DefaultRootState } from 'react-redux';
import { Api } from './config';

const initialState: { isLoading: boolean; data: any[]; offset?: number } = {
  isLoading: true,
  data: [],
};

const limit = 4;

const res = [
  { id: 213, title: 'Job1', time: 2, businessName: 'Business 1', price: 20000 },
  { id: 321, title: 'Job2', time: 2, businessName: 'Business 2', price: 20000 },
  { id: 453, title: 'Job3', time: 2, businessName: 'Business 3', price: 20000 },
  { id: 645, title: 'Job4', time: 2, businessName: 'Business 4', price: 20000 },
];

export const getJobs = createAsyncThunk<
  any,
  { url?: string; initial?: boolean }
>('jobs/get', async ({ url }, { getState, rejectWithValue }) => {
  try {
    console.log('state getJobs');
    const state = getState() as DefaultRootState;
    const offset = state.jobs.offset;
    const realOffset = Math.round(state.jobs.data.length / limit);

    console.log('c', (offset || 0) + 1, realOffset);
    if (offset !== undefined && offset + 1 < realOffset) {
      return state.jobs.data;
    }

    // console.log('offset:', offset);
    // const response = await Api.get(Api.EndPoints.JOBS, {
    //   offset: offset,
    //   limit,
    // });
    const redd = await (() =>
      new Promise((resolve, reject) => {
        setTimeout(() => {
          console.log('state, res', res);
          resolve(res);
        }, 3000);
      }))();
    return redd;
    // console.log('response:', response);
    // return [];
  } catch (error) {
    return rejectWithValue(error);
  }
});

export const jobsLoadingSelector = (state: DefaultRootState) =>
  state.jobs.isLoading;

export const jobsSelector = (state: DefaultRootState) =>
  state.jobs.data.slice(
    limit * (state.jobs.offset || 0),
    limit * ((state.jobs.offset || 0) + 1)
  );
export const jobsOffsetSelector = (state: DefaultRootState) =>
  state.jobs.offset;

const jobsSlice = createSlice({
  name: 'jobs',
  initialState: initialState,
  reducers: {
    jobsLoadLess: (state) => {
      state.offset = (state.offset || 0) - 1;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getJobs.pending, (state) => {
      if (!state.isLoading) state.isLoading = true;
    });
    builder.addCase(getJobs.fulfilled, (state, action) => {
      const initial = action.meta.arg.initial;
      const offset = state.offset;
      const realOffset = Math.round(state.data.length / limit);
      const cond = offset !== undefined && offset + 1 < realOffset;
      state.data = !!initial
        ? (action.payload as any)
        : cond
        ? action.payload
        : [...state.data, ...(action.payload as any)];

      state.offset = !!initial ? 0 : (state.offset || 0) + 1;
      state.isLoading = false;
    });
    builder.addCase(getJobs.rejected, (state) => {
      if (state.isLoading) state.isLoading = false;
    });
  },
});

export const { jobsLoadLess } = jobsSlice.actions;
export default jobsSlice.reducer;
