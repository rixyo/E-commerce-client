"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import CustomDatePicker from '@/components/ui/custom-date-picker';
import { Heading } from '@/components/ui/heading';
import {Plus, Minus} from 'lucide-react'
import { Separator } from '@/components/ui/separator';
import useGetStoreRevenue from '@/hooks/useGetStoreRevenue';
import {  formatter } from '@/lib/utils';

import React, { useState } from 'react';
import useGetRevenueByDate from '@/hooks/useGetRevenueByDate';
import useGetCurrentMonthRevenue from '@/hooks/useGetCurrentMonthRevenue';
import useGetPreviousMonthRevenue from '@/hooks/useGetPreviousMonthRevenue';
import LineChartOverview from '@/components/LineChartOverview';
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
    const {data:previousMonthRevenue}=useGetPreviousMonthRevenue(params.storeId)
  
   const calculateRevenueChangePercentage = (currentMonthRevenue:number, previousMonthRevenue:number) => {
        if (previousMonthRevenue === 0) {
          // Handle the case where previousMonthRevenue is 0 to avoid division by zero
          return currentMonthRevenue === 0 ? 0 : 100;
        }
      
        const percentageChange = ((currentMonthRevenue - previousMonthRevenue) / previousMonthRevenue) * 100;
        return percentageChange;
      }
      const revenueChangePercentage = calculateRevenueChangePercentage(currentMonthRevenue as number, previousMonthRevenue as number);
    const grapData = [{
        name: 'Current Month',
        current: currentMonthRevenue,
        prev:previousMonthRevenue

    },
    {
        name: 'Previous Month',
        current: currentMonthRevenue,
        prev:previousMonthRevenue
    },
]
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
                            {revenueChangePercentage > 0 && (
                        <div className='flex items-center gap-3 text-green-500'>
                                  <Plus className='' size={16} />
                                <span className='text-sm'>
                                   {revenueChangePercentage.toFixed(2)}%
                                from last month
                                </span>
                              
                        </div>
                            )}
                                {revenueChangePercentage < 0 && (
                        <div className='flex items-center gap-3 text-red-500'>
                                  <Minus className='' size={16} />
                                <span className='text-sm'>
                                   {revenueChangePercentage.toFixed(2)}%
                                from last month
                                </span>
                              
                        </div>
                            )}
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

            </div>
            </div>
            <Separator />
            <div className='flex items-center justify-center'>
            <LineChartOverview data={grapData} />
            </div>
        </div>
    )
}
export default DeshboardPage;