import { useContext } from "react";
import { AuthContext } from "../features/auth/authContext";

export function useAuth() {
  return useContext(AuthContext);
}
