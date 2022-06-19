import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { DefaultRootState } from 'react-redux';
import { Api } from './config';

const initialState: { isLoading: boolean; data: any[]; offset?: number } = {
  isLoading: true,
  data: [],
  offset: undefined,
};

const limit = 4;

const res = [
  {
    id: 213,
    title: 'This is article 1',
    description:
      'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.',
  },
  {
    id: 321,
    title: 'This is article 2',
    description:
      'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.',
  },
  {
    id: 453,
    title: 'This is article 3',
    time: 2,
    description:
      'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.',
  },
  {
    id: 645,
    title: 'This is article 4',
    description:
      'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.',
  },
];

export const getArticles = createAsyncThunk<
  any,
  { url?: string; initial?: boolean; type?: 'more' | 'less' }
>('articles/get', async ({ url }, { getState, rejectWithValue }) => {
  try {
    console.log('state articles');
    const state = getState() as DefaultRootState;
    const offset = state.articles.offset;
    const realOffset = Math.round(state.articles.data.length / limit);

    console.log('c', (offset || 0) + 1, realOffset);
    if (offset !== undefined && offset + 1 < realOffset) {
      return state.articles.data;
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

export const articlesLoadingSelector = (state: DefaultRootState) =>
  state.articles.isLoading;

export const articlesSelector = (state: DefaultRootState) =>
  state.articles.data.slice(
    limit * (state.articles.offset || 0),
    limit * ((state.articles.offset || 0) + 1)
  );

export const articlesOffsetSelector = (state: DefaultRootState) =>
  state.articles.offset;

const articlesSlice = createSlice({
  name: 'announcements',
  initialState: initialState,
  reducers: {
    articlesLoadLess: (state) => {
      state.offset = (state.offset || 0) - 1;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getArticles.pending, (state) => {
      if (!state.isLoading) state.isLoading = true;
    });
    builder.addCase(getArticles.fulfilled, (state, action) => {
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
    builder.addCase(getArticles.rejected, (state) => {
      if (state.isLoading) state.isLoading = false;
    });
  },
});

export const { articlesLoadLess } = articlesSlice.actions;

export default articlesSlice.reducer;
