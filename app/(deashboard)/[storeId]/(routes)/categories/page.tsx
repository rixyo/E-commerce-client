"use client"
import React from 'react';
import {CategoryClient} from './components/CategoryClient';
import useGetAllCategories from '@/hooks/useGetAllCategories';
import { CategoryColumn } from './components/columns';


type pageProps = {
    params:{
        storeId:string
    }
};
const Categories:React.FC<pageProps> = ({params}) => {
    const {data:category,isLoading}=useGetAllCategories(params.storeId)
    if(!category) return <div className='flex justify-center items-center h-full'>Category data is loading....</div>
    const formattedCategories:CategoryColumn[] = category.map((item) => ({
        id: item.id,
       name:item.name,
       billboardLabel:item.billboard.label,
        createdAt: item.createdAt.split('T')[0],
      }));
    return (
        <div className='flex-col'>
            <div className='flex-1 space-y-4 p-8 pt-6'>
      {category  && <CategoryClient data={formattedCategories}/> }  
            </div>
        </div>
    )
}
export default Categories;