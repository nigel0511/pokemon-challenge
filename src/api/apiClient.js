import axios from "axios";

const API_BASE_URL = "/pokemon";

export const getApiErrorMessage = (error) => {
  const defaultErrMsg =
    "Sorry, something went wrong. Please refresh and try again.";
  if (axios.isAxiosError(error)) {
    const data = error.response?.data;
    return data?.message ?? defaultErrMsg;
  }

  return defaultErrMsg;
};

export const ApiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 100000, // 100 secs
});
