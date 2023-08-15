import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { redis } from "@/lib/redis";
interface SaleReport {
    
        total_sale: number,
        total_sale_today: number,
        total_sale_thisMonth: number,
        total_sale_thisYear: number,
        total_sale_thisWeek: number,
      
}
const useSaleReport = (storeId:string) => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["sales-overview", storeId],
        queryFn: async () => {
            const token = await redis.get('token')
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/sale/${storeId}`,{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return data as SaleReport;
        },

    });
    return {
        data,
        isLoading,
    }
};
export default useSaleReport ;