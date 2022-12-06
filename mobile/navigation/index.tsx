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
import ProfileScreen from "../screens/Profile/ProfileScreen";
import { RootStackParamList, RootTabParamList } from "../types";
import LinkingConfiguration from "./LinkingConfiguration";
import AddFormScreen from "../screens/AddFormScreen";
import AddFavScreen from "../screens/AddFavScreen";
import AddScreen from "../screens/AddScreen";
import AddFromListsScreen from "../screens/AddFromListsScreen";
import CameraScreen from "../screens/CameraScreen";
import t from "../services/translations";
import EditFormScreen from "../screens/EditFormScreen";
import EditFavScreen from "../screens/EditFavScreen";
import AddProfileScreen from "../screens/Profile/AddProfileScreen";
import EditUserScreen from "../screens/Profile/EditUserScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigation({
  colorScheme,
}: {
  colorScheme: ColorSchemeName;
}) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
    >
      <Stack.Navigator>
        <Stack.Screen
          name="Root"
          component={BottomTabNavigator}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Camera" component={CameraScreen} />
        <Stack.Screen
          name="AddProfile"
          component={AddProfileScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  const iconMargin = 3;

  return (
    <BottomTab.Navigator
      initialRouteName="HomeStack"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: Colors[colorScheme].accent,
      }}
    >
      <BottomTab.Screen
        name="HomeStack"
        component={HomeStackNavigator}
        options={{
          title: t("navigation.home"),
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
          title: t("navigation.favorites"),
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
          title: t("navigation.profile"),
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="user-alt" size={size - 3} color={color} />
          ),
          tabBarItemStyle: {
            marginBottom: iconMargin,
          },
        }}
      />
    </BottomTab.Navigator>
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
      <HomeStack.Screen
        name="Add"
        component={AddScreen}
        options={{
          title: t("common.add"),
        }}
      />
      <HomeStack.Screen
        name="AddList"
        component={AddFromListsScreen}
        options={{
          title: t("common.addProduct"),
        }}
      />
      <HomeStack.Screen
        name="AddForm"
        component={AddFormScreen}
        options={{
          title: t("common.addProduct"),
        }}
      />
      <HomeStack.Screen
        name="Edit"
        component={EditFormScreen}
        options={{
          title: t("editScreen.edit"),
        }}
      />
    </HomeStack.Navigator>
  );
}

const FavoritesStack = createNativeStackNavigator();

function FavoritesStackNavigator() {
  return (
    <FavoritesStack.Navigator>
      <FavoritesStack.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{
          title: t("navigation.favorites"),
        }}
      />
      <FavoritesStack.Screen
        name="Edit"
        component={EditFavScreen}
        options={{
          title: t("common.addFav"),
        }}
      />
      <FavoritesStack.Screen
        name="AddFav"
        component={AddFavScreen}
        options={{
          title: t("common.addFav"),
        }}
      />
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
          title: t("navigation.profile"),
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
      <ProfileStack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: t("navigation.settings"),
        }}
      />
      <ProfileStack.Screen
        name="EditUser"
        component={EditUserScreen}
        options={{
          title: "Edit profile",
        }}
      />
    </ProfileStack.Navigator>
  );
}
