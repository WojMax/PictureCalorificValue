import { StyleSheet, Dimensions } from "react-native";
import { Text, View } from "../Themed";
import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";
import { View as DefaultView } from "react-native";
import { Entypo } from "@expo/vector-icons";
import { BarChart } from "react-native-chart-kit";
import { useAppSelector } from "../../hooks/useRedux";
import t from "../../services/translations";

export default function Weight() {
  const colorScheme = useColorScheme();

  const chartDates = useAppSelector((state) => state.profile.chartDates);
  const chartWeights = useAppSelector((state) => state.profile.chartWeights);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: Colors[colorScheme].surface,
        },
      ]}
    >
      <DefaultView style={styles.account}>
        <Text
          style={[styles.dataText, { color: Colors[colorScheme].textDark }]}
        >
          {t("profile.weight_1")}
        </Text>
        <Entypo
          name="dots-three-horizontal"
          size={20}
          color={Colors[colorScheme].textLight}
          style={styles.icon}
        />
      </DefaultView>
      <DefaultView style={styles.data}>
        <BarChart
          data={{
            labels: chartDates,
            datasets: [
              {
                data: chartWeights,
              },
            ],
          }}
          width={Dimensions.get("window").width - 40} // from react-native
          height={190}
          withInnerLines={false}
          yAxisLabel={""}
          yAxisSuffix={""}
          chartConfig={{
            backgroundGradientFrom: Colors[colorScheme].surface,
            backgroundGradientTo: Colors[colorScheme].surface,
            decimalPlaces: 0, // optional, defaults to 2dp
            color: (opacity = 1) => Colors[colorScheme].accent,
            labelColor: (opacity = 1) => Colors[colorScheme].text,
          }}
          flatColor={true}
          fromZero={true}
          style={{ paddingRight: 45 }}
        />
      </DefaultView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    marginTop: 10,
    paddingBottom: 10,
    borderRadius: 6,
  },
  dataText: {
    fontSize: 14,
  },
  account: {
    flex: 1,
    marginTop: 10,
    marginHorizontal: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  data: {
    paddingTop: 10,
  },
  icon: {
    paddingRight: 2,
  },
});
