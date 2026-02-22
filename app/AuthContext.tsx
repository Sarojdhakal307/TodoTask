import api from "@/api/axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export interface User {
  id: number;
  email: string;
  name?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Restore session
  useEffect(() => {
    const loadUser = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        const userId = await AsyncStorage.getItem("userId");
        console.log(
          "Restoring session with token:",
          token,
          "and userId:",
          userId,
        );

        if (token && userId) {
          const res = await api.get<User>(`/users/${userId}`);
          console.log("User restored:", res.data);
          setUser(res.data);
        }
      } catch (error) {
        console.log("Failed to restore user:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  const login = async (email: string) => {
    const res = await api.get<User[]>("/users");
    const foundUser = res.data.find((u) => u.email === email);

    if (!foundUser) {
      throw new Error("Invalid email");
    }

    await AsyncStorage.setItem("token", "fake-token");
    await AsyncStorage.setItem("userId", String(foundUser.id));

    setUser(foundUser);
  };

  const logout = async () => {
    await AsyncStorage.multiRemove(["token", "userId"]);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
};
