import HttpApi from "../services/Api/HttpApi";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

export type Meal = {
  id: number;
  meal_name: string;
  calories: number;
  calories_on_100g: number;
  meal_weight: number;
  category: string;
};

export interface HomeState {
  meals: Meal[];
  selectedMeal: Meal | null;
  dates: Date[];
}

const initialState: HomeState = {
  meals: [],
  selectedMeal: null,
  dates: [],
};

export const getHomeMeals = createAsyncThunk("getHomeMeals", async () => {
  let data: { meals: Meal[] } = { meals: [] };
  try {
    const response = await HttpApi.get("meal");
    data = { meals: response.data };
    return data;
  } catch (error) {
    console.error(error);
    return data;
  }
});

export const homeMealsSlice = createSlice({
  name: "homeMeals",
  initialState,
  reducers: {
    setHomeMeal: (state, action: PayloadAction<Meal>) => {
      state.selectedMeal = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getHomeMeals.fulfilled, (state, { payload }) => {
      state.meals = payload.meals;
    });
  },
});

export const { setHomeMeal } = homeMealsSlice.actions;

export default homeMealsSlice.reducer;
