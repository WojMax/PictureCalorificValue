import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";

import { store } from "./redux/store";
import { Provider } from "react-redux";
import { Amplify } from "aws-amplify";
// @ts-ignore
import { withAuthenticator, AmplifyTheme } from "aws-amplify-react-native";
import config from "./src/aws-exports.js";
import Colors from "./constants/Colors";
import { View } from "./components/Themed";
import { StyleSheet } from "react-native";

Amplify.configure({
  ...config,
  Analytics: {
    disabled: true,
  },
});

const App = () => {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <Provider store={store}>
        <SafeAreaProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </SafeAreaProvider>
      </Provider>
    );
  }
};

const signUpConfig = {
  header: "Create account",
  hideAllDefaults: true,
  signUpFields: [
    {
      label: "Email",
      key: "username",
      required: true,
      displayOrder: 1,
      type: "string",
    },
    {
      label: "Password",
      key: "password",
      required: true,
      displayOrder: 2,
      type: "password",
    },
  ],
};

const signInConfig = {
  header: "Calorie app",
  hideAllDefaults: true,
  signInFields: [
    {
      label: "Email",
      key: "username",
      required: true,
      displayOrder: 1,
      type: "string",
    },
    {
      label: "Password",
      key: "password",
      required: true,
      displayOrder: 2,
      type: "password",
    },
  ],
};

const colors = {
  accent: "#448aff",
  accentLight: "#83b9ff",
  surface: "#121212",
};

const amplifyTheme = {
  ...AmplifyTheme,
  button: {
    ...AmplifyTheme.button,
    backgroundColor: colors.accent,
  },
  buttonDisabled: {
    ...AmplifyTheme.buttonDisabled,
    backgroundColor: colors.accentLight,
  },
  container: {
    ...AmplifyTheme.container,
  },
  sectionFooterLink: {
    ...AmplifyTheme.sectionFooterLink,
    color: colors.accent,
  },
};

export default withAuthenticator(App, {
  signUpConfig,
  signInConfig,
  theme: amplifyTheme,
});
