import 'react-redux';
import { RootState } from './rootReducer';

declare module 'react-redux' {
  interface DefaultRootState extends RootState {}
}
