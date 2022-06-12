import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import {
  ColorSchemeName,
  useColorScheme as _useColorScheme,
} from "react-native";

interface UserState {
  colorScheme: NonNullable<ColorSchemeName>;
  lang: string;
}

const initialState: UserState = {
  colorScheme: _useColorScheme() as NonNullable<ColorSchemeName>,
  lang: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLang: (state, action: PayloadAction<string>) => {
      state.lang = action.payload;
    },
    setColorScheme: (
      state,
      action: PayloadAction<NonNullable<ColorSchemeName>>
    ) => {
      state.colorScheme = action.payload;
    },
  },
});

export const { setLang } = userSlice.actions;

export default userSlice.reducer;
