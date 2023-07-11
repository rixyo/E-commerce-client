import axios, { AxiosRequestConfig } from 'axios';
import {redis} from './redis';
const fetcher = async (url: string) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
const token = await redis.get('token');
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