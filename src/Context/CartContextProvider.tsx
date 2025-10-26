import { useAuthContext } from '@/Hooks/useAppContexts';
import { useAxios } from '@/Hooks/useAxios';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react'
import { toast } from 'sonner';
import type { ReactNode } from "react";
import axios from 'axios';
import { CartContext } from './contextCreations/CartContext.';




export default function CartContextProvider({ children }: { children: ReactNode }) {
    const axiosInstance = useAxios();
    const { getAuthHeader, token } = useAuthContext()

    const [isLoading] = useState<boolean>(false);


    const queryClient = useQueryClient();

        // get user cart items
    const getCartItems = async () => {

        try {

            const res = await axiosInstance.get('/cart', {
                headers: getAuthHeader()
            });

            // console.log({ getCart: res });
            // console.log({ cartPro: res.data.data.cart.products });
            const products = res.data?.data?.cart?.products || [];

            return products;

        } catch (error) {
            if (axios.isAxiosError(error)) {

                // const detailedError = error?.response?.data?.cause?.validationErrors?.[0]?.issues?.[0]?.message;
                // const generalError = error?.response?.data?.message;
                // toast.error(detailedError || generalError || "Something went wrong");
            }
            return []
        }
    };

    const { data: cartItems, refetch: cartRefresh } = useQuery({
        queryKey: ["getCartItems"],
        queryFn: getCartItems,
        enabled: !!token,
    });


    const addToCart = async (productId: string, quantity: number, showToast: boolean = true) => {
        try {
            const res = await axiosInstance.post(
                "/cart",
                { productId, quantity },
                { headers: getAuthHeader() }
            );

            if (res.data.message === "Done") {
                if (showToast) toast.success("Product Added To Cart");
                cartRefresh();
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            // console.log({cart:error});
            if (axios.isAxiosError(error)) {
                const issue = error.response?.data?.cause?.validationErrors?.[0]?.issues?.[0];

                if (issue) {
                    const field = issue.path?.[0];
                    const message = issue.message;
                    toast.error(`${field ? `${field}: ` : ""}${message}`);
                    return;
                }

                const backendMessage =
                    error.response?.data?.message ||
                    error.message ||
                    "Failed to add product.";
                    toast.error(backendMessage);
            }
            

            // toast.error("Something Went Wrong", error);
            // if (axios.isAxiosError(error)) {

            // }
            // console.log(err, "cart context error");
        }
    };

    // incrementQuantity
    const incrementQuantity = (productId: string, currentQuantity: number) => {
        const newQuantity = currentQuantity + 1;
        addToCart(productId, newQuantity, false);
    };

    // decrementQuantity
    const decrementQuantity = (productId: string, currentQuantity: number) => {
        const newQuantity = Math.max(1, currentQuantity - 1);
        addToCart(productId, newQuantity, false);
    };




    // remove item
    const removeFromCart = async (productId: string) => {
        try {

            const res = await axiosInstance.patch(`product/${productId}/cart/remove-from-cart`, {
                productId
            }, {
                headers: getAuthHeader()
            });


            if (res.data.message === 'Done') {
                toast.success('Product removed from Cart');

                cartRefresh()

                // console.log({ RemoveCart: res });
            }
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            // console.log(err, 'wish context error');

        }
    }

    // clear cart

    const clearCart = async () => {
        try {
            const res = await axiosInstance.delete(`/cart`, {
                headers: getAuthHeader()
            });

            if (res.data.message === "Done") {
                toast.success("Cart cleared successfully");

                // clear cash
                queryClient.setQueryData(["getCartItems"], []);

                await queryClient.invalidateQueries({ queryKey: ["getCartItems"] });

                // console.log("Cart cleared & UI updated ✅");
            }

            // console.log({ clearCart: res });
        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {

                // console.log({ clearCart: error });
                // eslint-disable-next-line @typescript-eslint/no-unused-vars
                // const _detailedError = error?.response?.data?.cause?.validationErrors?.[0]?.issues?.[0]?.message;
                // // eslint-disable-next-line @typescript-eslint/no-unused-vars
                // const _generalError = error?.response?.data?.message;
                // console.log(detailedError || generalError || "clear cart issue ");
            }
        }
    };




    useEffect(() => {
        const fetchCart = async () => {
            await getCartItems();
        };
        if (token) fetchCart();
    }, [token]);
    return <>
        <CartContext.Provider value={{ incrementQuantity, decrementQuantity, removeFromCart, cartRefresh, cartItems, addToCart, getCartItems, isLoading, clearCart }}>
            {children}
        </CartContext.Provider>
    </>
}
