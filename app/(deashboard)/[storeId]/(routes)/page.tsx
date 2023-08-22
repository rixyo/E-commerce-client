"use client";
export const revalidate = 0;
import React, { useState } from 'react';
import useGetRevenueByDate from '@/hooks/useGetRevenueByDate';
import useGetCurrentMonthRevenue from '@/hooks/useGetCurrentMonthRevenue';
import useGetPreviousMonthRevenue from '@/hooks/useGetPreviousMonthRevenue';
import useGraphRevenue from '@/hooks/useGraphRevenue';
import useGetStoreRevenue from '@/hooks/useGetStoreRevenue';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import CustomDatePicker from '@/components/ui/custom-date-picker';
import { Heading } from '@/components/ui/heading';
import {Plus, Minus} from 'lucide-react'
import { Separator } from '@/components/ui/separator';
import {  formatter } from '@/lib/utils';


import { Overview } from '@/components/Overview';
import PieOverview from '@/components/Pie';
import useSaleReport from '@/hooks/useGetSale';
import SalesOverview from '@/components/SalesOverview';
type pageProps = {
    params:{
        storeId:string
    }
    
};

const DeshboardPage:React.FC<pageProps> = ({params}) => {
    const {data}=useGetStoreRevenue(params.storeId)
    const [date, setDate] = useState<Date | undefined>();
    const {data:todaysRevenue}=useGetRevenueByDate(params.storeId,date as Date)
    const {data:currentMonthRevenue}=useGetCurrentMonthRevenue(params.storeId)
    const {data:previousMonthRevenue}=useGetPreviousMonthRevenue(params.storeId)
    const {data:graphRevenue}=useGraphRevenue(params.storeId)
    const {data:sales}=useSaleReport(params.storeId)
  
   const calculateRevenueChangePercentage = (currentMonthRevenue:number, previousMonthRevenue:number) => {
        if (previousMonthRevenue === 0) {
          // Handle the case where previousMonthRevenue is 0 to avoid division by zero
          return currentMonthRevenue === 0 ? 0 : 100;
        }
      
        const percentageChange = ((currentMonthRevenue - previousMonthRevenue) / previousMonthRevenue) * 100;
        return percentageChange;
      }
      const revenueChangePercentage = calculateRevenueChangePercentage(currentMonthRevenue as number, previousMonthRevenue as number);
    const pieData = [{
        name: 'Previous Month',
        value:previousMonthRevenue
        
    },
    {
        name: 'Current Month',
        value: currentMonthRevenue,
    },
]
const lineData = [
    {
        name: 'Total Sales',
        fill: '#800080',
        value:sales?.total_sale
    },
    {
        name: 'Yearly Sales',
        fill: '#83a6ed',
        value:sales?.total_sale_thisYear
    },
    {
        name: 'Monthly Sales',
        fill: '#8dd1e1',
        value:sales?.total_sale_thisMonth
    },
    {
        name: 'Weekly Sales',
        fill: '#82ca9d',
        value:sales?.total_sale_thisWeek
    },
    {
        name: 'Today Sales',
        fill: '#a4de6c',
        value:sales?.total_sale_today

    }
 
]
    return (
        <div>
            <div className='flex-1 space-y-4 p-8 pt-6'>
            <Heading 
            title='Deshboard'
            description='Welcome to store deshboard.'
            />  
            <Separator />
            
            <div className='grid  grid-cols-1 md:grid-cols-3 gap-4'>
                <div className='col-span-1'>

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
                            {revenueChangePercentage > 0 ? (
                        <div className='flex items-center gap-3 text-green-500'>
                                  <Plus className='' size={16} />
                                <span className='text-sm'>
                                   {revenueChangePercentage.toFixed(2)}%
                                from last month
                                </span>
                              
                        </div>
                            ):
                            (
                                <div className='flex items-center gap-3 text-red-500'>
                                          <Minus className='' size={16} />
                                        <span className='text-sm'>
                                           {revenueChangePercentage.toFixed(2)}%
                                        from last month
                                        </span>
                                      
                                </div>
                                    )}
                              <PieOverview data={pieData} />
                    </CardContent>
                </Card>
                </div>
                <div className='col-span-1'>

                <Card>
                    <CardHeader className=' space-y-0 pb-2'>
                        <CardTitle className='text-sm font-medium'>
                       
  Revenue {date ? `on ${date.toLocaleDateString()}` : 'Overview Based on Date'}
    
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
            <div className='col-span-1'>

                <Card>
                    <CardHeader className=' space-y-0 pb-2'>
                        <CardTitle className='text-sm font-medium'>
                            Sales Overview
                        </CardTitle>
                    </CardHeader>
                  

                  <SalesOverview data={lineData} />
                   
                </Card>
            </div>
              

            </div>
                <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <Overview data={graphRevenue} />
          </CardContent>
        </Card>
            </div>
            
        </div>
    )
}
export default DeshboardPage;