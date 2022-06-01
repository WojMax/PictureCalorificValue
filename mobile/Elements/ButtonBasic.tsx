import { Button } from "@rneui/base";
import Colors from "../constants/Colors";

type Props = {
  title: string;
  onPress: () => void;
};

export default function ButtonBasic(props: Props) {
  return (
    <Button
      buttonStyle={{ width: 150 }}
      color={Colors.general.accent}
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
