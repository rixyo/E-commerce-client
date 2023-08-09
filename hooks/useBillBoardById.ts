// this hook is used to get a billboard by id
import axios from "axios";
import {useQuery} from "@tanstack/react-query"
import { redis } from "@/lib/redis";

interface Billboard {
    id:string,
    label:string,
    imageUrl:string,
}
const useBillBoardById = (id:string) => {
    const {data,isLoading,isError}=useQuery({
        queryKey:['BillboardById',id],
        queryFn:async()=> {
            const token= await redis.get('token')
            const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/billboard/${id}`,{
                headers:{
                    Authorization:`Bearer ${token}`
                }
            })
            
                return data as Billboard
            
        }
    })
  return {
    data,
    isLoading,
    isError,
  }
    
}
export default useBillBoardById;