import type { CartItemFromAPI, CreateOrder, FormDataUpdate, GenderEnum, loginFields, logoutFlags, RoleEnum } from "./types";
import type { UseMutationResult } from "@tanstack/react-query";
export interface IForgetPasswordResponse {
    data: {
        message: string
    };
    message: string;
    cause?: {
        validationErrors?: {
            issues?: { message: string }[];
        }[];
    };
}
export interface IProfileContextType {
    profile: Record<string, string> | null;
    allUsers: IUserData[] | null;
    data: Record<string, string> | null;
    loadingProfile:boolean
    // role: RoleEnum;
    // getAuthHeader: () => Record<string, string>;
    updateUserProfile: (values: FormDataUpdate) => Promise<FormDataUpdate | null>;
    softDelUsers: (id: string) => Promise<string>;
    restoreUsers: (id: string) => Promise<string>;
    addToWishList: (productId: string) => Promise<void>;
    // getAllUsers: () => Promise<Record<string, string>[]>;
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
        bearer: string
    };
    message: string;
    cause?: {
        validationErrors?: {
            issues?: { message: string }[];
        }[];
    };
}

export interface IAddProductResponse {
    message: string;
    product?: IProduct; 
}
export interface IAddCategoryResponse {
    message: string;
    categories?: ICategory; 
}
export interface IProductContextType {
    allProductsData: IProductsResponse | undefined;
    // allProductsData: IProduct[] | null;
    archiveProducts: IProductsResponse | undefined;
    page: number;
    isLoading: boolean;
    // size: number;
    search: string;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    categoryId: string;
    setCategoryId: React.Dispatch<React.SetStateAction<string>>;

    setSearch: React.Dispatch<React.SetStateAction<string>>;
    getProductById: (id: string) => Promise<IProduct>;
    softDelProduct: (id: string) => Promise<string>;
    restoreProduct: (id: string) => Promise<string>;
    // addProduct: UseMutationResult<string, unknown, IProductUpdateInput, unknown>;
    addProduct: UseMutationResult<IAddProductResponse, unknown, IProductUpdateInput, unknown>;
    isUpdating: boolean;
    getProducts: (params: { page?: number; size?: number; search?: string; categoryId?: string }) => Promise<IProductsResponse>;

    updateProduct: UseMutationResult<IProduct, unknown, IProductEditInput>;
}

export interface IProductsResponse {
    currentPage: number;
    docs: IProduct[];
    docsCount: number;
    limit: number;
    pages: number;
}
export interface ICategoryResponse {
    currentPage: number;
    docs: ICategory[];
    docsCount: number;
    limit: number;
    pages: number;
}
export interface IOrdersResponse {
    currentPage: number;
    docs: IOrder[];
    docsCount: number;
    limit: number;
    pages: number;
}
export interface ICategoryContextType {
    isLoading: boolean;
    isUpdating: boolean;
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    search: string;
    setSearch: React.Dispatch<React.SetStateAction<string>>;
    allCategoriesData: ICategoryResponse | undefined;
    archiveCategory: ICategoryResponse | undefined;
    // categoryDetails/: ICategory | null;
    getCategoryById: (id: string) => Promise<ICategory>
    getCategories: (params: { page?: number; size?: number; search?: string }) => Promise<ICategoryResponse>
    updateCategory: UseMutationResult<ICategory, unknown, ICategoryUpdateInput, unknown>;
    addCategory: UseMutationResult<IAddCategoryResponse, unknown, ICategoryUpdateInput, unknown>;

    softDelCategory: (id: string) => Promise<string>
    restoreCategory: (id: string) => Promise<string>;
    hardDelCategory: (id: string) => Promise<string>;
}
export interface ICartContextType {
    cartItems?: CartItemFromAPI[] | null;
    isLoading: boolean;
    addToCart: (productId: string, quantity: number) => Promise<void>;
    incrementQuantity: (productId: string, currentQuantity: number) => void;
    decrementQuantity: (productId: string, currentQuantity: number) => void;
    removeFromCart: (productId: string) => Promise<void>;
    clearCart: () => Promise<void>;
    getCartItems: () => Promise<CartItemFromAPI[] | undefined>;
    cartRefresh: () => void;
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
    login: (values: loginFields) => Promise<boolean>;
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
    salePrice?: number;
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
    freezedAt: string;
}
export interface ICategory {
    id: string;
    name: string;
    description?: string;
    numberOfSale: number;
    // stock: number;
    // mainPrice: number;
    // discountPercent: number;
    createdBy: {
        id?: string;
        username?: string;
    };
    image: string;
    freezedAt: string;
    attachment?: File[];

}
export interface ICategoryUpdate {
    id?: string;
    name: string;
    description?: string ;

    attachment?:  File[];

}



export interface IProductUpdateInput {
    id?: string;
    name: string;
    description?: string;
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
export interface IProductEditInput {
    id?: string;
    name: string;
    description?: string;
    // stock: number;
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
    id?: string;
    name: string;
    description: string;
    // stock: string;
    // mainPrice: string;
    // discountPercent: string;
    // category: {
    //     id?: string;
    //     _id?: string;
    // };
    attachment?: FileList | File[] |undefined;
    removedAttachments?: string[];
}


export interface IUserData {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    phone: string;
    gender: GenderEnum;
    role: RoleEnum;
    address: string;
    freezedAt:string
}
export interface IOrderContextType {
    id?: string;
    // name: string;
    loadingDetails?:boolean;
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    statusFilter: string;
    setStatusFilter: React.Dispatch<React.SetStateAction<string>>;
    ordersData: IOrdersResponse | null;
    createOrder: (values: CreateOrder) => Promise<string | undefined>
    onWayByAmin: (id: string) => Promise<string | undefined>
    // getAllOrders: () => Promise<IOrder>
    onDeliveredByAmin: (id: string) => Promise<string | undefined>
    cancelOrder: (id: string, reason: string) => Promise<string | undefined>

}

interface IOrderProduct {
    _id: string;
    productId: {
        _id: string;
        name: string;
        slug: string;
        description: string;
        stock: number;
        images: string[]
    };
    quantity: number;
    unitPrice: number;
    finalPrice: number;
}
export interface IOrder {
    id: string;
    address: string;
    note: string;
    paymentType: string;
    phone: string;
    status: string;
    customId?: string;
    createdAt: string;
    subtotal: number;
    products: IOrderProduct[];
    // stock: number;
    // mainPrice: number;
    // discountPercent: number;
    createdBy: {
        id?: string;
        username?: string;
    };
    updatedAt:string
    // image: string;
    // freezedAt: string;
}
