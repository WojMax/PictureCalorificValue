import { Button } from "@rneui/base";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

type Props = {
  title: string;
  onPress: () => void;
};

export default function ButtonBasic(props: Props) {
  const colorScheme = useColorScheme();

  return (
    <Button
      buttonStyle={{ width: 150 }}
      color={Colors[colorScheme].accent}
      containerStyle={styles}
      title={props.title}
      onPress={props.onPress}
    />
  );
}

const styles = {
  margin: 5,
  borderRadius: 10,
};
