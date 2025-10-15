import type { FormDataUpdate, GenderEnum, loginFields, logoutFlags, RoleEnum } from "./types";
import type { UseMutationResult } from "@tanstack/react-query";

export interface IProfileContextType {
    profile: Record<string, string> | null;
    data: Record<string, string> | null;
    // role: RoleEnum;
    // getAuthHeader: () => Record<string, string>;
    updateUserProfile: (values: FormDataUpdate) => Promise<FormDataUpdate | null>;
    addToWishList: (productId: string) => Promise<void>;
    removeFromWishList: (productId: string) => Promise<void>;
    // refetchProfile: () => Promise<any>;
    // data?: userData;


};

    export interface ILoginResponse {
        data: {
            credentials: {
                access_token: string;
                refresh_token: string;
            };
            bearer:string
        };
        message: string;
        cause?: {
            validationErrors?: {
                issues?: { message: string }[];
            }[];
        };
    }
export interface IProductContextType {
    allProductsData: IProduct[] | null;
    page: number;
    isLoading: boolean;
    // size: number;
    search: string;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    getProductById:(id:string)=>Promise<IProduct>
    softDelProduct:(id:string)=>Promise<string>
    addProduct: UseMutationResult<any, unknown, IProductUpdateInput, unknown>;
    isUpdating: boolean;
    updateProduct: UseMutationResult<any, any, any, unknown>;
}
export interface ICategoryContextType {
    isLoading: boolean;
    isUpdating: boolean;
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    allCategoriesData: ICategory[] | null;
    // categoryDetails/: ICategory | null;
    getCategoryById: (id: string) => Promise<ICategory>
    updateCategory: UseMutationResult<any, any, any, unknown>;
    softDelCategory: (id: string) => Promise<string>
}
export interface ICartContextType {
    cartItems?: T|null;
    isLoading: boolean;
    addToCart: (productId: string, quantity: number) => Promise<void>;
    incrementQuantity: (productId: string, currentQuantity: number) => void;
    decrementQuantity: (productId: string, currentQuantity: number) => void;
    removeFromCart: (productId: string) => Promise<void>;
    clearCart: () => Promise<void>;
    getCartItems: () => Promise<T[] | undefined>;
    cartRefresh: () => Promise<any>;
}

export interface IAuthContextType {
    token: string | null;
    refreshToken: string | null;
    role: string | null;
    loading: boolean;
    userId: string | null;
    setToken: (token: string | null) => void;
    setRefreshToken: (token: string | null) => void;
    setRole: (role: string | null) => void;
    // login: (values: loginFields) => Promise<AxiosResponse<ILoginResponse> | undefined>;
    login:(values: loginFields) => Promise<boolean>;
    logout: (values?: logoutFlags) => Promise<void>;
    getAuthHeader: () => Record<string, string>;
    getRefreshHeader: () => Record<string, string>;
}


// ================
export interface IProduct {
    id: string;
    name: string;
    description: string;
    stock: number;
    mainPrice: number;
    discountPercent: number;
    category?: {
        id?: string;
        name?: string;
    };
    createdBy: {
        id?: string;
        username?: string;
    };
    images: string[];
    attachments?: string[];
}
export interface ICategory {
    id: string;
    name: string;
    description: number;
    numberOfSale: number;
    // stock: number;
    // mainPrice: number;
    // discountPercent: number;
    createdBy: {
        id?: string;
        username?: string;
    };
    image: string;
}



export interface IProductUpdateInput {
    id?: string;
    name: string;
    description: string;
    stock: number;
    mainPrice: number;
    discountPercent: number;
    category: {
        id?: string;
        name?: string;
    };
    attachments?: FileList | File[];
    removedAttachments?: string[];
}
export interface ICategoryUpdateInput {
    id: string;
    name: string;
    description: string;
    // stock: string;
    // mainPrice: string;
    // discountPercent: string;
    // category: {
    //     id?: string;
    //     _id?: string;
    // };
    attachment?: FileList | File[];
    removedAttachments?: string[];
}


export interface IUserData  {
    id: string;
  firstName: string;
  lastName: string;
    username: string;
  email: string;
  phone: string;
    gender: GenderEnum;
    role: RoleEnum;
  address: string;
}