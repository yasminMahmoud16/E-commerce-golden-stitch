import type { ICategoryContextType } from "@/Utilities/interfaces";
import { createContext } from "react";




export const CategoryContext = createContext<ICategoryContextType | undefined>(undefined);
