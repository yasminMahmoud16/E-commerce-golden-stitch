import { useContext } from "react";

import type { ICategoryContextType, IAuthContextType, IProductContextType, IProfileContextType } from "@/Utilities/interfaces";
import { ProductContext } from "@/Context/contextCreations/ProfileContext";
import { ProfileContext } from "@/Context/contextCreations/ProductContext";
import { CategoryContext } from "@/Context/contextCreations/CategoryContex.";
import { CartContext } from "@/Context/contextCreations/CartContex.";
import { AuthContext } from "@/Context/contextCreations/AuthContex";
// import { OrderContext } from "@/Context/OrderContext";
// import { WishContext } from "@/Context/WishContext";


/** Category Context Hook */
export function useCategoryContext(): ICategoryContextType {
    const context = useContext(CategoryContext);
    if (!context) {
        throw new Error("useCategoryContext must be used within a CategoryContextProvider");
    }
    return context;
}

/** Auth Context Hook */
export function useAuthContext(): IAuthContextType {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuthContext must be used within an AuthContextProvider");
    }
    return context;
}

/** Product Context Hook */
export function useProductContext(): IProductContextType {
    const context = useContext(ProductContext);
    if (!context) {
        throw new Error("useProductContext must be used within a ProductContextProvider");
    }
    return context;
}
export function useProfileContext(): IProfileContextType {
    const context = useContext(ProfileContext);
    if (!context) {
        throw new Error("useProfileContext must be used within a ProfileContextProvider");
    }
    return context;
}
export function useCartContext() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCartContext must be used within a cartContextProvider");
    }
    return context;
}
// export function useOrderContext() {
//     const context = useContext(OrderContext);
//     if (!context) {
//         throw new Error("useOrderContext must be used within a OrderContextProvider");
//     }
//     return context;
// }
