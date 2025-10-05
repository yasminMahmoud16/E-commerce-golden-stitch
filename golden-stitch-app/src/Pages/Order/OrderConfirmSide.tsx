import order from "@/assets/Images/Box-3.png"
export default function OrderConfirmSide() {
    return <>
        <div className="">

        <div className="container">
            <div className="flex flex-col items-center justify-center gap-8 mt-10">
                <div>
                    <img src={order} alt="" />
                </div>
                <div>
                    <h1 className="text-4xl font-semibold text-gold-light">Complete Your Order </h1>
                </div>
            </div>
        </div>
        </div>
    </>
}
