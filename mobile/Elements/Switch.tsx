import { Switch as ElementsSwitch } from "@rneui/themed";
import Colors from "../constants/Colors";

type Props = {
  value: boolean;
  onValueChange: () => void;
};

export default function Switch(props: Props) {
  return (
    <ElementsSwitch
      trackColor={{ true: Colors.general.accentLight, false: "gray" }}
      color={Colors.general.accent}
      value={props.value}
      onValueChange={props.onValueChange}
    />
  );
}
