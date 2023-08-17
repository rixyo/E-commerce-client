// this is the products page for the dashboard
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
  // this is the hook that gets all the products
    const {data:products}=useGetAllProducts(params.storeId)
    const router = useRouter()
  // convert the data to the format that the data table can understand
    const data: ProductColumn[] | undefined = products?.map((item) => ({
        id: item.id,
        name: item.name,
        isFeatured: item.isFeatured,
        isArchived: item.isArchived,
        price: formatter.format(item.price),
        category: item.category.name,
        sizes: item.Sizes,
        colors: item.Colors,
        createdAt:format(new Date(item.createdAt), 'MMMM do, yyyy').toString(),
      }));
    return (
        <div className='flex-col mt-16'>
            <div className='flex-1 space-y-4 p-8 pt-6'>
            <div className='flex justify-between items-center'>
      <Heading
        title={data===undefined?'Products(0)':`Products (${(data?.length)})`}
        description='Manage your products here'
         />  
        <Button  onClick={() => router.push(`/${params.storeId}/products/new`)}>
          <PlusIcon className="mr-2 h-4 w-4" /> Add
        </Button>
        </div>
        <Separator className='my-4'/>
        <div className='border-2 border-gray-500 p-5 rounded-lg'>
      {data &&  <DataTable columns={columns} searchKey='id' data={data} />   }
        </div>
   
            </div>
        </div>
    )
}
export default Products;