import type { ReactNode } from "react";




export enum GenderEnum {
    male = "male",
    female = "female",
}
export enum PaymentMethodEnum {
  cash = "cash",
  credit = "credit",
}
export enum CardEnum {
    cart = "cart",
    wishList = "wish-list",
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

export type cartProps = {
  image?: string,
  title?: string;
  price?: string;
  type?: CardEnum;
  cartList?: any[];
  wishListItems?: any[];
}

export type cardProps = cartProps & {
  
  description: string;
  onClickCard?: () => void;
  onClickWishList?: () => void;
  onClickCart?: () => void;
}

export type ToggleCommonProps = {
  openCart?: boolean;
  openWishList?: boolean;
  setOpenWishList?: (open: boolean) => void;
  setOpenCart?: (open: boolean) => void;
  title?: string
  type?:CardEnum
};
export type PopupCommonProps = {
  text: string;
  title: string;
  image: string;
  open: boolean;
  onOpenChange: (open: boolean) => void
}
export type logoutFlags = {
  flag:logoutEnum
}
export type order = {
  email: string;
  address: string;
  phone: string;
  paymentMethod: PaymentMethodEnum
}


