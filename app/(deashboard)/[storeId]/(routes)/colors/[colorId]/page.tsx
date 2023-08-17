"use client";
import React from 'react';
import { usePathname } from 'next/navigation';
import useGetColorById from '@/hooks/useGetColorById';

import ColorForm from './components/ColorForm';



const ColorPage = ({params}:{
    params:{
        colorId:string
        storeId:string
    }
}) => {
    const pathname=usePathname();
    // fetch color by id
    const {data:color,isLoading}=useGetColorById(params.colorId)
    return (
        <div className="flex-col mt-16">
        <div className="flex-1 space-y-4 p-8 pt-6">
       {pathname.includes('new') && <ColorForm initialData={undefined} />  }  
     
       {color &&!isLoading && <ColorForm initialData={color} />}
        </div>
      </div>
    )
}
export default ColorPage;