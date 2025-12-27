import axios from "axios";

/*
Central axios instance
So we don't repeat backend URL everywhere
*/
const api = axios.create({
  baseURL: "http://127.0.0.1:8000", // FastAPI server
  withCredentials: true, // useful later for auth/cookies
});

export default api;
