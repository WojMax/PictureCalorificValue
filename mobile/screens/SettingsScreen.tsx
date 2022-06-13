import { StyleSheet } from "react-native";
import { Text, View} from "../components/Themed";
import { useEffect, useState } from "react";
import { Picker } from "@react-native-picker/picker";
import * as SecureStore from "expo-secure-store";
import Button from "../elements/Button";
import t from "../services/translations";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import { setColorSchemeReducer, setLangReducer } from "../redux/userDataSlice";
import i18n from "i18n-js";
import Colors from "../constants/Colors";
import Switch from "../elements/Switch";
import useColorScheme from "../hooks/useColorScheme";

export default function SettingsScreen() {
  const dispatch = useAppDispatch();
  const [chosenLang, setChosenLang] = useState('Unknown');
  const colo1Scheme=useColorScheme();
  const [lang, setLang] = useState(useAppSelector((state) => state.user.lang));
  
  const [colorScheme, setColorScheme] = useState<string>(
    useAppSelector((state) => state.user.colorScheme)
  );
  const [darkColorScheme, setDarkColorScheme] = useState(colorScheme == "dark");

  useEffect(() => {
    //langs
    SecureStore.getItemAsync("lang").then((userLang) => {
      if (userLang != null) {
        setLang(userLang);
      }
    });
  }, []);

  
  // let userLang = "";
  // if (chosenLang!="Unknown") {
  //   userLang=chosenLang
    
  // };
  // dispatch(setLangReducer(userLang));
  // SecureStore.setItemAsync("lang", userLang);
  // setLang(userLang);

  const changeColorScheme = async () => {
    if (darkColorScheme) {
      dispatch(setColorSchemeReducer("dark"));
      await SecureStore.setItemAsync("colorScheme", "dark");
    } else {
      dispatch(setColorSchemeReducer("light"));
      await SecureStore.setItemAsync("colorScheme", "light");
    }
    setDarkColorScheme(!darkColorScheme);
  };

  return (
    <View style={styles.container}>
      <View style={styles.settingContainer}>
        <Text style={styles.title}>{"Change language"}</Text>
      </View>
      <View style={styles.settingContainer}>
        <Picker
          selectedValue={chosenLang}
          onValueChange={(value, index) => [setChosenLang(value),dispatch(setLangReducer(value)),setLang(value)]}
          mode="dropdown" // Android only
          style={[{color: Colors[colo1Scheme].text},styles.picker]}
        >
        <Picker.Item label="Select language" value="Unknown" />
        <Picker.Item label="English" value="en-US" />
        <Picker.Item label="Polish" value="pl-PL" />
        </Picker>
      </View>
      <View style={styles.settingContainer}>
        <Text style={styles.title}>{"Dark mode"}</Text>
        <Switch
          value={darkColorScheme}
          onValueChange={() => changeColorScheme()}
        />
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
  picker: {
    width: "80%",
    padding: 10,
    borderWidth: 1,
    
  },
});
