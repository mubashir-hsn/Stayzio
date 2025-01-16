import { configureStore } from '@reduxjs/toolkit';
import { blogApi } from './blog/blogApi';
import {authApi} from './auth/authApi';
import {commentApi} from './comment/comment';

export const store = configureStore({
  reducer: {
    [blogApi.reducerPath]: blogApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [commentApi.reducerPath]: commentApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(blogApi.middleware, authApi.middleware , commentApi.middleware),
});


// setupListeners(store.dispatch)