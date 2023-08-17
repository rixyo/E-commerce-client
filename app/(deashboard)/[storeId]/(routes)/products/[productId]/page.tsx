"use client";
import React from 'react';
import ProductForm from './components/ProductCustomForm';

import { usePathname } from 'next/navigation';
import useGetProductById from '@/hooks/useGetProductById';
import useGetAllCategories from '@/hooks/useGetAllCategories';
import useGetAllColors from '@/hooks/useGetAllColors';
import useGetAllSizes from '@/hooks/useGetAllSizes';



const ProductPage = ({params}:{
    params:{
        productId:string
        storeId:string
    }
}) => {
    const {data:product}=useGetProductById(params.productId)
    const {data:categories}=useGetAllCategories(params.storeId)
    const {data:colors}=useGetAllColors(params.storeId)
    const {data:sizes}=useGetAllSizes(params.storeId)
   const pathname=usePathname()
    return (
        <div className="flex-col mt-16">
        <div className="flex-1 space-y-4 p-8 pt-6">
        {pathname.includes('new') && categories &&colors &&sizes  && <ProductForm initialData={undefined} categories={categories} colors={colors} sizes={sizes}  />  }  
      {categories && product &&colors &&sizes && <ProductForm initialData={product} categories={categories} colors={colors} sizes={sizes}/> } 
      
        </div>
      </div>
    )
}
export default ProductPage;