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
  date: string;
}

const initialState: HomeState = {
  meals: [],
  selectedMeal: null,
  date: "",
};

export const getHomeMeals = createAsyncThunk(
  "getHomeMeals",
  async (selectedDate: string) => {
    let data: { meals: Meal[] } = { meals: [] };

    const date = new Date(selectedDate);
    const transformedDate =
      date.getUTCFullYear() + "-" + date.getUTCMonth() + "-" + date.getDate();

    try {
      const response = await HttpApi.get("meal", transformedDate);
      data = { meals: response.data };
      return data;
    } catch (error) {
      console.error(error);
      return data;
    }
  }
);

export const homeMealsSlice = createSlice({
  name: "homeMeals",
  initialState,
  reducers: {
    setHomeMeal: (state, action: PayloadAction<Meal>) => {
      state.selectedMeal = action.payload;
    },
    setDate: (state, action: PayloadAction<string>) => {
      state.date = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getHomeMeals.fulfilled, (state, { payload }) => {
      state.meals = payload.meals;
    });
  },
});

export const { setHomeMeal, setDate } = homeMealsSlice.actions;

export default homeMealsSlice.reducer;
