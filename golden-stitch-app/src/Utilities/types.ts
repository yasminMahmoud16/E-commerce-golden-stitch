import type { updateProfile } from "@/Pages/Auth/validation/userValidation";
import type { ReactNode } from "react";
import {z} from "zod"
import type { ICategory, IProduct } from "./interfaces";



export enum GenderEnum {
    male = "male",
    female = "female",
}
export enum StateEnum {
  placed="placed",
  onWay = "onWay",
  delivered = "delivered",
  cancel = "canceled",
  all = "all",
}
export enum RoleEnum {
    user = "user",
    admin = "admin",
    superAdmin = "super-admin",
}
export enum PaymentMethodEnum {
  cash = "cash",
  credit = "credit",
}
export enum CardEnum {
    cart = "cart",
    wishList = "wish-list",
  category = "category",
}
export enum logoutEnum {
  all = "all",
  only = "only",
}

export type PagesRapperProps = {
  children: ReactNode;
  className?:string
};

export type LayoutMotionProps = PagesRapperProps
export type WrapperBgProps = PagesRapperProps  & {
  title: string;
  subtitle?: string;
};

export type loginFields = {
  email: string;
  password: string;
};
export type signupFields = loginFields & {
  username: string;
  confirmPassword: string;
  phone: string;
  gender?: GenderEnum;
};
export type confirmAccountField = {
    email: string;
    otp:string
};
export type forgetPasswordField = {
    email: string;
};
export type OtpField = forgetPasswordField & {
    otp: string;
};
export type resetPassword = confirmAccountField &{
  password: string;
  confirmPassword: string;
};
export type createNewPasswordField = {
  password: string;
  confirmPassword: string;
};



export type ToggleCommonProps = {
  openCart?: boolean;
  openWishList?: boolean;
  setOpenWishList?: (open: boolean) => void;
  setOpenCategory?: (open: boolean) => void;
  setOpenCart?: (open: boolean) => void;
  openCategory?: boolean



  title?: string
  type?:CardEnum
};
export type PopupCommonProps = {
  text?: string;
  title?: string;
  image?: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  options?: { label: string; value?: string; onClick?: () => void; className?: string; }[];
  showCancel?: boolean;
  showAction?: boolean;
  actionText?: string;
  actionLink?: string;
  classNameTitle?: string
  classNameText?: string
  
  
};

export type logoutFlags = {
  flag:logoutEnum
}
export type order = {
  email: string;
  address: string;
  phone: string;
  paymentMethod: PaymentMethodEnum
}


export type SidebarLink = {
  label: string;
  path: string;
  icon?: React.ReactNode;
}

export type AppSidebarProps = {
  sidebarLinks: SidebarLink[];
}


export type changePasswordFields = {

  oldPassword: string;
  password: string;
  confirmPassword: string;
  flag?: logoutEnum

};


export type FieldTypes<T extends Record<string, string> > = {
  name: keyof T | string;
  label?: string;
  type?: string;
  placeholder?: string;
};

export type FormDataUpdate = z.infer<typeof updateProfile>;

export type EditCommonProps<T extends Record<string, string> > = {
  title?: string;
  fields: FieldTypes<T>[];
  data: T | null;
  onSave?: (values: T) => void;
  onCancel?: () => void;
};

export type editFields = {
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  gender?: GenderEnum;
};
export type productDetails  = {
  product: IProduct | null; onBack: () => void; onEdit: (cat: IProduct) => void; onDeleteSuccess: () => void;
};
export type categoryDetails = {
  category: ICategory | null; onBack: () => void;  onEdit: (cat: ICategory) => void; onDeleteSuccess: () => void;
};
export type categoryEdit = {
  category: ICategory | null, onBack: () => void,
};





export type ProductFormValues = {
  name: string;
  mainPrice: number;
  stock: number;
  discountPercent: number | undefined;
  description?: string;
  categoryId?: string;
  attachments?: FileList | File[];
  category?: { id?: string; name?: string };
};


// export type ProductFormValues = {
//   id?: string;
//   name: string;
//   mainPrice: number;
//   stock: number;
//   discountPercent: number;
//   description?: string;
//   categoryId?: string;
//   attachments?: FileList | File[];
//   category: {
//     id?: string;
//     name?: string;
//   };
// };

export type userData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  gender: GenderEnum
  address: string;
}

// ========================================


export type cartProps = {
  type?: CardEnum;
  cartList?: CartItemFromAPI[];
  // wishListItems?: WishListItem;
  wishListItems?: WishListProduct[];
}

export type cardProps = cartProps & {
  title?: string;
  price?: number
  image?: string;
  description: string;
  onClickCard?: () => void;
  onClickWishList?: () => void;
  onClickCart?: () => void;
}
export type CartItemFromAPI = {
  productId: IProduct;
  quantity: number;
  product?: IProduct;
};
// export type WishListItem = {
//   productId: IProduct;
//   // quantity: number;
//   product?: IProduct;
// };
export interface WishListProduct {
  id: string;
  name: string;
  slug: string;
  description: string;
  stock: number;
}

// export type WishListItem = WishListProduct[] ;


export type CreateOrder = {
  address:string,
  phone: string,
  note?: string
}