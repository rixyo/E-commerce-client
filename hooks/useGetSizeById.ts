// this hook is used to get a size by id
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Size } from "./useGetAllSizes";
const useGetSizeById = (id:string) => {
    const {data,isLoading,isError}=useQuery({
        queryKey:['size',id],
        queryFn:async()=>{
            const {data}=await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/size/${id}`)
            return data as Size;
        }
    });
    return {data,isLoading,isError}
}
export default useGetSizeById;