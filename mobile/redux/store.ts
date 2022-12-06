import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userDataSlice";
import favoritesReducer from "./favoritesSlice";
import homeReducer from "./homeSlice";
import mostPopularReducer from "./mostPopularSlice";
import profileReducer from "./profileSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    favMeal: favoritesReducer,
    homeMeal: homeReducer,
    profile: profileReducer,
    MPMeal: mostPopularReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
