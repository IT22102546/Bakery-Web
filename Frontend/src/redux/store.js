import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import userReducer from './user/userSlice';
import productsReducer from './product/productSlice';
import sweetsReducer from './sweet/sweetSlice';
import { productsApi } from './product/productApi';
import { sweetsApi } from './sweet/sweetApi';
import cartReducer, { getCartTotal } from './cart/cartSlice';

const rootReducer = combineReducers({
  user: userReducer,
  products: productsReducer,
  sweets: sweetsReducer,
  cart: cartReducer,
  [productsApi.reducerPath]: productsApi.reducer,
  [sweetsApi.reducerPath]: sweetsApi.reducer,
});

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false })
      .concat(productsApi.middleware)
      .concat(sweetsApi.middleware),
});

store.dispatch(getCartTotal());

export const persistor = persistStore(store);