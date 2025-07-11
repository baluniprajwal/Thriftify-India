import { configureStore } from '@reduxjs/toolkit';
import { userApi } from './apis/userApi';
import authReducer from './reducers/authReducer'
import { productApi } from './apis/productApis';
import  cartReducer  from './reducers/cartReducer';


export const store = configureStore({
  reducer: {
    [userApi.reducerPath] : userApi.reducer,
    [productApi.reducerPath] : productApi.reducer,
    auth : authReducer,
    cart : cartReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware,productApi.middleware),
});

// Infer the `RootState` and `AppDispatch` types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
