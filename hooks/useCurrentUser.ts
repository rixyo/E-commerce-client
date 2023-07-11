import { redis } from "@/lib/redis";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
interface User {
    id: string;
    displayName: string;
    userRole: string;
    avatarUrl: string | null;
    email: string;
    address: [] | null;
}
const useCurrentUser = () => {
    const {data,isLoading,isError}=useQuery({
        queryKey:['user'],
        queryFn:async()=> {
            const token= await redis.get('token')
            const {data} = await axios.get('http://localhost:5000/auth/me',{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            if(data){
                return data as User
            }
        }
    })
  return {
    data,
    isLoading,
    isError,
  }
};
export default useCurrentUser;
