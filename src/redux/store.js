import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';

import playerReducer from './features/playerSlice';
import { shazamCoreApi } from './services/shazamCore';

//boiler plate code for redux application
export const store = configureStore({
  reducer: {
    [shazamCoreApi.reducerPath]: shazamCoreApi.reducer,
    player: playerReducer,
  },
  middleware: (getDefaultMiddleware)=> getDefaultMiddleware().concat(shazamCoreApi.middleware)  //specifying default middleware, in concat function we add all the reducers of our app here we have only one
});
