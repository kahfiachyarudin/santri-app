import { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("currentUser");

    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Menyimpan user setelah login
  const login = (userData) => {
    // Jangan simpan password
    const loggedInUser = {
      id: userData.id,
      nis: userData.nis,
      username: userData.username,
      nama: userData.nama,
      role: userData.role,
    };

    localStorage.setItem(
      "currentUser",
      JSON.stringify(loggedInUser)
    );

    setUser(loggedInUser);
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("currentUser");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}