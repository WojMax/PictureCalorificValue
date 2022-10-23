import { Auth } from "aws-amplify";

export const getToken = async () => {
  return `Bearer ${(await Auth.currentSession()).getIdToken().getJwtToken()}`;
};
