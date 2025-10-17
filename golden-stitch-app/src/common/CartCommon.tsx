
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/Components/ui/card"
import { CardEnum } from "@/Utilities/types"
import type { CartItemFromAPI, cartProps } from "@/Utilities/types"
import { Icons } from "@/assets/Icons/icons"
import BtnCommon from "./BtnCommon"
import { Link, useNavigate } from "react-router-dom";
import { useCartContext, useProductContext, useProfileContext } from "@/Hooks/useAppContexts";
import type { IProduct } from "@/Utilities/interfaces";
// import { useCartContext } from "@/Hooks/useAppContexts"
// import testImg from "@/assets/card1.jpg"

export default function CartCommon({
    cartList,
    wishListItems,
    type

}: cartProps) {
    // const {removeFromWishList} = useWishListContext()
    const { removeFromWishList } = useProfileContext();
    const { removeFromCart, incrementQuantity, decrementQuantity } = useCartContext();

    const { getProductById } = useProductContext();
    // const [quantity , setQuantity]= useState(item.quantity);
    const navigate = useNavigate();

    // console.log(wishListItems,"ffom wishhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh");


    // const listToRender: CartItemFromAPI[] =
    //   type === CardEnum.wishList
    //     ? (wishListItems?.map((id) => ({
    //         productId: {  id } as unknown as IProduct, 
    //         quantity: 1,
    //       })) || [])
    //     : (cartList || []);

    const listToRender: CartItemFromAPI[] =
        type === CardEnum.wishList
            ? (wishListItems?.map((item) => ({
                productId: item as unknown as IProduct,
                quantity: 1,
            })) || [])
            : (cartList || []);


    const handleOnClickProductDetails = async (id: string) => {
        await getProductById(id);
        navigate(`/product-details/${id}`);
    };




    const handleDelete = async (id: string) => {
        if (type === CardEnum.cart) {
            await removeFromCart(id);
        } else if (type === CardEnum.wishList) {
            await removeFromWishList(id);
        }
    };
    return (
        <>

            <div className="flex flex-col gap-4 p-4">


                {listToRender?.map((item) => (

                    <Card onClick={() => { handleOnClickProductDetails(item.productId.id) }} key={item.productId.id} className="relative cursor-pointer transition-all duration-300 ease-in-out hover:-translate-y-2 h-30 z-10 bg-[#b2a384a4] border-none ">
                        <div className="grid grid-cols-6 gap-3">
                            <div className="col-span-3 ">
                                <CardContent>
                                    <div className="w-30">
                                        {item.productId && item.productId.images?.[0] ? (
                                            <img src={`/${item.productId.images[0]}`} alt={item.productId.name} />
                                        ) : (
                                            <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                                                No Image
                                            </div>
                                        )}
                                    </div>

                                </CardContent>
                            </div>
                            <div className="col-span-3 gap-4  relative">
                                <Icons.FaTrash className="text-md absolute right-3.5 text-gold-dark transition-all duration-300 ease-in-out hover:text-red-600 cursor-pointer  " onClick={(e) => {
                                    e.stopPropagation();
                                    handleDelete(item.productId.id)
                                }} />

                                <CardHeader>
                                    <CardTitle className="text-dark-blue-2 text-sm font-medium capitalize truncate w-full">
                                        {item.productId.name}
                                    </CardTitle>


                                    {type !== CardEnum.wishList && (
                                        <div className="flex">
                                            <div className="flex items-center justify-center rounded-full mr-2 cursor-pointer transition-all duration-500 ease-in-out group hover:bg-dark-blue-1">
                                                <Icons.CiCircleMinus className="text-2xl text-dark-blue-nav group-hover:text-gold-light" onClick={(e) => {
                                                    e.stopPropagation();
                                                    decrementQuantity(item.productId.id, item.quantity);
                                                }} />
                                            </div>
                                            {item.quantity}

                                            <div className="flex items-center justify-center rounded-full ml-2 cursor-pointer transition-all duration-500 ease-in-out group hover:bg-dark-blue-1" onClick={(e) => {
                                                e.stopPropagation();
                                                incrementQuantity(item.productId.id, item.quantity);
                                            }}>
                                                <Icons.CiCirclePlus className="text-dark-blue-nav text-2xl group-hover:text-gold-light" />
                                            </div>
                                        </div>
                                    )}

                                </CardHeader>
                                <CardFooter>
                                    <p className="font-bold text-xl text-gold-dark w-30">{item.productId.mainPrice} EGP</p>
                                </CardFooter>
                            </div>
                        </div>
                    </Card>
                ))}


                {/* issue */}
                {/* {type === CardEnum.wishList && ( */}

                {type === CardEnum.cart ? <>
                    <div className="flex flex-col items-center justify-center gap-3 mb-3">
                        <Link to={"/products"}>
                            <BtnCommon
                                text="Add More Products"
                                className="bg-transparent text-dark-blue-2 border border-dark-blue-1 rounded-md w-72 transition-all duration-300 ease-in-out hover:bg-dark-blue-nav hover:text-white"
                            />
                        </Link>

                        <Link to={"/confirm-order"}>
                            <BtnCommon
                                text="Complete Your Order"
                                className="bg-dark-blue-2 text-white border border-dark-blue-1 rounded-md w-72 transition-all duration-300 ease-in-out hover:bg-dark-blue-nav hover:text-white"
                            />
                        </Link>
                    </div>
                </> : <>
                    <div className="flex flex-col items-center justify-center gap-3 mb-3">
                        <Link to={"/products"}>
                            <BtnCommon
                                text="Add More Products"
                                className="bg-transparent text-dark-blue-2 border border-dark-blue-1 rounded-md w-72 transition-all duration-300 ease-in-out hover:bg-dark-blue-nav hover:text-white"
                            />
                        </Link>

                    </div>
                </>}
                {/* )} */}
            </div>
            {/* )} */}
        </>
    );
}
