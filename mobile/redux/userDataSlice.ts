import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import {
  ColorSchemeName,
  useColorScheme as _useColorScheme,
} from "react-native";
import i18n from "i18n-js";

interface UserState {
  colorScheme: string;
  lang: string;
}

const initialState: UserState = {
  colorScheme: "",
  lang: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setLangReducer: (state, action: PayloadAction<string>) => {
      state.lang = action.payload;
      i18n.locale = action.payload;
    },
    setColorSchemeReducer: (
      state,
      action: PayloadAction<NonNullable<ColorSchemeName>>
    ) => {
      state.colorScheme = action.payload;
    },
  },
});

export const { setLangReducer, setColorSchemeReducer } = userSlice.actions;

export default userSlice.reducer;
