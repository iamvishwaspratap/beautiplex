import axios from "axios";

const API_URL = "http://localhost:8082/api";

export const registerUser = async (user) => {
  const response = await axios.post(`${API_URL}/users/register`, user);
  return response.data;
};

export const loginUser = async (loginRequest) => {
  const response = await axios.post(`${API_URL}/users/login`, loginRequest);
  return response.data;
};
