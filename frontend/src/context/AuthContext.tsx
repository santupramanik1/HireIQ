import axios from "axios";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode
} from "react";
import toast from "react-hot-toast";
import {useNavigate } from "react-router-dom";

export interface User {
  firstname: string;
  lastname: string;
  email: string;
  role: string;
  profilePicture: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (userData: User) => void;
  logout: () => void;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create provider component
export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Initialize state from localStorage on first load
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Login
  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  //   Logout
  const logout = async () => {
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/auth/logout`,
        {},
        { withCredentials: true }
      );

      const successMessage = data?.message;
      toast.success(successMessage);
    } catch (error: any) {
      const errorMessage = error?.data?.message || "Logout failed on server";
      toast.error(errorMessage);
    } finally {
      setUser(null);
      localStorage.removeItem("user");
      navigate("/login");
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
