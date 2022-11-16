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
  date: string;
}

const initialState: HomeState = {
  meals: null,
  selectedMeal: null,
  date: new Date().toString(),
};

export const getHomeMeals = createAsyncThunk(
  "getHomeMeals",
  async (selectedDate: string) => {
    let data: { meals: MealObject | null } = { meals: null };

    const date = new Date(selectedDate);
    const transformedDate =
      date.getUTCFullYear() + "-" + date.getUTCMonth() + "-" + date.getDate();

    try {
      console.log(transformedDate);
      const response = await HttpApi.get("meal", transformedDate);
      const MealObject: MealObject = {
        breakfast: {
          meals: [
            {
              id: 88,
              meal_name: "Tost",
              calories_on_100g: 100,
              meal_weight: 54,
              calories: 54,
            },
            {
              id: 64,
              meal_name: "kanapka z serem",
              calories_on_100g: 280,
              meal_weight: 60,
              calories: 168,
            },
            {
              id: 66,
              meal_name: "kanapka z szynka",
              calories_on_100g: 241,
              meal_weight: 65,
              calories: 156,
            },
            {
              id: 70,
              meal_name: "Tost",
              calories_on_100g: 60,
              meal_weight: 200,
              calories: 120,
            },
            {
              id: 79,
              meal_name: "Jablko",
              calories_on_100g: 50,
              meal_weight: 50,
              calories: 25,
            },
            {
              id: 65,
              meal_name: "Kawa",
              calories_on_100g: 15,
              meal_weight: 250,
              calories: 37,
            },
            {
              id: 78,
              meal_name: "Jabłko ",
              calories_on_100g: 55,
              meal_weight: 58,
              calories: 31,
            },
          ],
          calories: 591,
        },
        lunch: {
          meals: [
            {
              id: 91,
              meal_name: "Banan",
              calories_on_100g: 44,
              meal_weight: 300,
              calories: 132,
            },
            {
              id: 92,
              meal_name: "Tost",
              calories_on_100g: 65,
              meal_weight: 250,
              calories: 162,
            },
            {
              id: 60,
              meal_name: "Salad",
              calories_on_100g: 140,
              meal_weight: 240,
              calories: 336,
            },
            {
              id: 67,
              meal_name: "Jabłko ",
              calories_on_100g: 70,
              meal_weight: 100,
              calories: 70,
            },
          ],
          calories: 700,
        },
        dinner: {
          meals: [
            {
              id: 61,
              meal_name: "Kalafior",
              calories_on_100g: 50,
              meal_weight: 250,
              calories: 125,
            },
            {
              id: 62,
              meal_name: "Pizza slice",
              calories_on_100g: 340,
              meal_weight: 58,
              calories: 197,
            },
          ],
          calories: 322,
        },
        snacks: {
          meals: [],
          calories: 0,
        },
      };
      return { meals: MealObject };
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
