// this hook is used to get revenue by date for a specific store
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { redis } from "@/lib/redis";


const useGetRevenueByDate = (storeId: string, date:Date) => {
    // convert date to date object
    const dateObject = new Date(date);
   
const { data, isLoading, isError } = useQuery({
    queryKey: ["todaysrevenue",dateObject],
    queryFn: async () => {
        const token = await redis.get('token')
        const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/revenue/${storeId}/${dateObject}`,{
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
export default useGetRevenueByDate;
