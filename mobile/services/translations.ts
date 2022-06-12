import i18n from "i18n-js";
import { useAppSelector } from "../hooks/useRedux";

export default function t(props: any) {
  useAppSelector((state) => state.user.lang);
  return i18n.t(props);
}
