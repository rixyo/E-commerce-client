// this hook is used to get the first store of the user
import { redis } from "@/lib/redis";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
interface Store {
    id: string;
    name: string;
    userId: string;
}
const useFirstStore = () => {
    const {data,isLoading,isError}=useQuery({
        queryKey:['firststore'],
        queryFn:async()=> {
            const token= await redis.get('token')
            const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/store`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            return data as Store
        }
       
    })
    return {
        data,
        isLoading,
        isError,
    }
};
export default useFirstStore;