// this hook is used to get order by id
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { redis } from "@/lib/redis";

const useGetOrderById = (orderId: string) => {
    
    const { data, isLoading, isError } = useQuery({
        queryKey: ["Order", orderId],
        queryFn: async () => {
            const token=await redis.get('token');
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/order/${orderId}`,{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            });
            return data;
        },
    });
    return {
        data,
        isLoading,
        isError,
    }
};
export default useGetOrderById;