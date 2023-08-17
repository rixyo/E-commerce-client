// this page is for listing all sizes
"use client"
import React from 'react';
import useGetAllSizes from '@/hooks/useGetAllSizes';
import {  useRouter } from 'next/navigation';
import { format } from 'date-fns';

import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import { DataTable } from "@/components/ui/data-table";
import { Separator } from '@radix-ui/react-dropdown-menu';
import { columns, SizeColumn} from './components/columns';


import { PlusIcon } from 'lucide-react';

type pageProps = {
    params:{
        storeId:string
    }
};
const Sizes:React.FC<pageProps> = ({params}) => {
    // this is the hook that gets all the sizes
    const {data:sizes}=useGetAllSizes(params.storeId)
    const router = useRouter()
    // convert the data to the format that the data table can understand
    const data:SizeColumn[]|undefined=sizes?.map((item)=>({
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
        title={data===undefined?`Sizes(0)`:`Sizes (${(data?.length)})`}
        description='List of all sizes'
         />  
        <Button  onClick={() => router.push(`/${params.storeId}/sizes/new`)}>
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
export default Sizes;