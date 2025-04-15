import { configureStore } from '@reduxjs/toolkit';
import { userApi } from './apis/userApi';
import authReducer from './reducers/authReducer'

export const store = configureStore({
  reducer: {
    [userApi.reducerPath] : userApi.reducer,
    auth : authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
