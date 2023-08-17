// this page is for single order
"use client";
import React from 'react';

import OrderForm from './components/OrderForm';
import useGetOrderById from '@/hooks/useGetOrderById';
import { format } from 'date-fns';

const OrderPage = ({params}:{
    params:{
        orderId:string
      
    }
}) => {
  // fetch order by id
    const {data:order}=useGetOrderById(params.orderId)
    console.log(order)
    // set initial data
    const data= {
        id:order?.id,
        isDelivered:order?.isDelivered,
        deliveredAt:order?.deliveredAt?format(new Date(order?.deliveredAt), 'yyyy-MM-dd'):undefined,
      
    }
    return (
        <div className="flex-col mt-16">
        <div className="flex-1 space-y-4 p-8 pt-6">
       {order&& <OrderForm initialData={data} />}
        </div>
      </div>
    )
}
export default OrderPage;