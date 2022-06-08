import { Input as ElementsInput } from "@rneui/base";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";

type Props = {
  label?: string;
  placeholder?: string;
  keyboardType?: string;
  outline?: boolean;
  onPress?: () => void;
};

export default function Input(props: Props) {
  const colorScheme = useColorScheme();

  return (
    <ElementsInput
      label={props.label}
      placeholder={props.placeholder}
      // @ts-ignore
      keyboardType={props.keyboardType}
      labelStyle={{ color: Colors.general.accentLight }}
      containerStyle={{
        paddingHorizontal: 10,
      }}
      inputContainerStyle={{
        borderColor: Colors[colorScheme].textDark,
      }}
      inputStyle={{
        color: Colors[colorScheme].text,
      }}
    />
  );
}
