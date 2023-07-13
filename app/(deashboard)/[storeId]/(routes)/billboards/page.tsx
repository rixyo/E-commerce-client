"use client"
import { format } from "date-fns";
import React from 'react';
import {BillBoardClient} from './components/BillBoardClient';
import useGetAllBillboards from '@/hooks/useGetAllBillboards';


type pageProps = {
    params:{
        storeId:string
    }
};
const BillBoards:React.FC<pageProps> = ({params}) => {
    const {data:billboards,isLoading}=useGetAllBillboards(params.storeId)
    if(isLoading){
        return <div className='flex justify-center items-center h-full'>Loading....</div>
    }
    return (
        <div className='flex-col'>
            <div className='flex-1 space-y-4 p-8 pt-6'>
      {billboards && <BillBoardClient data={billboards}/> }  
            </div>
        </div>
    )
}
export default BillBoards;