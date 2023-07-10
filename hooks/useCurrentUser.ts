import useSwr from 'swr';
import  fetcher from '../lib/fetcher';

export const useCurrentUser = () => {
    const { data, error, mutate } = useSwr('http://localhost:5000/auth/me', fetcher);    
    return {
        data,
        error,
        mutate,
    }
};