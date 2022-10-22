import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userDataSlice";
import favoritesReducer from "./favoritesSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    favMeal: favoritesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
