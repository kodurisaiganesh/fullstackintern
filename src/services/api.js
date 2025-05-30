import axios from "./axios";

export async function fetchStores() {
  // return axios.get("/stores");
  return { data: [{ id: 1, name: "Store 1" }, { id: 2, name: "Store 2" }] };
}
