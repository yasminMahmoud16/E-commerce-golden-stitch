import product from "@/assets/Images/card1.jpg"
export default function OrderDetails() {


    const orderDetails = [
           { label: "product name", value: "wallet" },
    { label: "customer name", value: "adem" },
    {
      label: "shipped name",
      value:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus dignissimos quae cum iure at voluptatem temporibus soluta fuga voluptates totam.",
    },
    { label: "payment method", value: "cash" },
  
    ]
    return <>

        <h1 className="absolute top-4 text-center text-4xl  font-semibold text-dark-blue-2 w-full">order details </h1>
        <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
            <div className='col-span-3'>
                <div>
                    <img src={product} alt="product" />
                </div>
            </div>
            <div className='col-span-3 flex flex-col justify-center gap-3'>
                {orderDetails.map((order) => (
                    
                    <div>
                        <h2 className="text-gold capitalize text-md font-medium">{ order.label}</h2>
                        <p className="text-white capitalize text-xs ">{order.value}</p>
                    </div>
                ))}
              
            </div>
        </div>
    </>
  
}
