// Type:custom hook
// Description: export a custom hook that fetches a store's total revenue by id
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { redis } from "@/lib/redis";

const useGetStoreRevenue = (storeId: string) => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["revenue", storeId],
        queryFn: async () => {
            const token = await redis.get('token')
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/revenue/${storeId}`,{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return data;
        },

    });
    return {
        data,
        isLoading,
    }
};
export default useGetStoreRevenue;