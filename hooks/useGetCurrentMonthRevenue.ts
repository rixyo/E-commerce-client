// this hook is used to get current month revenue of a store
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { redis } from "@/lib/redis";

const useGetCurrentMonthRevenue = (storeId: string) => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["currentmonthrevenue", storeId],
        queryFn: async () => {
            const token = await redis.get('token')
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/revenue/${storeId}/currentmonth`,{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            return data;
        },
    });
    return {
        data,
        isLoading,
    }
};
export default useGetCurrentMonthRevenue;
