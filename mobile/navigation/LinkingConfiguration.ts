import { LinkingOptions } from "@react-navigation/native";
import * as Linking from "expo-linking";

import { RootStackParamList } from "../types";

const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [Linking.makeUrl("/")],
  config: {
    screens: {
      Root: {
        screens: {
          HomeStack: {
            screens: {
              HomeScreen: "home",
              AddForm: "addForm",
              AddScreen: "add",
            },
          },
          FavoritesStack: {
            screens: {
              FavoritesScreen: "favorites",
            },
          },
          ProfileStack: {
            screens: {
              ProfileScreen: "profile",
              SettingsScreen: "settings",
            },
          },
        },
      },
      Camera: "camera",
      AddProfile: "addProfile",
    },
  },
};

export default linking;
