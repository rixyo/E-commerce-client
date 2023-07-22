"use client"

import React from 'react';
import { useRouter } from 'next/navigation';
import { formatter } from "@/lib/utils";
import { format } from 'date-fns';

import { PlusIcon } from 'lucide-react';

import { columns,ProductColumn } from './components/columns';
import { Heading } from '@/components/ui/heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { DataTable } from '@/components/ui/data-table';
import useGetAllProducts from '@/hooks/useGetAllProducts';



type pageProps = {
    params:{
        storeId:string
    }
};
const Products:React.FC<pageProps> = ({params}) => {
    const {data:products}=useGetAllProducts(params.storeId,1,10)
    const router = useRouter()
    if(!products){
        return <div className='flex justify-center items-center h-full text-xl font-bold'>Loading....</div>
    }
    const data: ProductColumn[] = products?.map((item) => ({
        id: item.id,
        name: item.name,
        isFeatured: item.isFeatured,
        isArchived: item.isArchived,
        price: formatter.format(item.price),
        category: item.category.name,
        size: item.size.name,
        color: item.color.value,
        createdAt:format(new Date(item.createdAt), 'MMMM do, yyyy').toString(),
      }));
    return (
        <div className='flex-col'>
            <div className='flex-1 space-y-4 p-8 pt-6'>
            <div className='flex justify-between items-center'>
      <Heading
        title={data===undefined?'Products(0)':`Products (${(data?.length)})`}
        description='BillBoard is a place where you can advertise your products'
         />  
        <Button  onClick={() => router.push(`/${params.storeId}/products/new`)}>
          <PlusIcon className="mr-2 h-4 w-4" /> Add
        </Button>
        </div>
        <Separator className='my-4'/>
        <div className='border-2 border-gray-500 p-5 rounded-lg'>
       <DataTable columns={columns} searchKey='name' data={data} />  
        </div>
   
            </div>
        </div>
    )
}
export default Products;