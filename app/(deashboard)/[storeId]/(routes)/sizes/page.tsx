"use client"
import React from 'react';
import useGetAllSizes from '@/hooks/useGetAllSizes';
import {  useRouter } from 'next/navigation';

import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { DataTable } from "@/components/ui/data-table";
import { Separator } from '@radix-ui/react-dropdown-menu';
import { columns } from './components/columns';


import { PlusIcon } from 'lucide-react';

type pageProps = {
    params:{
        storeId:string
    }
};
const Sizes:React.FC<pageProps> = ({params}) => {
    const {data}=useGetAllSizes(params.storeId)
    const router = useRouter()
    return (
        <>
          <div className='flex-col'>
            <div className='flex-1 space-y-4 p-8 pt-6'>
   
        <div className='flex justify-between items-center'>
      <Heading
        title={data===undefined?`Sizes(0)`:`Sizes ${(data?.length)}`}
        description='List of all sizes'
         />  
        <Button  onClick={() => router.push(`/${params.storeId}/sizes/new`)}>
          <PlusIcon className="mr-2 h-4 w-4" /> Add
        </Button>
        </div>
        <Separator className='my-4'/>
        <div className='border-2 border-gray-500 p-5 rounded-lg'>

       {data &&  <DataTable columns={columns} searchKey='name' data={data} /> }
        </div>
            </div>
        </div>
        </>
    )
}
export default Sizes;