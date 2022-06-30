import axios from "axios";

const urlBase =
  process.env.NODE_ENV === "development" 
    ? process.env.NEXT_PUBLIC_LOCAL_BACKEND_URL + '/api' 
    : process.env.NEXT_PUBLIC_BACKEND_URL + '/api';

const apiCaller = axios.create({
  baseURL: urlBase,
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*",
  },
  withCredentials: true,
});

export default apiCaller;
