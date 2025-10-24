import type {  IOrderContextType } from "@/Utilities/interfaces";
import { createContext } from "react";




export const OrderContext = createContext<IOrderContextType | undefined>(undefined);

