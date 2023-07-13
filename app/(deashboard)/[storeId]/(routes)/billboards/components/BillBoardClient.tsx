"use client";
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { DataTable } from "@/components/ui/data-table";
import { columns, BillboardColumn } from "./columns";

import { useParams, useRouter } from 'next/navigation';
import React from 'react';

import { PlusIcon } from 'lucide-react';
import { Separator } from '@radix-ui/react-dropdown-menu';
export  function BillBoardClient({data}:{
  data:BillboardColumn[]
})  {
    const router = useRouter()
    const params =useParams()
    return (
     <>
        <div className='flex justify-between items-center'>
      <Heading
        title={`Bill Boards ${(data?.length)}`}
        description='BillBoard is a place where you can advertise your products'
         />  
        <Button  onClick={() => router.push(`/${params.storeId}/billboards/new`)}>
          <PlusIcon className="mr-2 h-4 w-4" /> Add New
        </Button>
        </div>
        <Separator className='my-4'/>
        <div className='border-2 border-gray-500 p-5 rounded-lg'>

        <DataTable columns={columns} searchKey='label' data={data} />
        </div>
        </>
      
    
    )
}
