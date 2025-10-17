import { useOrderContext } from "@/Hooks/useAppContexts";

export default function OrderDetails() {
  const { ordersData } = useOrderContext();

  console.log({ ordersDataUser: ordersData });

  return (
    <>
      <h1 className="text-center text-4xl font-semibold text-gold-light mb-10">
        Order Details
      </h1>

      <div className=" gap-6">
        {ordersData?.map((order) => (
          <div
            key={order.id}
            className="mb-6 bg-white/10 border w-full border-gold/30 rounded-2xl p-5 text-white shadow-md hover:shadow-lg transition-all duration-300"
          >
            <div className="border-b border-gold/20 pb-3 mb-3">
              <h2 className="text-gold text-xl font-semibold">
                Order #{order.customId?.slice(0, 8) || order.id.slice(0, 8)}
              </h2>
              <p className="text-sm text-gray-300 mt-1">
                {new Date(order.createdAt).toLocaleString()}
              </p>
            </div>

            <div className="space-y-4">
              {order.products?.map((p, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 bg-white/5 rounded-lg p-3"
                >
                  <img
                    src={`/${p.productId?.images?.[0]}`}
                    alt={p.productId?.name || "Product"}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div className="flex flex-col">
                    <h3 className="text-gold font-medium">
                      {p.productId?.name}
                    </h3>
                    <p className="text-gray-300 text-sm">
                      <span className="text-gold font-semibold">
                        {p.finalPrice} EGP
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 space-y-2 text-sm text-gray-200">
              <p>
                <span className="text-gold font-semibold">Address:</span>{" "}
                {order.address}
              </p>
              <p>
                <span className="text-gold font-semibold">Phone:</span>{" "}
                {order.phone}
              </p>
              <p>
                <span className="text-gold font-semibold">Payment:</span>{" "}
                {order.paymentType}
              </p>
              <p>
                <span className="text-gold font-semibold">Note:</span>{" "}
                {order.note || "No notes"}
              </p>
              <p>
                <span className="text-gold font-semibold">Status:</span>{" "}
                <span
                  className={`capitalize ${
                    order.status === "delivered"
                      ? "text-green-400"
                      : order.status === "cancel"
                      ? "text-red-400"
                      : "text-gold-light font-semibold"
                  }`}
                >
                  {order.status}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
