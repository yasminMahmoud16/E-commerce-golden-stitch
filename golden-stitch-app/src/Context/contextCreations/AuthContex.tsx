import type { IAuthContextType } from "@/Utilities/interfaces";
import { createContext } from "react";




export const AuthContext = createContext<IAuthContextType | undefined>(undefined);

