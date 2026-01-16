import React, { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔁 restore session
  useEffect(() => {
    const storedUser = localStorage.getItem("adminUser");
    const token = localStorage.getItem("adminToken");

    if (storedUser && token) {
      setUser(JSON.parse(storedUser));
    }

    setLoading(false);
  }, []);

  // 🔐 dummy login
  const login = async (email, password) => {
    // ✅ dummy credentials
    const DUMMY_EMAIL = "admin@example.com";
    const DUMMY_PASSWORD = "password123";

    if (email === DUMMY_EMAIL && password === DUMMY_PASSWORD) {
      const fakeUser = { id: 1, name: "Admin", email };
      const fakeToken = "dummy-token-123456";

      setUser(fakeUser);
      localStorage.setItem("adminUser", JSON.stringify(fakeUser));
      localStorage.setItem("adminToken", fakeToken);

      navigate("/admin/dashboard", { replace: true });
    } else {
      throw new Error("Invalid email or password");
    }
  };

  // 🚪 logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("adminUser");
    localStorage.removeItem("adminToken");

    navigate("/admin/login", { replace: true });
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
