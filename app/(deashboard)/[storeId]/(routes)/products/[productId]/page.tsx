"use client";
import React from 'react';
import ProductForm from './components/ProductCustomForm';

import { usePathname } from 'next/navigation';
import useGetProductById from '@/hooks/useGetProductById';
import useGetAllCategories from '@/hooks/useGetAllCategories';



const ProductPage = ({params}:{
    params:{
        productId:string
        storeId:string
    }
}) => {
    const {data:product,isLoading}=useGetProductById(params.productId)
    const {data:categories,isLoading:categoriesLoading}=useGetAllCategories(params.storeId)
   const pathname=usePathname()
    return (
        <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
        {pathname.includes('new') && categories &&!categoriesLoading && <ProductForm initialData={undefined} categories={categories}  />  }  
      {categories &&!isLoading &&!categoriesLoading && product && <ProductForm initialData={product} categories={categories}/> } 
      
        </div>
      </div>
    )
}
export default ProductPage;