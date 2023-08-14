// this hook is used to get all colors from the database
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
export interface Color {
    id: string;
    name: string;
    value: string;
    createdAt:Date;
}
const useGetAllColors =  (storeId:string) => {
    const {data,isLoading,isError} = useQuery({
        queryKey:["AllColors"],
        queryFn: async () => {
            const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/color/${storeId}/all`)
            return data as Color[];
        },
    });
    return {
        data,
        isLoading,
        isError,
    }
};
export default useGetAllColors;