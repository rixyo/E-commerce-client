// this is the form to update the order
"use client"
import React, { useState } from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { redis } from '@/lib/redis';
import axios from 'axios';
import { Button } from '@/components/ui/button';

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel} from '@/components/ui/form';
import { toast } from '@/components/ui/use-toast';
import {  useParams, useRouter } from 'next/navigation';

import { Checkbox } from '@/components/ui/checkbox';
import CustomDatePicker from '@/components/ui/custom-date-picker';


type Order= {
    id:string;
    isDelivered:boolean;
    deliveredAt:any
 
   
}
type FormProps = {
    initialData:Order | undefined;
    
};
const formSchema=z.object({
  isDelivared:z.boolean().optional(),
 
})


const OrderForm:React.FC<FormProps> = ({initialData}) => {
  const [date, setDate] = useState<Date | undefined>();
    const [loading,setLoading] = useState<boolean>(false)
    const router = useRouter();
    const params = useParams();
    const toastMessage =  'Order updated.';
    const action = 'Save changes';
    const form=useForm<z.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        defaultValues:{
          isDelivared:initialData?.isDelivered,

        }
    })
    
    const onSubmit=async(value:z.infer<typeof formSchema>)=>{
        setLoading(true)
        const token= await redis.get('token')
        const data={
          isDelivered:value.isDelivared,
          deliveredAt:date
        }
          await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/order/${params.orderId}/update`,data,{
              headers:{
                  "Content-Type":"application/json",
                  Authorization:`Bearer ${token}`
              },
          }).then(()=>{
              setLoading(false)
              toast({
                  title:'Success',
                  description:toastMessage
              })
              router.push(`/${params.storeId}/orders`)
             
              
          }).catch((error)=>{
              console.log(error)
              toast({
                  variant:'destructive',
                  title:'Error',
                  description:'Something went wrong'
              })
          }).finally(()=>{
              setLoading(false)
          })
    }
    
    return (
        <>
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
          <div className="md:grid md:grid-cols-3 gap-8">
          <FormField
              control={form.control}
              name="isDelivared"
              defaultValue={initialData?.isDelivered}
              render={({ field }) => (
                <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      // @ts-ignore
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>
                      Delivired
                    </FormLabel>
                    <FormDescription>
                      Mark this order as delivired
                    </FormDescription>
                  </div>
                </FormItem>
              )}
            />
           <CustomDatePicker
            date={date}
            setDate={setDate as React.Dispatch<React.SetStateAction<Date>>}
            />
             <div>
              <FormLabel className='text-lg font-bold'>This product was delevered at: </FormLabel>
             <input value={initialData?.deliveredAt} />
             </div>
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
        </>
    )
}
export default OrderForm;