// this hook is used to get all store
import { redis } from "@/lib/redis";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
interface Store {
    id: string;
    name: string;
    userId: string;
}

const useAllStore = () => {
    const {data,isLoading,isError}=useQuery({
        queryKey:['Allstore'],
        queryFn:async()=> {
            const token= await redis.get('token')
            const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/store/all`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            return data as Store[]
        },
        staleTime:10000
    })
    return {
        data,
        isLoading,
        isError,
    }
};
export default useAllStore;