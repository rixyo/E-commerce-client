"use client"
import React from 'react';
import { useRouter } from 'next/navigation';
import useGetAllCategories from '@/hooks/useGetAllCategories';

import { columns } from './components/columns';
import { Heading } from '@/components/ui/heading';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { DataTable } from '@/components/ui/data-table';

import { PlusIcon } from 'lucide-react';
type pageProps = {
    params:{
        storeId:string
    }
};
const Categories:React.FC<pageProps> = ({params}) => {
    const {data}=useGetAllCategories(params.storeId)
    const router = useRouter()
    return (
        <div className='flex-col'>
            <div className='flex-1 space-y-4 p-8 pt-6'>
            <div className='flex justify-between items-center'>
      <Heading
        title={data===undefined?`Categories(0)`:`Categories (${(data?.length)})`}
        description='List of all categories'
         />  
        <Button  onClick={() => router.push(`/${params.storeId}/categories/new`)}>
          <PlusIcon className="mr-2 h-4 w-4" /> Add New
        </Button>
        </div>
        <Separator className='my-4'/>
        <div className='border-2 border-gray-500 p-5 rounded-lg'>

        {data && <DataTable columns={columns} searchKey='name' data={data} />}
        </div>
            </div>
        </div>
    )
}
export default Categories;