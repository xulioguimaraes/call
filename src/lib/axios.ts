import axios from "axios";

export const api = axios.create({
  baseURL: "/api",
  // baseURL: "https://call-inky.vercel.app/api",
});
