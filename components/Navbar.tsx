"use client";
import React from 'react';
import { redirect } from 'next/navigation';

import { MainNav } from '@/components/MainNav';
import StoreSwitcher from '@/components/store-switcher';
import useAllStore from '@/hooks/useAllStore';
import useCurrentUser from '@/hooks/useCurrentUser';
import UserMenubar from './ui/user-menubar';
import { ThemeChange } from './ui/theme-change';
import MobileNav from './MobileNav';

const Navbar:React.FC= () => {
    const {data} = useAllStore();
    const {data:user,isLoading}=useCurrentUser()
    if(!user && !isLoading){
        redirect('/auth')
    }
  
    return (
        <div className='border-b'>
           <div className='hidden md:flex  h-16 items-center px-4 gap-20'>
       {data && <StoreSwitcher items={data} /> }  
        <MainNav className='mx-6'/>
        <div className='flex-1'>
            <ThemeChange />
        </div>
           <div className='flex-1'>
        <UserMenubar />
           </div>
           </div>
           <div className='flex-col md:hidden'>
           <MobileNav store={data}/>

           </div>
        </div>
    )
}
export default Navbar;