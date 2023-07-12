"use client"
import AuthForm from '@/components/AuthForm';
import useCurrentUser from '@/hooks/useCurrentUser';
import useFirstStore from '@/hooks/useFirstStore';
import { redirect } from 'next/navigation';
import React, { useEffect } from 'react';

const page:React.FC = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {data:user,isLoading}=useCurrentUser()
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {data:store,isLoading:storeLoading}=useFirstStore()
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
        if(user && !isLoading && user.userRole==='ADMIN'){
           redirect(`/${store?.id}`)
        }

    }, [user,isLoading,store?.id]);
    
    return (
        <div className="flex items-center justify-center h-full bg-[url('/signin-bg.svg')]">
        <AuthForm/>
        </div>
    )
}
export default page;