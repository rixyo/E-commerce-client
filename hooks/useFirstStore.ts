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
            const {data} = await axios.get(`http://localhost:5000/store`,{
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