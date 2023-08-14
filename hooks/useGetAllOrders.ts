// this hook is used to get all orders of a store
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { redis } from "@/lib/redis";
type Order ={
    id: string;
    address: string;
    phone: string;
    isPaid: boolean;
    isDelivered: boolean;
    deliveredAt: Date;
    createdAt: Date;
    orderItems: [{
        id: string;
        product: {
            id: string;
            name: string;
            price: number;
        };
        quantity: number;
        color: string;
        size: string;
    }];

}
const useGetAllOrders = (storeId: string) => {
    const {data,isLoading,isError} = useQuery({
        queryKey:["AllOrders"],
        queryFn: async () => {
            const token= await redis.get('token');
            const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/order/${storeId}/all`,{
                headers:{
                    Authorization: `Bearer ${token}`,
                }
            })
            return data as Order[];
        },
    });
    return {
        data,
        isLoading,
        isError,
    }

};
export default useGetAllOrders;
