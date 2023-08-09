// this hook is used to get a single product by id
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Product } from "./useGetAllProducts";

const useGetProductById = (productId: string) => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["Product", productId],
        queryFn: async () => {
            const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/product/${productId}`);
            return data as Product;
        },
    });
    return {
        data,
        isLoading,
        isError,
    }
};
export default useGetProductById;