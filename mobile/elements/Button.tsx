import { Button as ElementsButton } from "@rneui/base";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

type Props = {
  title: string;
  color?: string;
  disabled?: boolean | undefined;
  outline?: boolean;
  onPress: () => void;
};

export default function Button(props: Props) {
  const colorScheme = useColorScheme();
  return (
    <ElementsButton
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
      disabled={props.disabled}
      title={props.title}
      type={props.outline ? "outline" : "solid"}
      onPress={props.onPress}
    />
  );
}

const containerStyle = {
  margin: 5,
  borderRadius: 50,
};

const buttonStyle = {
  paddingHorizontal: 20,
  borderRadius: 50,
};
