// this hook is used to get all sizes of a store
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
export interface Size {
    id: string;
    name: string;
    storeId: string;
    value: string;
    createdAt: Date;
}
const useGetAllSizes =  (storeId:string) => {
    const {data,isLoading,isError} = useQuery({
        queryKey:["AllSizes",storeId],
        queryFn: async () => {
            const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/size/${storeId}/all`)
            return data as Size[];
        }
    });
    return {
        data,
        isLoading,
        isError,
    }
}
export default useGetAllSizes;
