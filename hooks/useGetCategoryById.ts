// this hook is used to get a category by its id
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Category } from "./useGetAllCategories";

const useGetCategoryById = (categoryId: string) => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["Category", categoryId],
        queryFn: async () => {
            const { data } = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/category/${categoryId}`
            );
            return data as Category;
        },
    });
    return {
        data,
        isLoading,
        isError,
    };
};
export default useGetCategoryById;