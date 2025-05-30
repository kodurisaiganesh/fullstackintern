import axios from "../../services/axios";

export async function getStores() {
  // replace with real API
  return axios.get("/stores");
}

export async function submitRating(storeId, rating, comment) {
  // replace with real API
  return axios.post(`/stores/${storeId}/ratings`, { rating, comment });
}
