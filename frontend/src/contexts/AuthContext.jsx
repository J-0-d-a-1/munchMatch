import { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Temporary stop the app from rendering protected routes until the session is checked

  useEffect(() => {
    // Check session when app loads
    const checkSession = async () => {
      try {
        const response = await axios.get("/api/sessions/current", {
          withCredentials: true,
        });
        if (response.data.user) {
          setUser(response.data.user);
        }
      } catch (err) {
        console.error("Session check failed:", err);
      } finally {
        setLoading(false);
      }
    };
    checkSession();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);