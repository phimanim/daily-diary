import axios from "axios";

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});

export function login(credentials) {
  return api.post("/login", credentials);
}

export function signup(credentials) {
  return api.post("/signup", credentials);
}

export function logout() {
  return api.post("/logout");
}

export function isLoggedIn() {
  return api.get("/login");
}
// Daily
export function getDailys() {
  return api.get("/dailys");
}
export function getDailyById(dailyId) {
  return api.get(`/dailys/${dailyId}`);
}
export function createDaily(daily) {
  return api.post("/dailys", daily);
}
export function updateDaily(dailyId, daily) {
  return api.put(`/dailys/${dailyId}`, daily);
}
export function deleteDaily(dailyId, daily) {
  return api.delete(`/dailys/${dailyId}`, daily);
}

//files
export async function uploadImage(file) {
  return api.post("/image-upload", file);
}
