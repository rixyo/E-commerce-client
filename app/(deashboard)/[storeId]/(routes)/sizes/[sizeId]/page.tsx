// this is the page for the size form 
"use client";
import React, { Suspense } from 'react';
import SizeForm from './components/SizeForm';

import { usePathname } from 'next/navigation';
import useGetSizeById from '@/hooks/useGetSizeById';


const SizePage = ({params}:{
    params:{
        sizeId:string
        storeId:string
    }
}) => {
    const pathname=usePathname();
    const {data:size}=useGetSizeById(params.sizeId)
    return (
        <div className="flex-col mt-16">
        <div className="flex-1 space-y-4 p-8 pt-6">
       {pathname.includes('new') && <SizeForm initialData={undefined} />  }  
     
       {size && <SizeForm initialData={size} />}
        </div>
      </div>
    )
}
export default SizePage;