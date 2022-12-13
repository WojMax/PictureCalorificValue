import HttpApi from "../services/Api/HttpApi";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

export type WeightChart = {
  data: Date;
};

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
}

const initialState: ProfileState = {
  caloricDemand: 0,
  profile: null,
};

export const getWeightList = createAsyncThunk("getWeightList", async () => {
  console.log("weight");
  try {
    const response = await HttpApi.get("weight");
    console.log(response.data);
  } catch (error) {
    console.error(error);
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
    builder.addCase(getWeightList.fulfilled, (state, { payload }) => {});
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
