import axios from "axios";
import { useQuery } from "@tanstack/react-query";
export interface Size {
    id: string;
    name: string;
    storeId: string;
    value: SizeType;
    createdAt: string;
}
enum SizeType {
    SMALL,
    MEDIUM,
    LARGE,
    XLARGE,
    XXLARGE,
    XXXLARGE
  }
const useGetAllSizes =  (storeId:string) => {
    const {data,isLoading,isError} = useQuery({
        queryKey:["AllSizes"],
        queryFn: async () => {
            const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/size/${storeId}/findall`)
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
