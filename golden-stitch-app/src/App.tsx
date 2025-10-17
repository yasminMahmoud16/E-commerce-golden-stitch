// App.tsx
import { createHashRouter, RouterProvider } from "react-router-dom";
import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import RouterLayout from "./Layout/RouterLayout";
import AuthLayout from "./Layout/AuthLayout";
import UserLayout from "./Layout/UserLayout";
import AdminLayout from "./Layout/AdminLayout";
import Error from "./Components/Error/Error";
import AuthContextProvider from "./Context/AuthContextProvider.js";
import Guard from "./Components/Guard/Guard";
import AuthGuard from "./Components/AuthGuard/AuthGuard";
import {SpinnerCustom} from "./Loading/SpinnerCustom.js"; // Assuming you have a loading component
import { SpinnerCustomData } from "./Loading/SpinnerCustomData.js";
import CategoryContextProvider from "./Context/CategoryContextProvider.js";
import ProductContextProvider from "./Context/ProductContextProvider.js";
import ProfileContextProvider from "./Context/ProfileContextProvider.js";
import CartContextProvider from "./Context/CartContextProvider.js";
import OrderContextProvider from "./Context/OrderContextProvider.js";
import ArchiveCategory from "./Pages/Admin/Archive/ArchiveCategory.js";
import ArchiveProducts from "./Pages/Admin/Archive/ArchiveProducts.js";


// Lazy-loaded components
const LandingPage = lazy(() => import("@/Pages/Home/LandingPage"));
const Register = lazy(() => import("@/Pages/Auth/Register/Register"));
const Login = lazy(() => import("@/Pages/Auth/login/Login"));
const ConfirmAccount = lazy(() => import("@/Pages/Auth/Register/ConfirmAccount"));
const ForgetPassword = lazy(() => import("@/Pages/Auth/forgetPassword/ForgetPassword"));
const VerifyAccount = lazy(() => import("@/Pages/Auth/forgetPassword/VerifyAccount"));
const CreateNewPassword = lazy(() => import("@/Pages/Auth/forgetPassword/CreateNewPassword"));
const ProductDetails = lazy(() => import("@/Pages/Product/ProductDetails.js"));
const OrderConfirm = lazy(() => import("@/Pages/Order/OrderConfirm"));
const Profile = lazy(() => import("@/Pages/User/Profile"));
const OrderDetails = lazy(() => import("@/Pages/User/OrderDetails"));
const AccountSetting = lazy(() => import("@/Pages/User/AccountSetting"));
const ChangePassword = lazy(() => import("@/Pages/User/ChangePassword"));
const Users = lazy(() => import("@/Pages/Admin/Users"));
const AdminOrders = lazy(() => import("@/Pages/Admin/AdminOrders"));
const AdminCategory = lazy(() => import("@/Pages/Admin/AdminCategory"));
const AdminProducts = lazy(() => import("@/Pages/Admin/AdminProducts"));
const Products = lazy(() => import("@/Pages/Product/Products.js"));

const queryClient = new QueryClient();

const router = createHashRouter([
  {
    path: "",
    element: <RouterLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<SpinnerCustom />}>
            <LandingPage />
          </Suspense>
        ),
      },
      {
        path: "test",
        element: (
          <Suspense fallback={<SpinnerCustom />}>
            {/* <Delete /> */}
          </Suspense>
        ),
      },
      {
        path: "product-details/:id",
        element: (
          <Suspense fallback={<SpinnerCustom />}>
            <Guard>
              <ProductDetails />
            </Guard>
          </Suspense>
        ),
      },
      {
        path: "products",
        element: (
          <Suspense fallback={<SpinnerCustom />}>
            <Guard>
              <Products />
            </Guard>
          </Suspense>
        ),
      },
      {
        path: "confirm-order",
        element: (
          <Suspense fallback={<SpinnerCustom />}>
            <Guard>
              <OrderConfirm />
            </Guard>
          </Suspense>
        ),
      },
      { path: "*", element: <Error /> },
    ],
  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: "register",
        element: (
          <Suspense fallback={<SpinnerCustom />}>
            <AuthGuard>
              <Register />
            </AuthGuard>
          </Suspense>
        ),
      },
      {
        path: "login",
        element: (
          <Suspense fallback={<SpinnerCustom />}>
            <AuthGuard>
              <Login />
            </AuthGuard>
          </Suspense>
        ),
      },
      {
        path: "confirm-account",
        element: (
          <Suspense fallback={<SpinnerCustom />}>
            <AuthGuard>
              <ConfirmAccount />
            </AuthGuard>
          </Suspense>
        ),
      },
      {
        path: "forget-password",
        element: (
          <Suspense fallback={<SpinnerCustom />}>
            <AuthGuard>
              <ForgetPassword />
            </AuthGuard>
          </Suspense>
        ),
      },
      {
        path: "verify-account",
        element: (
          <Suspense fallback={<SpinnerCustom />}>
            <AuthGuard>
              <VerifyAccount />
            </AuthGuard>
          </Suspense>
        ),
      },
      {
        path: "create-new-password",
        element: (
          <Suspense fallback={<SpinnerCustom />}>
            <AuthGuard>
              <CreateNewPassword />
            </AuthGuard>
          </Suspense>
        ),
      },
    ],
  },
  {
    element:
      <Suspense fallback={<SpinnerCustom />}>

        <UserLayout />
      </Suspense>,
    
    children: [
      {
        path: "profile",
        element: (
          <Suspense fallback={""}>
            <Guard>
              <Profile />
            </Guard>
          </Suspense>
        ),
      },
      {
        path: "orders",
        element: (
          <Suspense fallback={<SpinnerCustomData />}>
            <Guard>
              <OrderDetails />
            </Guard>
          </Suspense>
        ),
      },
      
      {
        path: "account-setting",
        element: (
          <Suspense fallback={<SpinnerCustom />}>
            <Guard>
              <AccountSetting />
            </Guard>
          </Suspense>
        ),
      },
      {
        path: "change-password",
        element: (
          <Suspense fallback={<SpinnerCustom />}>
            <Guard>
              <ChangePassword />
            </Guard>
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "profile",
        element: (
          <Suspense >
            <Guard>
              <Profile />
            </Guard>
          </Suspense>
        ),
      },
      {
        path: "users",
        element: (
          <Suspense>
            <Guard>
              <Users />
            </Guard>
          </Suspense>
        ),
      },
      {
        path: "orders",
        element: (
          <Suspense fallback={<SpinnerCustomData />}>
            <Guard>
              <AdminOrders />
            </Guard>
          </Suspense>
        ),
      },
      {
        path: "category",
        element: (
          <Suspense fallback={<SpinnerCustomData />}>
            <Guard>
              <AdminCategory />
            </Guard>
          </Suspense>
        ),
      },
      {
        path: "products",
        element: (
          <Suspense fallback={<SpinnerCustomData />}>
            <Guard>
              <AdminProducts />
            </Guard>
          </Suspense>
        ),
      },{
        path: "archive-products",
        element: (
          <Suspense fallback={<SpinnerCustomData />}>
            <Guard>
              <ArchiveProducts />
            </Guard>
          </Suspense>
        ),
      },{path: "archive-category",
        element: (
          <Suspense fallback={<SpinnerCustomData />}>
            <Guard>
              <ArchiveCategory />
            </Guard>
          </Suspense>
        ),
      },
      {
        path: "account-setting",
        element: (
          <Suspense fallback={<SpinnerCustomData />}>
            <Guard>
              <AccountSetting />
            </Guard>
          </Suspense>
        ),
      },
      {
        path: "change-password",
        element: (
          <Suspense fallback={<SpinnerCustomData />}>
            <Guard>
              <ChangePassword />
            </Guard>
          </Suspense>
        ),
      },
    ],
  },
]);

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
              <CartContextProvider>
        <ProfileContextProvider>
          <CategoryContextProvider>

          <ProductContextProvider>

                <OrderContextProvider>

          <RouterProvider router={router} />
                </OrderContextProvider>
                
          </ProductContextProvider>
          </CategoryContextProvider>
          <Toaster richColors position="top-right" />
        </ProfileContextProvider>
          </CartContextProvider>
      </AuthContextProvider>
    </QueryClientProvider>
  );
}