// Type: custom hook
// Description: export a custom hook that fetches a store by id
import { redis } from "@/lib/redis";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
interface Store {
    id: string;
    name: string;
    userId: string;
}
const useStore = (id:string) => {
    const {data,isLoading,isError}=useQuery({
        queryKey:['store',id],
        queryFn:async()=> {
            const token= await redis.get('token')
            const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/store/${id}`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            
                return data as Store
            
        },
        staleTime:10000
    })
  return {
    data,
    isLoading,
    isError,
  }
};
export default useStore;