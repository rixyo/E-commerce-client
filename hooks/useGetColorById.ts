// this hook is used to get a color by id
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const useGetColorById = (colorId: string) => {
    const { data, isLoading, isError } = useQuery({
        queryKey: ["Color", colorId],
        queryFn: async () => {
            const { data } = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/color/${colorId}`
            );
            return data;
        },
    });
    return {
        data,
        isLoading,
        isError,
    };
};
export default useGetColorById;