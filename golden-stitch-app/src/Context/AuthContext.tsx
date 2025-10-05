import  { createContext, useEffect, useState } from "react";
import type{ReactNode} from "react"
import {jwtDecode} from "jwt-decode"
interface DecodedToken {
  id: string;
  exp: number;
  iat: number;
  
}

interface AuthContextType {
  token: string | null;
  setToken: (token: string | null) => void;
  userId: string | null;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthContextProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);

      try {
        const decoded = jwtDecode<DecodedToken>(storedToken);
        console.log("Decoded ID:", decoded.id);
        setUserId(decoded.id);
      } catch (error) {
        console.error("Invalid token", error);
        localStorage.removeItem("token");
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ token, setToken, userId }}>
      {children}
    </AuthContext.Provider>
  );
}



// type AuthContextType = {
//   isAuthenticated: boolean;
//   login: () => void;
//   logout: () => void;
// };

// export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// export default function AuthProvider({ children }: { children: ReactNode }) {
//   const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

//   const login = () => setIsAuthenticated(true);
//   const logout = () => setIsAuthenticated(false);

//   return (
//     <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// }
