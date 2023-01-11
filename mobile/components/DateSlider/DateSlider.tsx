import { View } from "../Themed";
import Colors from "../../constants/Colors";
import useColorScheme from "../../hooks/useColorScheme";
import { useEffect, useRef, useState } from "react";
import { FlatList, StyleSheet, Animated } from "react-native";
import DateListItem from "./DateListItem";
import { View as DefaultView } from "react-native";
import { useAppDispatch } from "../../hooks/useRedux";
import { getHomeMeals, setDate } from "../../redux/homeSlice";

export default function DateSlider() {
  const [dates, setDates] = useState<Date[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    getLastDates();
    set(new Date());
  }, []);

  const opacityAnimation = useRef(new Animated.Value(0.5)).current;
  const opacityStyle = { opacity: opacityAnimation };
  const animateElement = () => {
    Animated.timing(opacityAnimation, {
      toValue: 0,
      duration: 0,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(opacityAnimation, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }).start();
    });
  };

  const getDatesList = (start: any, end: any): Date[] => {
    for (
      var arr: Date[] = [], dt = new Date(end);
      dt >= new Date(start);
      dt.setDate(dt.getDate() - 1)
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
    animateElement();
  };

  const set = (date: Date) => {
    dispatch(setDate(date.toString()));
  };

  return (
    <DefaultView style={styles.container}>
      <Animated.View style={[opacityStyle]}>
        <FlatList
          initialScrollIndex={0}
          inverted={true}
          horizontal={true}
          data={dates}
          renderItem={({ item }) => (
            <DateListItem date={item} DateOnPress={() => set(item)} />
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </Animated.View>
    </DefaultView>
  );
}

const styles = StyleSheet.create({
  container: { height: 80 },
  list: { display: "flex", flexDirection: "row" },
});
