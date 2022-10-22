import axios from "axios";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

export type Meal = {
  meal_name: string;
  calories: number;
  category: string;
};

export interface FavoritesState {
  meals: Meal[];
  selectedMeal: Meal | null;
}

const initialState: FavoritesState = {
  meals: [],
  selectedMeal: null,
};

export const getFavMeals = createAsyncThunk("getFavMeals", async () => {
  let data: { meals: Meal[] } = { meals: [] };
  try {
    const response = await axios.get(
      "http://calorieappserverinz-env.eba-5zgigd3w.eu-central-1.elasticbeanstalk.com/favourites/15a227be-8a9e-438f-85b9-8abc7f6832bc"
    );
    data = { meals: response.data };
    return data;
  } catch (error) {
    return data;
  }
});

export const favMealsSlice = createSlice({
  name: "favMeals",
  initialState,
  reducers: {
    setFavMeal: (state, action: PayloadAction<Meal>) => {
      state.selectedMeal = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getFavMeals.fulfilled, (state, { payload }) => {
      state.meals = payload.meals;
    });
  },
});

export const { setFavMeal } = favMealsSlice.actions;

export default favMealsSlice.reducer;
