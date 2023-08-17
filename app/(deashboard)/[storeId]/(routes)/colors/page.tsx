// this is parent component for all colors routes
"use client"
import React from 'react';
import {  useRouter } from 'next/navigation';
import useGetAllColors from '@/hooks/useGetAllColors';
import { format } from 'date-fns';

import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { DataTable } from "@/components/ui/data-table";
import { Separator } from '@radix-ui/react-dropdown-menu';
import { columns,ColorColumn } from './components/columns';


import { PlusIcon } from 'lucide-react';

type pageProps = {
    params:{
        storeId:string
    }
};
const Colors:React.FC<pageProps> = ({params}) => {
    // fetch all colors based on storeId
    const {data:colors}=useGetAllColors(params.storeId)
    const router = useRouter()
    
    const data:ColorColumn[]|undefined=colors?.map((item)=>({
        id:item.id,
        name:item.name,
        value:item.value,
        createdAt:format(new Date(item.createdAt), 'MMMM do, yyyy').toString(),
    }))

  
    return (
        <>
          <div className='flex-col mt-16'>
            <div className='flex-1 space-y-4 p-8 pt-6'>
   
        <div className='flex justify-between items-center'>
      <Heading
        title={data===undefined?`Colors(0)`:`Colors (${(data?.length)})`}
        description='List of all sizes'
         />  
        <Button  onClick={() => router.push(`/${params.storeId}/colors/new`)}>
          <PlusIcon className="mr-2 h-4 w-4" /> Add
        </Button>
        </div>
        <Separator className='my-4'/>
        <div className='border-2 border-gray-500 p-5 rounded-lg'>

       {data && <DataTable columns={columns} searchKey='name' data={data} />  } 
        </div>
            </div>
        </div>
        </>
    )
}
export default Colors;