import type { IProfileContextType } from "@/Utilities/interfaces";
import { createContext } from "react";





export const ProfileContext = createContext<IProfileContextType>({
  profile: null,
  // role: RoleEnum.user,
  // getAuthHeader: () => ({}),
  updateUserProfile: async () => null,
  addToWishList: async () => { },
  removeFromWishList: async () => { },
  // refetchProfile: async () => { }
});
