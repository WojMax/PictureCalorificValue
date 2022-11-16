import HttpApi from "../services/Api/HttpApi";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

export type Meal = {
  id: number;
  meal_name: string;
  calories: number;
  calories_on_100g: number;
  meal_weight: number;
};

export type MealObject = {
  breakfast: {
    meals: Meal[];
    calories: number;
  };
  lunch: {
    meals: Meal[];
    calories: number;
  };
  dinner: { meals: Meal[]; calories: number };
  snacks: { meals: Meal[]; calories: number };
};

export interface HomeState {
  meals: MealObject | null;
  selectedMeal: any | null;
  caloriesCount: number;
  date: string;
}

const initialState: HomeState = {
  meals: null,
  selectedMeal: null,
  caloriesCount: 0,
  date: new Date().toString(),
};

export const getHomeMeals = createAsyncThunk(
  "getHomeMeals",
  async (selectedDate: string) => {
    let data: { meals: MealObject | null } = { meals: null };

    const date = new Date(selectedDate);
    const transformedDate =
      date.getUTCFullYear() +
      "-" +
      (date.getUTCMonth() + 1) +
      "-" +
      date.getDate();

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
      const meals = payload.meals;
      state.meals = meals;

      if (meals?.lunch) {
        state.caloriesCount =
          meals.lunch.calories +
          meals.dinner.calories +
          meals.breakfast.calories +
          meals.snacks.calories;
      } else {
        state.caloriesCount = 0;
      }
    });
  },
});

export const { setHomeMeal, setDate } = homeMealsSlice.actions;

export default homeMealsSlice.reducer;
