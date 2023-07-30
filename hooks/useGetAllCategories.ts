import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { redis } from "@/lib/redis";
export interface Category {
    id: string;
    name: string;
    gender: string;
    billboard: {
        label: string;
    };
    storeId: string;
    createdAt: Date;
}
const useGetAllCategories =  (storeId:string) => {
    const token = redis.get("token");
    const { data, isLoading, isError } = useQuery({
        queryKey: ["AllCategories"],
        queryFn: async () => {
            const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/category/${storeId}/findall`,{
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            return data as Category[];
        },
    });
    return {
        data,
        isLoading,
        isError,
    };
};
export default useGetAllCategories;