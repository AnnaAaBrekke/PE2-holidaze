// Register users
// Log in
// Log out
// Know if a user is authenticated
// Access the user's info (e.g. name, role)

// ---> after filling in the form this will happen:

import { createContext, useContext, useState } from "react";
import { API_BASE_URL, API_HEADERS } from "../../constants";

const REGISTER_URL = `${API_BASE_URL}/auth/register`;
const LOGIN_URL = `${API_BASE_URL}/auth/login?_holidaze=true`;

// This creates a context object that React will use to pass down auth-related data through the component tree — without props.

// It provides access to auth state (user, token, etc.) and functions (login, logout, etc.) to any component inside.
// user and token are loaded from localStorage on first render — so users stay logged in when refreshing.
// Saves user data and token to localStorage + updates state.

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
      console.log("FormData sent to API:", formData);

      const response = await fetch(REGISTER_URL, {
        method: "POST",
        headers: API_HEADERS,
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error("Registered Failed");
      }

      return result;
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const login = async ({ email, password }) => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(LOGIN_URL, {
        method: "POST",
        headers: API_HEADERS,
        body: JSON.stringify({ email, password }),
      });

      const result = await response.json();
      if (!response.ok) {
        throw new Error("Login failed");
      }

      const accessToken = result.data.accessToken;
      saveAuth(result.data, accessToken);
      return result;
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?"); // Custom modal later
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
