

import CardCommon from "@/common/CardCommon"
import LayoutMotion from "@/common/LayoutMotion"
import card1 from "@/assets/Images/card1.jpg"
import card2 from "@/assets/Images/card2.jpg"
import card3 from "@/assets/Images/card3.jpg"
import { useNavigate } from "react-router-dom"
import { useContext, useState } from "react"
import { AuthContext } from "../../Context/AuthContext"
import PopupCommon from "@/common/PopupCommon"
import noAdd from "@/assets/Images/noAdd.png"

export default function ProductsLanding() {
      const [open, setOpen] = useState(false);

    const{token}= useContext(AuthContext)
    // const appName = import.meta.env.VITE_APPLICATION_NAME;
    const navigate= useNavigate()
    const productList = [
        {
            id: "0",
            image: card1,
            title: "Wallet",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, eius.",
            price: "500",
        },
        {
            id: "1",
            image: card2,
            title: "Bag",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, eius.",
            price: "600",
        },
        {
            id: "2",
            image: card3,
            title: "Leather set for men",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, eius.",
            price: "500",
        },
        {
            id: "3",
            image: card1,
            title: "Wallet",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, eius.",
            price: "500",
        },
        {
            id: "4",
            image: card2,
            title: "Bag",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, eius.",
            price: "600",
        },
        {
            id: "5",
            image: card3,
            title: "Leather set for men",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, eius.",
            price: "500",
        },
        {
            id: "6",
            image: card1,
            title: "Wallet",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, eius.",
            price: "500",
        },
        {
            id: "7",
            image: card2,
            title: "Bag",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, eius.",
            price: "600",
        },
        {
            id: "8",
            image: card3,
            title: "Leather set for men",
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium, eius.",
            price: "500",
        },
    ];

    const handleOnClickProductDetails = (id:string) => {
        console.log(id);
        navigate(`/product-details/${id}`)
    }
    const handleOnClickCart = (id:string) => {
        console.log(id);
        if (!token) {
            setOpen(true);
        }
    }
    const handleOnClickWishList = (id:string) => {
        console.log(id);
        if (!token) {
            setOpen(true)
        }
    }

    return <>
        <section id="ProductsLanding">
            <div className="container">
                <LayoutMotion>

                    <h1 className=" mb-4 text-center mt-6 text-3xl font-semibold text-dark-blue-2 capitalize">our products
                        
                    </h1>


                    <div className="flex items-center justify-center flex-wrap gap-4 pb-4">
                        {productList.map(product => (
                            <CardCommon
                                key={product.id}
                                image={product.image}
                                title={product.title}
                                description={product.description}
                                price={product.price}
                                onClickCard={() => handleOnClickProductDetails(product.id)}
                                onClickCart={() => { handleOnClickCart(product.id) }}
                                onClickWishList={()=>{handleOnClickWishList(product.id)}}
                            />
                        ))}
                        
                        
                    </div>
                    
                </LayoutMotion>
            </div>
             <PopupCommon open={open} onOpenChange={setOpen} text="Please register or log in to add items to your Cart or wish list " title="You must register" image={noAdd} />
        </section>
    </>
}
