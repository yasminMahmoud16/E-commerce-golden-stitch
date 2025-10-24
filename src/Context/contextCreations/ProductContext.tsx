import type { IProfileContextType } from "@/Utilities/interfaces";
import { createContext } from "react";





export const ProfileContext = createContext<IProfileContextType |undefined>(undefined);
