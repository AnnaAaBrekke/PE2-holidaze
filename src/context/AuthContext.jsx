import { createContext, useContext, useState } from "react";
import { API_BASE_URL } from "../../constants";
import apiFetch from "../utils/apiFetch";
import { confirmAction } from "../utils/notifications";
import { friendlyError } from "../utils/errorMessages";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem("accessToken") || null;
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const saveAuth = (userData, token) => {
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("accessToken", token);
    setUser(userData);
    setToken(token);
  };

  const isManager = user?.venueManager === true;
  const isCustomer = user?.venueManager === false;

  const register = async (formData) => {
    setLoading(true);
    setError(null);

    try {
      const result = await apiFetch("/auth/register", {
        method: "POST",
        body: formData,
        baseUrl: API_BASE_URL,
      });

      return result;
    } catch (error) {
      console.error("Register error:", error.message);
      setError(friendlyError(error.message));
    } finally {
      setLoading(false);
    }
  };

  const login = async ({ email, password }) => {
    setLoading(true);
    setError(null);

    try {
      const result = await apiFetch("/auth/login?_holidaze=true", {
        method: "POST",
        body: { email, password },
        baseUrl: API_BASE_URL,
      });

      const accessToken = result.data.accessToken;
      saveAuth(result.data, accessToken);
      return result;
    } catch (error) {
      console.error("Login error:", error.message);
      setError(friendlyError(error.message));
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    const confirmLogout = await confirmAction(
      "Are you sure you want to log out?",
    );
    if (!confirmLogout) return;

    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        token,
        loading,
        error,
        isAuthenticated: !!token,
        isManager,
        isCustomer,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
