"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import CustomDatePicker from '@/components/ui/custom-date-picker';
import { Heading } from '@/components/ui/heading';

import { Separator } from '@/components/ui/separator';
import useGetStoreRevenue from '@/hooks/useGetStoreRevenue';
import {  formatter } from '@/lib/utils';

import React, { useState } from 'react';
import useGetRevenueByDate from '@/hooks/useGetRevenueByDate';
import useGetCurrentMonthRevenue from '@/hooks/useGetCurrentMonthRevenue';
type pageProps = {
    params:{
        storeId:string
    }
    
};

const DeshboardPage:React.FC<pageProps> = ({params}) => {
    const {data,isLoading}=useGetStoreRevenue(params.storeId)
    const [date, setDate] = useState<Date | undefined>();
    const {data:todaysRevenue}=useGetRevenueByDate(params.storeId,date as Date)
    const {data:currentMonthRevenue}=useGetCurrentMonthRevenue(params.storeId)
    console.log(currentMonthRevenue)
  
    
    return (
        <div className='flex-col'>
            <div className='flex-1 space-y-4 p-8 pt-6'>
            <Heading 
            title='Deshboard'
            description='Welcome to your store deshboard.'
            />  
            <Separator />
            <div className='grid gap-4 grid-cols-3'>
                <Card>
                    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                        <CardTitle className='text-sm font-medium'>
                        Total Revenue
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className='text-2xl font-semibold'>
                            {formatter.format(data)}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className=' space-y-0 pb-2'>
                        <CardTitle className='text-sm font-medium'>
                        <h2>
  Revenue {date ? `on ${date.toLocaleDateString()}` : 'Overview'}
    </h2>
                        </CardTitle>
                        <CardDescription>
                        <CustomDatePicker 
                    date={date}
                    setDate={setDate as React.Dispatch<React.SetStateAction<Date>>}
                   />
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className='text-2xl font-semibold'>
                            {formatter.format(todaysRevenue)}
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                        <CardTitle className='text-sm font-medium'>
                        <h2>
  Revenue {date ? `in ${date.toLocaleString('default', { year: 'numeric', month: 'long' })}` : 'Overview'}
</h2>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className='text-2xl font-semibold'>
                            {formatter.format(data)}
                        </div>
                    </CardContent>
                </Card>

            </div>
            </div>
        </div>
    )
}
export default DeshboardPage;