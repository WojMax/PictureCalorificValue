import { View } from "../Themed";
import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet } from "react-native";
import DateListItem from "./DateListItem";
import { View as DefaultView } from "react-native";
import { useAppDispatch } from "../../hooks/useRedux";
import { getHomeMeals, setDate } from "../../redux/homeSlice";

export default function DateSlider() {
  const [dates, setDates] = useState<Date[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    getLastDates();
  }, []);

  const getDatesList = (start: any, end: any): Date[] => {
    for (
      var arr: Date[] = [], dt = new Date(start);
      dt <= new Date(end);
      dt.setDate(dt.getDate() + 1)
    ) {
      arr.push(new Date(dt));
    }
    return arr;
  };

  const getLastDates = () => {
    const today = new Date();
    const beginDate = new Date().setDate(today.getDate() - 30);
    const futureDate = new Date().setDate(today.getDate() + 2);
    const dayList = getDatesList(beginDate, futureDate);
    dayList.map((v) => v.toISOString().slice(0, 10)).join("");
    setDates(dayList);
  };

  const set = (date: Date) => {
    dispatch(setDate(date.toString()));
  };

  return (
    <DefaultView style={styles.container}>
      <FlatList
        horizontal={true}
        inverted
        contentContainerStyle={{ flexDirection: "row-reverse" }}
        data={dates}
        renderItem={({ item }) => (
          <DateListItem date={item} DateOnPress={() => set(item)} />
        )}
        keyExtractor={(item, index) => index.toString()}
      />
    </DefaultView>
  );
}

const styles = StyleSheet.create({
  container: { height: 80 },
  list: { display: "flex", flexDirection: "row" },
});
