import {
  ColorSchemeName,
  useColorScheme as _useColorScheme,
} from "react-native";
import * as SecureStore from "expo-secure-store";

let color_scheme = "dark" as NonNullable<ColorSchemeName>;

export const loadColorScheme = async () => {
  const colorScheme = (await SecureStore.getItemAsync(
    "colorScheme"
  )) as ColorSchemeName;
  if (colorScheme != null) {
    color_scheme = colorScheme;
  } else {
    color_scheme = "dark";
    await SecureStore.setItemAsync("colorScheme", color_scheme);
  }
  return;
};

export const changeColorScheme = (color: NonNullable<ColorSchemeName>) => {
  color_scheme = color;
  return;
};

export default function useColorScheme(): NonNullable<ColorSchemeName> {
  return color_scheme as NonNullable<ColorSchemeName>;
}
