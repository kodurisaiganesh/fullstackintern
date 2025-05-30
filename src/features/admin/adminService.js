import axios from "../../services/axios";

export async function fetchUsers() {
  return axios.get("/users");
}

export async function fetchStores() {
  return axios.get("/stores");
}

export async function deleteUser(userId) {
  return axios.delete(`/users/${userId}`);
}

export async function deleteStore(storeId) {
  return axios.delete(`/stores/${storeId}`);
}
