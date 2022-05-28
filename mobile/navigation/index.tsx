import {
  FontAwesome,
  FontAwesome5,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import { ColorSchemeName, Pressable } from "react-native";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import SettingsScreen from "../screens/SettingsScreen";
import HomeScreen from "../screens/HomeScreen";
import FavoritesScreen from "../screens/FavoritesScreen";
import ProfileScreen from "../screens/ProfileScreen";
import { RootTabParamList } from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import AddScreen from "../screens/AddScreen";

const BottomTab = createBottomTabNavigator<RootTabParamList>();

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  const iconMargin = 3;
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <BottomTab.Navigator screenOptions={{ headerShown: false }}>
        <BottomTab.Screen
          name="HomeStack"
          component={HomeStackNavigator}
          options={{
            title: "Home",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="silverware-fork-knife"
                size={size - 3}
                color={color}
              />
            ),
            tabBarItemStyle: {
              marginBottom: iconMargin,
            },
          }}
        />
        <BottomTab.Screen
          name="FavoritesStack"
          component={FavoritesStackNavigator}
          options={{
            title: "Favorites",
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="favorite" size={size - 3} color={color} />
            ),
            tabBarItemStyle: {
              marginBottom: iconMargin,
            },
          }}
        />
        <BottomTab.Screen
          name="ProfileStack"
          component={ProfileStackNavigator}
          options={{
            title: "Profile",
            tabBarIcon: ({ color, size }) => (
              <FontAwesome5 name="user-alt" size={size - 3} color={color} />
            ),
            tabBarItemStyle: {
              marginBottom: iconMargin,
            },
          }}
        />
      </BottomTab.Navigator>
    </NavigationContainer>
  );
}

const HomeStack = createNativeStackNavigator();

function HomeStackNavigator() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <HomeStack.Screen name="Add" component={AddScreen} />
    </HomeStack.Navigator>
  );
}

const FavoritesStack = createNativeStackNavigator();

function FavoritesStackNavigator() {
  return (
    <FavoritesStack.Navigator>
      <FavoritesStack.Screen name="Favorites" component={FavoritesScreen} />
    </FavoritesStack.Navigator>
  );
}

const ProfileStack = createNativeStackNavigator();

function ProfileStackNavigator() {
  const colorScheme = useColorScheme();

  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen
        name="Profile"
        component={ProfileScreen}
        options={({ navigation }) => ({
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate("Settings")}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <FontAwesome
                name="gear"
                size={24}
                color={Colors[colorScheme].text}
                style={{ marginRight: 5 }}
              />
            </Pressable>
          ),
        })}
      />
      <ProfileStack.Screen name="Settings" component={SettingsScreen} />
    </ProfileStack.Navigator>
  );
}
