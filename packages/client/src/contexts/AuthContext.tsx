import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (username: string, password: string) => boolean;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: () => false,
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    // Lee el estado guardado en localStorage al inicio
    return localStorage.getItem("isAuthenticated") === "true";
  });

  // Guarda estado cuando cambie
  useEffect(() => {
    localStorage.setItem("isAuthenticated", isAuthenticated ? "true" : "false");
  }, [isAuthenticated]);

  const login = (username: string, password: string): boolean => {
    // Credenciales válidas hardcodeadas
    const validUser = "admin";
    const validPassword = "admin";
    console.log("Intentando iniciar sesión con:", username, password);
    if (username === validUser && password === validPassword) {
      setIsAuthenticated(true);
      return true;
    }
    console.log("Credenciales inválidas");
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
