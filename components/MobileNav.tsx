// this component is for mobile navigation
"use client";
import React, { useCallback, useState } from 'react';

import useGetAllCategories from '@/hooks/useGetAllCategories';
import { useParams, usePathname,useRouter } from 'next/navigation';

import {X,AlignJustifyIcon, Smile, Star, Package, LogOut} from "lucide-react"

import {Button} from '@/components/ui/button';

import Link from 'next/link';
import useMobileNaveOpen from '@/hooks/useHandleMobileNav';

import { cn } from '@/lib/utils';
import StoreSwitcher from './store-switcher';
import { ThemeChange } from './ui/theme-change';
import { redis } from '@/lib/redis';

interface MobileNavProps {
    store: any;
}


const MobileNav:React.FC<MobileNavProps> = ({store}) => {
    const pathname=usePathname()
    const params=useParams()
  const navHandle=useMobileNaveOpen()//handle mobile nav or close it
 
  const logout = () => {
    redis.del('token');
  };
  const handleLogout=()=>{
    logout();
    window.location.href = '/';
  }
  const routes=[
    {
        href:`/${params.storeId}`,
        label:'Dashboard',
        isActive:pathname.includes('/')

    },
    {
        href:`/${params.storeId}/billboards`,
        label:'Billboards',
        isActive:pathname.includes('billboards')

    },
    {
        href:`/${params.storeId}/categories`,
        label:'Categories',
        isActive:pathname.includes('categories')

    },
    {
        href:`/${params.storeId}/sizes`,
        label:'Sizes',
        isActive:pathname.includes('sizes')

    },
    {
        href:`/${params.storeId}/colors`,
        label:'Colors',
        isActive:pathname.includes('colors')

    },
    {
        href:`/${params.storeId}/products`,
        label:'Products',
        isActive:pathname.includes('products')

    },
    {
        href:`/${params.storeId}/orders`,
        label:'Orders',
        isActive:pathname.includes('orders')

    },
    {
        href:`/${params.storeId}/settings`,
        label:'Settings',
        isActive:pathname.includes('settings')

    }
]
    return (
      <>
      <div className='fixed z-50 w-screen flex justify-between top-0 left-0 p-5   items-center bg-white dark:bg-black border-t-[1px] md:hidden'>
        <AlignJustifyIcon onClick={navHandle.onOpen}   className='cursor-pointer ' size={30}/>
        <StoreSwitcher items={store} /> 
      
      </div>
         <div className={`fixed top-0 left-0 w-full h-screen bg-white z-50 transform transition-all duration-300 ease-in-out ${navHandle.isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div>
          <Button size={"icon"}   onClick={navHandle.onClose} className='absolute top-0 right-0 hover:bg-white bg-white mt-1'>
           <X size={30} className='text-black'/>
            </Button>
        </div>
         
          
            <>

              <div className='flex-row items-center justify-center'>
                {routes.map((route,index)=>(
                  <div key={index} className='flex-col items-center justify-center gap-x-2 mt-3 ml-8' onClick={navHandle.onClose}>

                     <Link href={route.href} key={route.href} className={cn(
                      "text-lg font-medium transition-colors  text-gray-900 hover:text-primary focus:outline-none focus:text-gray-700  duration-150 ease-in-out"
                      ,route.isActive ? 'text-black ' : 'text-black '
                  )}>
                    <div className='flex items-center justify-start gap-x-2 '>
                      <span>{route.label}</span>
                    </div>
                  </Link>

                  </div>
                ))}

              </div>
            </>
            <div className='flex items-center gap-2 mt-2' onClick={handleLogout}>

        <LogOut  className=' text-black h-5 w-5 ml-8' />
        <span className='text-black'>Logout</span>
        </div>
            <div className='flex justify-center'>
            <ThemeChange />
            </div>
          
           </div>
    </>
    )
}
export default MobileNav;