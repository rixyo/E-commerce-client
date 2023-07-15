"use client"
import React from 'react';
import {CategoryClient} from './components/CategoryClient';
import useGetAllBillboards from '@/hooks/useGetAllBillboards';


type pageProps = {
    params:{
        storeId:string
    }
};
const BillBoards:React.FC<pageProps> = ({params}) => {
    const {data:billboards}=useGetAllBillboards(params.storeId)
    return (
        <div className='flex-col'>
            <div className='flex-1 space-y-4 p-8 pt-6'>
      {billboards  && <CategoryClient data={billboards}/> }  
            </div>
        </div>
    )
}
export default BillBoards;