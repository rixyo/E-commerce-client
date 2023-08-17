// parent component for single billboard route
"use client";
import React from 'react';
import { usePathname } from 'next/navigation';
import useBillBoardById from '@/hooks/useBillBoardById';

import BillboardForm from './components/BillBoardForm';


const BillBoardPage = ({params}:{
    params:{
        billboardId:string
        storeId:string
    }
}) => {
    const pathname=usePathname();
    const {data:billboard,isLoading}=useBillBoardById(params.billboardId)
    return (
        <div className="flex-col mt-16">
        <div className="flex-1 space-y-4 p-8 pt-6">
       {pathname.includes('new') && <BillboardForm initialData={undefined} />  }  
     
       {billboard &&!isLoading && <BillboardForm initialData={billboard} />}
        </div>
      </div>
    )
}
export default BillBoardPage;