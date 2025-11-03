import { Icons } from "@/assets/Icons/icons";
import AdminTitles from "@/common/AdminTitles";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/Components/ui/pagination";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { useOrderContext } from "@/Hooks/useAppContexts";
import { SpinnerCustomData } from "@/Loading/SpinnerCustomData";
import { StateEnum } from "@/Utilities/types";

export default function OrderDetails() {
  const { ordersData, page, setPage, statusFilter, setStatusFilter, loadingDetails } = useOrderContext();
  const baseUrlImage = "https://www.goldenstitchleathers.com/api";


  // console.log({ ordersDataUser: ordersData });

  return (
    <>
         <AdminTitles
                  text="Your Orders"
                  icon={Icons.BsBoxSeamFill}
              />
      <h1 className="text-center text-4xl font-semibold text-gold-light mb-10">
        Order Details
      </h1>

      <div className=" gap-6">
        {loadingDetails ? <>
        <SpinnerCustomData/>
        </> : <>
                <div className="relative mb-2 mr-4 flex justify-end">
            <Select
                value={statusFilter}
                onValueChange={(value) => setStatusFilter(value)}
            >
                <SelectTrigger className="w-[150px] bg-transparent text-gold border-gold border-4">
                    <SelectValue placeholder="Select status" />
                </SelectTrigger>

                <SelectContent className="bg-dark-blue-nav border-gray-400 text-gray-400">

                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value={StateEnum.placed}>Placed</SelectItem>
                    <SelectItem value={StateEnum.onWay}>On Way</SelectItem>
                    <SelectItem value={StateEnum.delivered}>Delivered</SelectItem>
                    <SelectItem value={StateEnum.cancel}>Cancelled</SelectItem>
                </SelectContent>
            </Select>
        </div>
        {ordersData?.docs?.map((order) => (
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
                    src={`${baseUrlImage}/${p.productId?.images?.[0]}`}
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

            <div className="mt-5 space-y-2 text-sm text-gray-200 capitalize">
              <p>
                <span className="text-gold font-semibold">Username:</span>{" "}
                {order.createdBy?.username}
              </p>
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
              <p className="flex items-center gap-2 text-gold font-semibold">
                color:
                {order.products.map((pro) => (
                  <span
                  className="inline-block w-5 h-5 rounded-full border border-gray-400 mr-1"
                    title={pro.color}
                    style={{
        backgroundColor: pro.color 
      }}
                  >

                    
                  </span>
                ))}
              </p>
              <p>
                <span className="text-gold font-semibold">Note:</span>{" "}
                {order.note || "No notes"}
              </p>
              <p  className="text-gold font-bold text-lg">
                    Total:
                    <span className=" text-gray-300 ml-2 font-bold text-lg">
                        {order.subtotal}
                    </span>{" "}
                    
                </p>
              <p>
                <span className="text-gold font-semibold">Status:</span>{" "}
                <span
                  className={`capitalize ${
                    order.status === StateEnum.delivered? "text-green-400"
                      : order.status === StateEnum.cancel? "text-red-400"
                      : order.status === StateEnum.onWay ? "text-gold-light font-semibold"
                        :"text-blue-500"
                  }`}
                >
                  {order.status}

                </span>
              </p>
                  Last Updated: {new Date(order.updatedAt).toLocaleString()}
            </div>
          </div>
        ))}
        {ordersData && ordersData?.docs?.length > 0 && (
                        <Pagination className="mb-4">
                            <PaginationContent>
                                {page > 1 && (
                                    <PaginationItem>
                                        <PaginationPrevious
                                            className="cursor-pointer transition-all ease-in-out duration-300 text-gold-dark hover:bg-transparent hover:text-dark-blue-2"
                                            onClick={() => setPage((prev) => (prev > 1 ? prev - 1 : 1))}
                                        />
                                    </PaginationItem>
                                )}

                                <PaginationItem>
                                    <PaginationLink isActive className="cursor-pointer rounded-full">
                                        {page}
                                    </PaginationLink>
                                </PaginationItem>

                                {page < (ordersData?.pages || 1) && (
                                    <PaginationItem>
                                        <PaginationNext
                                            className="cursor-pointer transition-all ease-in-out duration-300 text-gold-dark hover:bg-transparent hover:text-dark-blue-2"
                                            onClick={() =>
                                                setPage((prev) =>
                                                    prev < (ordersData?.pages || 1) ? prev + 1 : prev
                                                )
                                            }
                                        />
                                    </PaginationItem>
                                )}
                            </PaginationContent>
                        </Pagination>
                    )}
        </>}
      </div>
    </>
  );
}
