var colors = {
  mainAccent: "#448aff",
  surface: "#121212",
  topSurface: "#282828",
};

export default {
  light: {
    //text
    text: "#000",
    //areas
    background: "#fff",
    surface: colors.surface,
    topSurface: colors.topSurface,
    //mainColors
    accent: colors.mainAccent,
    //navButtons
    tabIconDefault: "#ccc",
    tabIconSelected: colors.mainAccent,
  },
  dark: {
    //text
    text: "#fff",
    //areas
    background: "#000",
    surface: colors.surface,
    topSurface: colors.topSurface,
    //mainColors
    accent: colors.mainAccent,
    //navButtons
    tabIconDefault: "#ccc",
    tabIconSelected: colors.mainAccent,
  },
  general: {
    accent: colors.mainAccent,
    cameraGray: colors.surface,
    topSurface: colors.topSurface,
    green: "#0F9D58",
    red: "#ef5350",
  },
};
