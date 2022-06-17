import { createSlice } from '@reduxjs/toolkit';
import { DefaultRootState } from 'react-redux';

const drawerSlice = createSlice({
  name: 'drawer',
  initialState: { isOpened: false },
  reducers: {
    toggleDrawer: (state) => {
      state.isOpened = !state.isOpened;
    },
  },
});
export const drawerOpenSelector = (state: DefaultRootState) => state.drawer.isOpened

export const { toggleDrawer } = drawerSlice.actions;

export default drawerSlice.reducer;
