import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { DefaultRootState } from 'react-redux';

const initialState: { isLoading: boolean; data: any[]; offset?: number } = {
  isLoading: true,
  data: [],
  offset: undefined,
};

const limit = 4;

const res = [
  {
    id: 213,
    title: 'Announcement 1',
    shortDescription: 'Time to go full scope',
    longDescription:
      'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.',
  },
  {
    id: 321,
    title: 'Announcement 2',
    shortDescription: 'Time to go full scope',
    longDescription:
      'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.',
  },
  {
    id: 453,
    title: 'Announcement 3',
    time: 2,
    shortDescription: 'Time to go full scope',
    longDescription:
      'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.',
  },
  {
    id: 645,
    title: 'Announcement 4',
    shortDescription: 'Time to go full scope',
    longDescription:
      'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.',
  },
];

export const getAnnouncements = createAsyncThunk<
  any,
  { url?: string; initial?: boolean; type?: 'more' | 'less' }
>('announcements/get', async ({ url }, { getState, rejectWithValue }) => {
  try {
    console.log('state getJobs');
    const state = getState() as DefaultRootState;
    const offset = state.announcements.offset;
    const realOffset = Math.round(state.announcements.data.length / limit);

    console.log('c', (offset || 0) + 1, realOffset);
    if (offset !== undefined && offset + 1 < realOffset) {
      return state.announcements.data;
    }
    // const offset = (getState() as DefaultRootState).announcements.offset || 0;
    // console.log('offset:', offset);
    // const response = await Api.get(url, {
    //   offset: offset + limit,
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

export const announcementsLoadingSelector = (state: DefaultRootState) =>
  state.announcements.isLoading;

export const announcementsSelector = (state: DefaultRootState) =>
  state.announcements.data.slice(
    limit * (state.announcements.offset || 0),
    limit * ((state.announcements.offset || 0) + 1)
  );

export const announcementsOffsetSelector = (state: DefaultRootState) =>
  state.announcements.offset;

const announcementsSlice = createSlice({
  name: 'announcements',
  initialState: initialState,
  reducers: {
    announcementsLoadLess: (state) => {
      state.offset = (state.offset || 0) - 1;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAnnouncements.pending, (state) => {
      if (!state.isLoading) state.isLoading = true;
    });
    builder.addCase(getAnnouncements.fulfilled, (state, action) => {
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
    builder.addCase(getAnnouncements.rejected, (state) => {
      if (state.isLoading) state.isLoading = false;
    });
  },
});

export const { announcementsLoadLess } = announcementsSlice.actions;

export default announcementsSlice.reducer;
