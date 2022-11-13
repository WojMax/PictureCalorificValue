import HttpApi from "../services/Api/HttpApi";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

export type Meal = {
  id: number;
  meal_name: string;
  calories_on_100g: number;
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
    const response = await HttpApi.get("favourites");
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
