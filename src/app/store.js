import { configureStore } from '@reduxjs/toolkit';
import getDataReducerRoot from '../reducer/getDataSlice';
import getDataReducerByID from '../reducer/getDataUserByID';
import setAutoLoading from '../reducer/setLoadingPage';

export const store = configureStore({
  reducer: {
    getDataReducer: getDataReducerRoot,
    getDataReducerId: getDataReducerByID,
    autoLoading: setAutoLoading,
  },
});

