import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

// Mock user database for demonstration
const mockUsers = [
  { email: "teacher@test.com", password: "teacher123", role: "teacher" },
  { email: "student@test.com", password: "student123", role: "student" },
];

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  const login = (email, password) => {
    // Find user in mock database
    const foundUser = mockUsers.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      setUser({ email: foundUser.email, role: foundUser.role });
      setError("");
      return true;
    } else {
      setError("Invalid credentials");
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    setError("");
  };

  return (
    <AuthContext.Provider value={{ user, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
