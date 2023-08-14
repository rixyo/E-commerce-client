// this hook is used to get all billboards of a store
import axios from "axios";
import {useQuery} from "@tanstack/react-query"
interface Billboard {
    id:string,
    label:string,
    imageUrl:string,
    storeId:string,
    createdAt:string,
}
const useGetAllBillboards = (storeId:string) => {
    const {data,isLoading,isError}=useQuery({
        queryKey:['billboards'],
        queryFn:async()=> {
            const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/billboard/${storeId}/all`,{
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