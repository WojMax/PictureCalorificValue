import HttpApi from "../services/Api/HttpApi";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import i18n from "i18n-js";

export type Meal = {
  proposed_meal_weight: number;
  meal_name: string;
  calories_on_100g: number;
};

export interface MostPopularState {
  meals: Meal[];
  selectedMeal: Meal | null;
}

const initialState: MostPopularState = {
  meals: [],
  selectedMeal: null,
};




export const getMPMeals = createAsyncThunk("getMPMeals", async () => {
  let data: { meals: Meal[] } = { meals: [] };
  try {
    const lang= i18n.locale
    let lang1=""
    if(lang==="en-US"){
      lang1="eng"
    }
    else{
      lang1="pl"
    }
    const response = await HttpApi.get("popular",lang1);
    data = { meals: response.data };
    return data;
  } catch (error) {
    console.error(error);
    return data;
  }
});

export const MPMealsSlice = createSlice({
  name: "MPMeals",
  initialState,
  reducers: {
    setMPMeal: (state, action: PayloadAction<Meal>) => {
      state.selectedMeal = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMPMeals.fulfilled, (state, { payload }) => {
      state.meals = payload.meals;
    });
  },
});

export const { setMPMeal } = MPMealsSlice.actions;

export default MPMealsSlice.reducer;
