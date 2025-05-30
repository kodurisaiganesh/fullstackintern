import React, { createContext, useContext, useReducer, useEffect } from "react";

// Initial Auth State
const initialState = {
  user: null,
  token: null,
  loading: true,
};

// Auth Context
const AuthContext = createContext();

// Reducer
function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        loading: false,
      };
    case "LOGOUT":
      return {
        user: null,
        token: null,
        loading: false,
      };
    case "STOP_LOADING":
      return { ...state, loading: false };
    default:
      return state;
  }
}

// AuthProvider Component
export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const token = localStorage.getItem("token");
      const user = JSON.parse(localStorage.getItem("user"));

      if (token && user) {
        dispatch({ type: "LOGIN", payload: { user, token } });
      } else {
        dispatch({ type: "STOP_LOADING" });
      }
    } catch (err) {
      console.error("AuthContext load error:", err);
      dispatch({ type: "STOP_LOADING" });
    }
  }, []);

  // Login handler
  const login = (user, token) => {
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    dispatch({ type: "LOGIN", payload: { user, token } });
  };

  // Logout handler
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook for using auth context
export function useAuth() {
  return useContext(AuthContext);
}
