import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

// Interceptor to include JWT token in requests
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/login", data);
export const fetchHotels = () => axios.get("http://localhost:5000/public/hotels.json");
export const bookHotel = (data) => API.post("/booking/book", data);
export const webCheckIn = (data) => API.post("/booking/checkin", data);
