"use client"

import React from 'react';
import {BillBoardClient} from './components/BillBoardClient';
import useGetAllBillboards from '@/hooks/useGetAllBillboards';
import { BillboardColumn } from './components/columns';


type pageProps = {
    params:{
        storeId:string
    }
};
const BillBoards:React.FC<pageProps> = ({params}) => {
    const {data:billboards}=useGetAllBillboards(params.storeId)
    if(!billboards) return <div className='flex justify-center items-center h-full'>Billboard data is loading....</div>
    const formattedBillboards: BillboardColumn[] = billboards.map((item) => ({
        id: item.id,
        label: item.label,
        createdAt: item.createdAt.split('T')[0],
      }));
    return (
        <div className='flex-col'>
            <div className='flex-1 space-y-4 p-8 pt-6'>
      {billboards  && <BillBoardClient data={formattedBillboards}/> }  
            </div>
        </div>
    )
}
export default BillBoards;