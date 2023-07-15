"use client";
import React from 'react';
import CategoryForm from './components/CategoryForm';
import useBillBoardById from '@/hooks/useBillBoardById';
import { usePathname } from 'next/navigation';


const CategoryPage = ({params}:{
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
       {pathname.includes('new') && <CategoryForm initialData={undefined} />  }  
     
       {billboard &&!isLoading && <CategoryForm initialData={billboard} />}
        </div>
      </div>
    )
}
export default CategoryPage;