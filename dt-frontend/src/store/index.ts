import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { api } from '../services/api';

import drawerReducer from "./slices/drawerSlice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer, // Add RTK Query reducer
    drawer: drawerReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware), // Add RTK Query middleware
});

// Optional: Setup listeners for cache updates
setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
