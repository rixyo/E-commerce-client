// this hook is used to get all categories from the server
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

export interface Category {
    id: string;
    name: string;
    gender: string;
    imageUrl: string;
    billboard: {
        id: string;
        label: string;
    };
    storeId: string;
    createdAt: Date;
}
const useGetAllCategories =  (storeId:string) => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["AllCategories"],
        queryFn: async () => {
            const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/category/${storeId}/all`)
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