import axios, { AxiosRequestConfig } from 'axios';
import { useStore } from '@/app/(zstore)/useStore';
const fetcher = async (url: string) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const {token}=useStore();
    try {
    if(!token) return Promise.reject('unauthorized');
  
   const config: AxiosRequestConfig = {
     headers: {
       Authorization: `Bearer ${token}`,
     },
   };
 
   const res = await axios.get(url, config);
 
   return res.data;
    
  } catch (error) {
    console.log(error);
  }
 
};

export default fetcher;