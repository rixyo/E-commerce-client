"use client";
import useCurrentUser from '@/hooks/useCurrentUser';
import useStore from '@/hooks/useStoreById';
import { redirect } from 'next/navigation';
import React, { useEffect } from 'react';
import SettingForm from './components/SettingForm';

type pageProps = {
    params:{
        storeId:string
    }
};
const SettingPage:React.FC<pageProps> = ({params}) => {
    const {data,isLoading}=useStore(params.storeId)
    const {data:user,isLoading:isUserLoading}=useCurrentUser()
    useEffect(() => {
        if(!user && !isUserLoading){
            redirect('/auth')
        }
        else if(data?.userId!==user?.id){
            redirect('/auth')
        }
    }, [user,isUserLoading,data?.userId]);
    if(!data && !isLoading){
        redirect('/')
    }
    return (
        <div className='flex-col'>
             <div className="flex-1 space-y-4 p-8 pt-6">
             {data && <SettingForm store={data}/> }   
              
             </div>
        </div>
    )
}
export default SettingPage;