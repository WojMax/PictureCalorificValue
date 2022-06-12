import { StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import { useEffect, useState } from "react";
import * as SecureStore from "expo-secure-store";
import Button from "../elements/Button";
import t from "../services/translations";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import { setLangReducer } from "../redux/userDataSlice";

export default function SettingsScreen() {
  const dispatch = useAppDispatch();

  const [lang, setLang] = useState(useAppSelector((state) => state.user.lang));

  useEffect(() => {
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

  return (
    <View style={styles.container}>
      <Button title={t("common.addProduct")} onPress={changeLang} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
