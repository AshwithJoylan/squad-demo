import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer';

// ==============================|| REDUX - MAIN STORE ||============================== //

const store = configureStore({ reducer: rootReducer });

export const dispatch = store.dispatch;

export default store;
