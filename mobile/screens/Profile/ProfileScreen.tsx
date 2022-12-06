import { StyleSheet, TouchableOpacity } from "react-native";
import { View } from "../../components/Themed";
import Account from "../../components/Profile/Account";
import Weight from "../../components/Profile/Weight";
import User from "../../components/Profile/User";
import Objective from "../../components/Profile/Objective";

export default function ProfileScreen(props: any) {
  return (
    <View style={styles.container}>
      <View style={styles.containerFullWidth}>
        <Weight />
      </View>
      <View style={styles.containerFullWidth}>
        <View style={styles.containerFullWidth}>
          <Account />
        </View>
        <TouchableOpacity
          onPress={() => props.navigation.navigate("EditUser")}
          style={styles.containerFullWidth}
        >
          <User />
        </TouchableOpacity>
      </View>
      <View style={styles.containerFullWidth}>
        <Objective />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerFullWidth: { flex: 1, flexDirection: "row" },
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
