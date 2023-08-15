
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { redis } from "@/lib/redis";

const useGraphRevenue = (storeId:string) => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["revenue-overview", storeId],
        queryFn: async () => {
            const token = await redis.get('token')
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/revenue/${storeId}/overview`,{
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
export default useGraphRevenue ;