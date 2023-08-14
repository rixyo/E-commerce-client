// this is the setting form for the store owner to change the store name
"use client"
import { Button } from '@/components/ui/button';
import { Heading } from '@/components/ui/heading';
import React, { useState } from 'react';
import { Separator } from "@/components/ui/separator"
import { Trash } from 'lucide-react';
import * as z from 'zod';
import {  useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import axios from 'axios';
import { redis } from '@/lib/redis';
import { toast } from '@/components/ui/use-toast';
import {  useRouter } from 'next/navigation';
import { AlertModal } from '@/components/modals/alert-modal';
import { ApiAlert } from '@/components/ui/api-alert';

type Store = {
    id:string;
    name:string;
    userId:string;
}
type SettingFormProps = {
    store:Store | undefined;
    
};
const formSchema=z.object({
    name:z.string().nonempty({message:'Store name is required'}),
})


const SettingForm:React.FC<SettingFormProps> = ({store}) => {
    const [open,setOpen] = useState<boolean>(false)
    const [loading,setLoading] = useState<boolean>(false)
    const router = useRouter();
    const form=useForm<z.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        defaultValues:store
    })
    const onSubmit=async(value:z.infer<typeof formSchema>)=>{
        if(value.name===store?.name) return;
        setLoading(true)
        const token= await redis.get('token')
        await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/store/${store?.id}`,value,{
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${token}`
            },
        }).then((res)=>{
            setLoading(false)
            toast({
                title:'Store name updated',
                description:'Your store name has been updated successfully'
            })
            router.push(`/${res.data.id}`)
        }).catch((error)=>{
            setLoading(false)
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
    const deleteStore=async()=>{
        setLoading(true)
        const token= await redis.get('token')
        await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/store/${store?.id}`,{
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${token}`
            },
        }).then(()=>{
            setLoading(false)
            toast({
                title:'Store deleted',
                description:'Your store has been deleted successfully'
            })
            router.push('/store')
        }).catch((error)=>{
            setLoading(false)
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
          <AlertModal 
      isOpen={open} 
      onClose={() => setOpen(false)}
      onConfirm={deleteStore}
      loading={loading}
    />
        <div className='flex items-center justify-between'>
            <Heading
            title='Store Setting'
            description='Manage your store setting'
              />
              <Button variant='destructive'
              size={'icon'}
              onClick={()=>{setOpen(true)}}
              >
               <Trash className='h-4 w-4'/>
              </Button>
        </div>
        <Separator/>
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
          <div className="grid grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input disabled={loading} className='w-auto md:w-full' placeholder="Store name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            Save changes
          </Button>
        </form>
      </Form>
      <Separator />
      
      <ApiAlert
        title="API Endpoint"
        description={`${process.env.NEXT_PUBLIC_API_URL}/store/${store?.id}`}
        variant='admin'
      />
      
        </>
    )
}
export default SettingForm;