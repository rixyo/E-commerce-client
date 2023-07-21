"use client";
import React, { Suspense } from 'react';
import BillboardForm from './components/SizeForm';
import useBillBoardById from '@/hooks/useBillBoardById';
import { usePathname } from 'next/navigation';


const SizePage = ({params}:{
    params:{
        billboardId:string
        storeId:string
    }
}) => {
    const pathname=usePathname();
    const {data:billboard,isLoading}=useBillBoardById(params.billboardId)
    return (
        <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
       {pathname.includes('new') && <BillboardForm initialData={undefined} />  }  
     
       {billboard &&!isLoading && <BillboardForm initialData={billboard} />}
        </div>
      </div>
    )
}
export default SizePage;