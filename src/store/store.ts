import { configureStore } from "@reduxjs/toolkit";
import { shopAPI } from "../api/products";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

export const store = configureStore({
  reducer: {
    [shopAPI.reducerPath]: shopAPI.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(shopAPI.middleware),
});

setupListeners(store.dispatch);
