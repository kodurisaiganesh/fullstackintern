import axios from "../../services/axios";

export async function fetchOwnerStores(ownerId) {
  return axios.get(`/owners/${ownerId}/stores`);
}

export async function fetchRaters(storeId) {
  return axios.get(`/stores/${storeId}/raters`);
}
