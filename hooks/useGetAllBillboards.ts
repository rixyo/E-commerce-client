import axios from "axios";
import {useQuery} from "@tanstack/react-query"
import { redis } from "@/lib/redis";
interface Billboard {
    id:string,
    label:string,
    imageUrl:string,
    storeId:string,
    createdAt:string,
}
const useGetAllBillboards = (storeId:string) => {
    const {data,isLoading,isError}=useQuery({
        queryKey:['store',storeId],
        queryFn:async()=> {
            const token= await redis.get('token')
            const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/billboard/${storeId}/findall`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            
                return data as Billboard[] 
            
        }
    })
  return {
    data,
    isLoading,
    isError,
  }
}
export default useGetAllBillboards;