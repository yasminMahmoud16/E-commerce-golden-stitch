import {  createHashRouter, RouterProvider } from 'react-router-dom'
import RouterLayout from './Layout/RouterLayout'
import { lazy, Suspense } from 'react';
// import Categories from './Components/Categories/Categories';
// import Brands from './Components/Brands/Brands';
// import Login from './Components/Login/Login';
// import Register from './Components/Register/Register';
import Error from './Components/Error/Error';
// import AuthContextProvider from './Components/Context/AuthContext';
// import Guard from './Components/Guard/Guard';
// import AuthGuard from './Components/AuthGuard/AuthGuard';
import { QueryClient ,QueryClientProvider } from "@tanstack/react-query";
import AuthLayout from './Layout/AuthLayout';
import AuthContextProvider from './Context/AuthContext';
import ToggleCommon from './common/ToggleCommon';
// import ProductDetails from './Components/ProductDetails/ProductDetails';
// import CartContextProvider from './Components/Context/CartContext';
// import { Toaster } from 'react-hot-toast/src/components/toaster';
// import ProductContextProvider from './Components/Context/ProductContext';
// import WishContextProvider from './Components/Context/WishContext';
// import WishList from './Components/WishList/WishList';
// import ForgetPassword from './Components/ForgetPassword/ForgetPassword';
// import PassCode from './Components/ForgetPassword/PassCode';
// import ResetUser from './Components/ForgetPassword/ResetUser';
// import Payment from './Components/Payment/Payment';
// import Cart from './Components/Cart/Cart';
// import AllOrders from './Components/AllOrders/AllOrders';
// import Products from './Components/Products/Products';
// import ProductContextProvider from './Components/Context/ProductContext';
// import OvalLoading from './Loading/OvalLoading.jsx';
// import LandingPage from './Components/Home/LandingPage';
const LandingPage = lazy(() => import('@/Pages/Home/LandingPage'));
const Register = lazy(() => import('@/Pages/Auth/Register/Register'));
const Login = lazy(() => import('@/Pages/Auth/login/Login'));
const ConfirmAccount = lazy(() => import('@/Pages/Auth/Register/ConfirmAccount'));
const ForgetPassword = lazy(() => import('@/Pages/Auth/forgetPassword/ForgetPassword'));
const VerifyAccount = lazy(() => import('@/Pages/Auth/forgetPassword/VerifyAccount'));
const CreateNewPassword = lazy(() => import('@/Pages/Auth/forgetPassword/CreateNewPassword'));
const ProductDetails = lazy(() => import('@/Pages/ProductDetails/ProductDetails'));
const OrderConfirm = lazy(() => import('@/Pages/Order/OrderConfirm'));
const Profile = lazy(() => import('@/Pages/User/Profile'));
import { Toaster } from 'sonner'
import UserLayout from './Layout/userLayout';



const queryClint = new QueryClient();

const route = createHashRouter([
  {
    path: "",
    element: <RouterLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense
            // fallback={
            //   // <OvalLoading />
            // }
          >
            <LandingPage />
          </Suspense>
        ),
      },
      {
        path:"test",
        element: (
          <Suspense
            // fallback={
            //   // <OvalLoading />
            // }
          >
            <ToggleCommon />
          </Suspense>
        ),
      },
      // {
      //   path: "cart",
      //   element: (
      //     <Guard>
      //       <Cart />
      //     </Guard>
      //   ),
      // },
      // {
      //   path: "products",
      //   element: (
      //     <Guard>
      //       <Products />
      //     </Guard>
      //   ),
      // },
      {
        path: "product-details/:id",
        element: (
          <Suspense>

            <ProductDetails />
          </Suspense>
          // <Guard>
          // </Guard>
        ),
      },
      {
        path: "confirm-order",
        element: (
          <Suspense>

            <OrderConfirm />
          </Suspense>
          // <Guard>
          // </Guard>
        ),
      },
      // // {
      // //   path: "categories",
      // //   element: (
      // //     // <Guard>
      // //     //   <Categories />
      // //     // </Guard>
      // //   ),
      // // },
      // {
      //   path: "allorders",
      //   element: (
      //     <Guard>
      //       <AllOrders />
      //     </Guard>
      //   ),
      // },
      // // {
      // //   path: "brands",
      // //   element: (
      // //     // <Guard>
      // //     //   <Brands />
      // //     // </Guard>
      // //   )
      // // },
      // {
      //   path: "wish-list",
      //   element: (
      //     <Guard>
      //       <WishList />
      //     </Guard>
      //   ),
      // },
      // {
      //   path: "payment",
      //   element: (
      //     <Guard>
      //       <Payment />
      //     </Guard>
      //   ),
      // },
      // {
      //   path: "login",
      //   element: (
      //     <AuthGuard>
      //       <Login />
      //     </AuthGuard>
      //   ),
      // },
      // {
      //   path: "forget-password",
      //   element: (
      //     <AuthGuard>
      //       <ForgetPassword />
      //     </AuthGuard>
      //   ),
      // },
      // {
      //   path: "password-code",
      //   element: (
      //     <AuthGuard>
      //       <PassCode />
      //     </AuthGuard>
      //   ),
      // },
      // {
      //   path: "reset-User",
      //   element: (
      //     <AuthGuard>
      //       <ResetUser />
      //     </AuthGuard>
      //   ),
      // },
      
      { path: "*", element: <Error /> },
    ],


  },
  {
    element: <AuthLayout />,
    children: [
      {
        path: "register",
        element: (
          <Suspense>

            <Register />
          </Suspense>
          // <AuthGuard>
          // </AuthGuard>
        ),
      },
      {
        path: "login",
        element: (
          <Suspense>

            <Login />
          </Suspense>
          // <AuthGuard>
          // </AuthGuard>
        ),
      },
      {
        path: "confirm-account",
        element: (
          <Suspense>

            <ConfirmAccount />
          </Suspense>
          // <AuthGuard>
          // </AuthGuard>
        ),
      },
      {
        path: "forget-password",
        element: (
          <Suspense>

            <ForgetPassword />
          </Suspense>

          // <AuthGuard>
          // </AuthGuard>
        ),
      },
      {
        path: "verify-account",
        element: (
          <Suspense>

            <VerifyAccount />
          </Suspense>

          // <AuthGuard>
          // </AuthGuard>
        ),
      },
      {
        path: "create-new-password",
        element: (
          <Suspense>

            <CreateNewPassword />
          </Suspense>

          // <AuthGuard>
          // </AuthGuard>
        ),
      },
    ]
  },
  {
    element: <UserLayout />,
    children: [
      {
        path: "profile",
        element: (
          <Suspense>

            <Profile />
          </Suspense>
          // <AuthGuard>
          // </AuthGuard>
        ),
      },

    ]
  },
]);
export default function App() {
  return <>
    {/* <RouterProvider router={routes}/> */}
              <QueryClientProvider client={queryClint}>
              <AuthContextProvider>
        <RouterProvider router={route} />
                    <Toaster richColors position="top-right"/>

 {/* 

          <CartContextProvider>
            <WishContextProvider> */}
        {/* <ProductContextProvider> */}
              {/* <Toaster position="top-right" /> */}
        {/* </ProductContextProvider> */}
            {/* </WishContextProvider>
          </CartContextProvider>
          */}
          </AuthContextProvider>
          </QueryClientProvider>

  </>
}
