import axios from "axios";
import { getToken } from "./getToken";

class Api {
  apiName: string;
  constructor(apiName: string) {
    this.apiName = apiName;
  }

  async get(path: string, queryString?: string) {
    return axios.get(`${this.apiName}/${path}`, {
      headers: {
        Authorization: await getToken(),
      },
    });
  }

  async put(path: string, data?: Object) {
    return axios.put(`${this.apiName}/${path}`, data, {
      headers: {
        Authorization: await getToken(),
      },
    });
  }

  async post(path: string, data?: Object) {
    return axios.post(`${this.apiName}/${path}`, data, {
      headers: {
        Authorization: await getToken(),
      },
    });
  }

  async patch(path: string, data?: Object) {
    return axios.patch(`${this.apiName}/${path}`, data, {
      headers: {
        Authorization: await getToken(),
      },
    });
  }

  async delete(path: string, data?: Object) {
    return axios.delete(`${this.apiName}/${path}`, data);
  }
}

export default Api;
