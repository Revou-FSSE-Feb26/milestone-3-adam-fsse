"use client";
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(undefined);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Sync session state on app load
  useEffect(() => {
  fetch('/api/auth/checkme') // Point this directly to your new checkme folder route
    .then((res) => {
      if (res.ok) return res.json();
      throw new Error("Session invalid");
    })
    .then((userData) => {
      // The API returns the user object directly, so store it into state
      setUser(userData); 
    })
    .catch(() => {
      setUser(null);
    })
    .finally(() => {
      setLoading(false); // Changes loading state to let the Header component render
    });
}, []);

  const logout = async () => {
    const res = await fetch('/api/auth/logout', { method: 'POST' });
    if (res.ok) {
      setUser(null);
      window.location.href = '/login'; // Redirect to login page
    }
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}