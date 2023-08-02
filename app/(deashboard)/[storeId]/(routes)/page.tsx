"use client";
import useCurrentUser from '@/hooks/useCurrentUser';
import useStore from '@/hooks/useStoreById';
import React from 'react';
type pageProps = {
    params:{
        storeId:string
    }
    
};

const DeshboardPage:React.FC<pageProps> = ({params}) => {
    const {data,isLoading}=useStore(params.storeId)
    if(!data && isLoading){
        return <div>Loading....</div>
    }
    
    return (
        <div>
            {data?.name}
        </div>
    )
}
export default DeshboardPage;