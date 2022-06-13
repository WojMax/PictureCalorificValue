import { StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import Button from "../elements/Button";
import t from "../services/translations";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import { setColorSchemeReducer, setLangReducer } from "../redux/userDataSlice";
import i18n from "i18n-js";
import Colors from "../constants/Colors";
import Switch from "../elements/Switch";
import { changeColorScheme } from "../hooks/useColorScheme";

export default function SettingsScreen() {
  const dispatch = useAppDispatch();

  const [lang, setLang] = useState(useAppSelector((state) => state.user.lang));
  const [colorScheme, setColorScheme] = useState<string>(
    useAppSelector((state) => state.user.colorScheme)
  );
  const [darkColorScheme, setDarkColorScheme] = useState(true);

  useEffect(() => {
    setDarkColorScheme(colorScheme == "dark");
    //langs
    SecureStore.getItemAsync("lang").then((userLang) => {
      if (userLang != null) {
        setLang(userLang);
      }
    });
  }, []);

  const changeLang = async () => {
    let userLang = "";
    if (lang === "en-US") {
      userLang = "pl-PL";
    } else {
      userLang = "en-US";
    }
    dispatch(setLangReducer(userLang));
    await SecureStore.setItemAsync("lang", userLang);
    setLang(userLang);
  };

  const changeColor = async () => {
    setDarkColorScheme(!darkColorScheme);
    if (!darkColorScheme) {
      dispatch(setColorSchemeReducer("dark"));
      changeColorScheme("dark");
      await SecureStore.setItemAsync("colorScheme", "dark");
    } else {
      dispatch(setColorSchemeReducer("light"));
      changeColorScheme("light");
      await SecureStore.setItemAsync("colorScheme", "light");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.settingContainer}>
        <Text style={styles.title}>{"Change language"}</Text>
        <Button title={t("common.addProduct")} onPress={changeLang} />
      </View>
      <View style={styles.settingContainer}>
        <Text style={styles.title}>{"Dark mode"}</Text>
        <Switch value={darkColorScheme} onValueChange={() => changeColor()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
  },
  settingContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    paddingBottom: 5,
  },
  title: {
    fontSize: 16,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
