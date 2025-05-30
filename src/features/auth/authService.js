import axios from "../../services/axios";

export async function loginUser(credentials) {
  const response = await axios.post("/auth/signin", credentials);

  return {
    user: {
      id: response.data.id,
      name: response.data.name,
      email: response.data.email,
      address: response.data.address,
      role: response.data.role, // 'system-admin', 'normal-user', 'store-owner'
    },
    token: response.data.accessToken,
  };
}

export async function signupUser(data) {
  const response = await axios.post("/auth/signup", data);
  return response.data;
}
