import { Button } from "@rneui/base";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

type Props = {
  title: string;
  color?: string;
  outline?: boolean;
  onPress: () => void;
};

export default function ButtonBasic(props: Props) {
  const colorScheme = useColorScheme();
  return (
    <Button
      buttonStyle={
        props.outline
          ? props.color
            ? [buttonStyle, { borderColor: props.color }]
            : [buttonStyle, { borderColor: Colors[colorScheme].accent }]
          : buttonStyle
      }
      containerStyle={containerStyle}
      color={props.color ? props.color : Colors[colorScheme].accent}
      titleStyle={
        props.outline
          ? props.color
            ? { color: props.color }
            : { color: Colors[colorScheme].accent }
          : null
      }
      title={props.title}
      type={props.outline ? "outline" : "solid"}
      onPress={props.onPress}
    />
  );
}

const containerStyle = {
  margin: 5,
};

const buttonStyle = {
  paddingHorizontal: 20,
  borderRadius: 50,
};
