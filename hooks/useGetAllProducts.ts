import axios from "axios";
import { useQuery } from "@tanstack/react-query";


export interface Product {
    id: string;
    name: string;
    price: number;
    categoryId: string;
    category:{
        name:string;

    }
    description: string;
    Colors: { value: string }[];
    Sizes: { value: string }[];
    Images: { url: string }[];
    createdAt: Date;
    isFeatured: boolean;
    isArchived: boolean;
    

}

const useGetAllProducts =  (storeId:string,page:number,perPage:number) => {
    const {data,isLoading,isError} = useQuery({
        queryKey:["AllProducts"],
        queryFn: async () => {
            const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/product/${storeId}/findall?page=${page}&perPage=${perPage}`)
            return data as Product[];
        }
    });
    return {
        data,
        isLoading,
        isError,
    }
};
export default useGetAllProducts;