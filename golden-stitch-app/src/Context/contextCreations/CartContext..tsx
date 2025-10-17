import type { ICartContextType } from "@/Utilities/interfaces";
import { createContext } from "react";




export const CartContext = createContext<ICartContextType |undefined>(undefined);

