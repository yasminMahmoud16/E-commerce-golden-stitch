import {   useState, type ReactNode } from 'react'
// import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAxios } from '@/Hooks/useAxios';
// import { toast } from 'sonner';
import { useAuthContext } from '@/Hooks/useAppContexts';
import { OrderContext } from './contextCreations/OrderContext';
import { StateEnum, type CreateOrder } from '@/Utilities/types';
import { toast } from 'sonner';
import axios from 'axios';
import { keepPreviousData, useQuery, useQueryClient } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import type { IOrder } from '@/Utilities/interfaces';


export default function OrderContextProvider({ children }: { children: ReactNode }) {
  const axiosInstance = useAxios();
  const [page, setPage] = useState(1);
  const [size] = useState(5);
  // const [search, setSearch] = useState("");
      const [statusFilter, setStatusFilter] = useState<string>("all");

  // const [isUpdating] = useState(false); 
  // const {getAuthHeader}= useAuthContext
  const { getAuthHeader, token } = useAuthContext();
  //
  const queryClient = useQueryClient();


  const createOrder = async (orderData: CreateOrder): Promise<string | undefined> => {
    try {
      const res = await axiosInstance.post(`/order`, orderData, {
        headers: getAuthHeader()
      });
      console.log(res);
      
      if (res.data.message === "Done") {
        toast.success(res.data.message)
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const message = error.response?.data.message
        const detailedError = error?.response?.data?.cause?.validationErrors?.[0]?.issues?.[0]?.message;
        
        if (message) {
          console.log({ messageCreateOrder: message });
          toast.error(message);
          
        } else if (detailedError) {
          
          toast.error(detailedError);
          console.log({ errorCreateOrder: detailedError });
        }
        return "something wrong please try again later "
      }
      
      
    }
  }
  



  // 🔹 Get All orders
const getAllOrders = async ({ page = 1, size = 5, status = "all" }) => {
  try {
    const url = `/order?page=${page}&size=${size}${status !== "all" ? `&status=${status}` : ""}`;

    const res = await axiosInstance.get(url);
    const allOrders = res.data.data.orders.docs;

    console.log("allOrders=================", allOrders);
    return allOrders;
  } catch (error) {
    console.log("order fetch error", error);
    return [];
  }
};



  
const { data: ordersData = [] } = useQuery({
  queryKey: ['ordersData', page, size, statusFilter],
  queryFn: () => getAllOrders({ page, size, status:statusFilter }),
  placeholderData: keepPreviousData,
  enabled: !!token, 
});




  const cancelOrder = async (id: string, reason: string): Promise<string | undefined> => {
  try {
    const res = await axiosInstance.patch(`/order/${id}/cancel`, { reason }, {
      headers: getAuthHeader(),
    });

    if (res.data.message === "Done") {
      Swal.fire({
        title: "Order Canceled Successfully",
        icon: "success",
        draggable: true,
        background: "#182129",
        color: "#ffff",
        confirmButtonColor: "#6B4129"
      });

      // await queryClient.invalidateQueries(['ordersData']);


        queryClient.setQueryData(['ordersData', page, size, statusFilter], (oldData: IOrder[] | undefined) => {
    if (!oldData) return oldData;
    return oldData.map((order) =>
      order.id === id ? { ...order, status: StateEnum.cancel } : order
    );
  });

  // // Ensure backend + UI are in sync
  // queryClient.invalidateQueries({
  //   queryKey: ['ordersData'],
  // });
      // queryClient.setQueryData(['ordersData'], (oldData: IOrder[]) => {
      //   if (!oldData) return oldData;

      //   return oldData?.map((order: IOrder) =>
      //     order.id === id ? { ...order, status: StateEnum.cancel } : order
      //   );
      // });
    }

    return res.data.message;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const detailedError = error?.response?.data?.cause?.validationErrors?.[0]?.issues?.[0]?.message;
      const generalError = error?.response?.data?.message;
      toast.error(detailedError || generalError || "Something went wrong");
      return detailedError || generalError || "Something went wrong";
    }
  }
};



  const onWayByAmin = async (id: string):Promise<string|undefined> => {
  try {
    const res = await axiosInstance.patch(`/order/${id}/on-way`, {}, {
      headers: getAuthHeader()
    });
    console.log(res);
    
    if (res.data.message === "Done") {
      toast.success("order is on way");
        queryClient.setQueryData(['ordersData'], (oldData: IOrder[]) => {
        if (!oldData) return oldData;

        return oldData?.map((order: IOrder) =>
          order.id === id ? { ...order, status: StateEnum.onWay } : order
        );
      });


    }

  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log({onWayByAmin:error});
          
          console.log(" order on way error:", error?.response?.data || error);
          const detailedError = error?.response?.data?.cause?.validationErrors?.[0]?.issues?.[0]?.message;
          const generalError = error?.response?.data?.message;
          toast.error(detailedError || generalError || "Something went wrong");
          return detailedError || generalError || "Something went wrong"
        }
    
  }
  
  return "null"


    
}
  
  
  
  
  
  
  
const onDeliveredByAmin = async (id: string): Promise<string | undefined> => {
  try {
    const res = await axiosInstance.patch(`/order/${id}/delivered`, {}, {
      headers: getAuthHeader()
    });
    console.log(res);

        if (res.data.message === "Done") {
      toast.success("order is on delivered");
        queryClient.setQueryData(['ordersData'], (oldData: IOrder[]) => {
        if (!oldData) return oldData;

        return oldData?.map((order: IOrder) =>
          order.id === id ? { ...order, status: StateEnum.delivered } : order
        );
      });


    }
    
  } catch (error) {
    console.log({onWayByAmin:error});
    
    }
    return "null"
}










  



  
  
  
  

  return (
    <OrderContext.Provider
      value={{
        // allOrders,
        // isLoading,
        // isUpdating, 
        page,
        createOrder,
        onWayByAmin,
        onDeliveredByAmin,
        cancelOrder,
        ordersData,
        setPage,
        // search,
        // setSearch,
        statusFilter, setStatusFilter
        // getAllOrders
        // getOrderById,
        // cancelOrder
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}
