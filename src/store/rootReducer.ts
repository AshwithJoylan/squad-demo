import { combineReducers } from '@reduxjs/toolkit';
import drawer from './features/drawer';
import jobs from './features/jobs';
import announcements from './features/announcements';
import articles from './features/articles';

// Root Reducer
const rootReducer = combineReducers({
  drawer,
  jobs,
  announcements,
  articles,
});

/**
 * Root Reducer State
 */
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
