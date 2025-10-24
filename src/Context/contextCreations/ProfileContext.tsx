import type { IProductContextType } from "@/Utilities/interfaces";
import { createContext } from "react";





export const ProductContext = createContext<IProductContextType
  | undefined>(undefined);
