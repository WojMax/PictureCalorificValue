import HttpApi from "../services/Api/HttpApi";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export type Profile = {
  age: number;
  exercise: string;
  gender: string;
  height: number;
  weight: number;
  activityID: number;
};

export interface ProfileState {
  caloricDemand: number;
  profile: Profile | null;
  chartWeights: number[];
  chartDates: string[];
}

const initialState: ProfileState = {
  caloricDemand: 0,
  profile: null,
  chartWeights: [],
  chartDates: [],
};

export const getWeightList = createAsyncThunk("getWeightList", async () => {
  try {
    const response = await HttpApi.get("weight");
    let chartWeights: number[] = [];
    let chartDates: string[] = [];
    console.log(response.data);
    response.data.forEach((value: { weight: number; weight_date: string }) => {
      if (value.weight && value.weight_date) {
        chartWeights.push(value.weight);
        chartDates.push(value.weight_date);
      }
    });
    return { chartDates, chartWeights };
  } catch (error) {
    console.error(error);
    return { chartDates: [], chartWeights: [] };
  }
});

export const getCaloricDemand = createAsyncThunk(
  "getCaloricDemand",
  async () => {
    try {
      const response = await HttpApi.get("caloricDemand");
      if (response.data.caloricDemand) {
        return { caloricDemand: Math.ceil(response.data.caloricDemand) };
      }
      return { caloricDemand: -1 };
    } catch (error) {
      console.error(error);
      return { caloricDemand: 0 };
    }
  }
);

export const getProfile = createAsyncThunk("getProfile", async () => {
  try {
    const response = await HttpApi.get("profile");
    console.log(response.data);
    return { profile: response.data };
  } catch (error) {
    console.error(error);
    return { profile: null };
  }
});

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getWeightList.fulfilled, (state, { payload }) => {
      state.chartWeights = payload.chartWeights;
      state.chartDates = payload.chartDates;
    });
    builder.addCase(getProfile.fulfilled, (state, { payload }) => {
      state.profile = payload.profile;
    });
    builder.addCase(getCaloricDemand.fulfilled, (state, { payload }) => {
      state.caloricDemand = payload.caloricDemand;
    });
  },
});

export const {} = profileSlice.actions;

export default profileSlice.reducer;
