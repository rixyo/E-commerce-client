"use client";
import React from 'react';

import ColorForm from './components/OrderForm';
import useGetOrderById from '@/hooks/useGetOrderById';

const ColorPage = ({params}:{
    params:{
        orderId:string
      
    }
}) => {
  
    const {data:order,isLoading}=useGetOrderById(params.orderId)
    console.log(order)
    const data= {
        id:order?.id,
        isDelivered:order?.isDelivered,
    }
    return (
        <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
       {order&& <ColorForm initialData={data} />}
        </div>
      </div>
    )
}
export default ColorPage;