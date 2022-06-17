import { combineReducers } from '@reduxjs/toolkit';
import drawer from './features/drawer';
import jobs from './features/jobs';
// Root Reducer
const rootReducer = combineReducers({
  drawer,
  jobs,
});

/**
 * Root Reducer State
 */
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
