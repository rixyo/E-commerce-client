// this hook is used to get current user data
import { redis } from "@/lib/redis";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
interface User {
    id: string;
    displayName: string;
    userRole: UserRole;
    avatarUrl: string | null;
    email: string;
    address: [] | null;
}
enum UserRole {
    ADMIN = 'ADMIN',
    USER = 'USER',
}
const useCurrentUser = () => {
    const {data,isLoading,isError}=useQuery({
        queryKey:['user'],
        queryFn:async()=> {
            const token= await redis.get('token')
            const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            
                return data as User
            
        }
    })
  return {
    data,
    isLoading,
    isError,
  }
};
export default useCurrentUser;
