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
            const {data} = await axios.get(`http://localhost:5000/store/${id}`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            if(data){
                return data
            }
        }
    })
  return {
    data,
    isLoading,
    isError,
  }
};
export default useStore;