"use client";
import React, { Suspense } from 'react';
import ProductForm from './components/ProductForm';

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
    const {data:product,isLoading}=useGetProductById(params.productId)
    const {data:categories,isLoading:categoriesLoading}=useGetAllCategories(params.storeId)
    const {data:colors,isLoading:colorsLoading}=useGetAllColors(params.storeId)
    const {data:sizes,isLoading:sizeLoading}=useGetAllSizes(params.storeId)
    console.log(product);
    const pathname=usePathname();
    return (
        <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
        {pathname.includes('new') && categories &&!categoriesLoading &&!colorsLoading && colors && !sizeLoading  &&  sizes && <ProductForm initialData={undefined} categories={categories}  />  }  
       {product  && categories && colors && sizes && !isLoading && !colorsLoading && !categoriesLoading && !sizeLoading &&  <ProductForm initialData={product} categories={categories}  />}
        </div>
      </div>
    )
}
export default ProductPage;