"use client";
import React from 'react';
import { redirect } from 'next/navigation';

import { MainNav } from '@/components/MainNav';
import StoreSwitcher from '@/components/store-switcher';
import useAllStore from '@/hooks/useAllStore';
import useCurrentUser from '@/hooks/useCurrentUser';

const Navbar:React.FC= () => {
    const {data} = useAllStore();
    const {data:user,isLoading}=useCurrentUser()
    if(!user && !isLoading){
        redirect('/auth')
    }
  
    return (
        <div className='border-b'>
           <div className='flex h-16 items-center px-4'>
       {data && <StoreSwitcher items={data} /> }  
        <MainNav className='mx-6'/>
           </div>
           <div className='ml-auto flex items-center space-x-4'>
           </div>
        </div>
    )
}
export default Navbar;