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
// museums
export function getMuseums() {
  return api.get("/museums");
}
export function getMuseumById(museumId) {
  return api.get(`/museums/${museumId}`);
}
export function createMuseum(museum) {
  return api.post("/museums", museum);
}
export function updateMuseum(museumId, museum) {
  return api.put(`/museums/${museumId}`, museum);
}
export function deleteMuseum(museumId, museum) {
  return api.delete(`/museums/${museumId}`, museum);
}
export function addExhibitions(museumId) {
  return api.get(`/museums/exhibitions/${museumId}`);
}

//files
export async function uploadImage(file) {
  return api.post("/image-upload", file);
}
