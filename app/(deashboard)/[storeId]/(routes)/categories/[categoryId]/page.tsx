// this page isfor single category
"use client";
import React from 'react';
import CategoryForm from './components/CategoryForm';


import { usePathname } from 'next/navigation';
import useGetCategoryById from '@/hooks/useGetCategoryById';


const CategoryPage = ({params}:{
    params:{
        categoryId:string
        storeId:string
    }
}) => {
    const pathname=usePathname();
    const {data:category}=useGetCategoryById(params.categoryId)
    return (
        <div className="flex-col mt-16">
        <div className="flex-1 space-y-4 p-8 pt-6">
       {pathname.includes('new') && <CategoryForm initialData={undefined} />  }  
       {category  && <CategoryForm initialData={category} />}
        </div>
      </div>
    )
}
export default CategoryPage;