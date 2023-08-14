// this hook is used to get all products from the database
import axios from "axios";
import { useQuery } from "@tanstack/react-query";


export interface Product {
    id: string;
    name: string;
    price: number;
    category:{
        id:string;
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

const useGetAllProducts =  (storeId:string) => {
    const {data,isLoading,isError} = useQuery({
        queryKey:["AllProducts"],
        queryFn: async () => {
            const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/product/${storeId}/all`)
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