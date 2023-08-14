"use client"
import React, { useState } from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { redis } from '@/lib/redis';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';

import { Heading } from '@/components/ui/heading';
import { Separator } from "@/components/ui/separator"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import {  useParams, useRouter } from 'next/navigation';
import { AlertModal } from '@/components/modals/alert-modal';
import ImageUpload from '@/components/ui/image-upload';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

type Size = {
    id:string;
    name:string;
    value:string;
}
type FormProps = {
    initialData:Size | undefined;
    
};
const formSchema=z.object({
  name:z.string().min(3,"Must be at least 3 characters"),
  value:z.string().min(1,"Must be at least 1 characters")
})


const SizeForm:React.FC<FormProps> = ({initialData}) => {
    const [open,setOpen] = useState<boolean>(false)
    const [loading,setLoading] = useState<boolean>(false)
    const router = useRouter();
    const params = useParams();
    const title = initialData ? 'Edit Size' : 'Create Size';
    const description = initialData ? 'Edit a Size.' : 'Add a new Size';
    const toastMessage = initialData ? 'Size updated.' : 'Size created.';
    const action = initialData ? 'Save changes' : 'Create';
    const form=useForm<z.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        defaultValues:initialData || {
          name:'',
          value:''
        }    
    })
    const values=[
      {
        id:'1',
        value:'S',
      },
      {
        id:'2',
        value:'M',
      },
      {
        id:'3',
        value:'L',
      },
      {
        id:'4',
        value:'XL',
      },
      {
        id:'5',
        value:'XXL',
      },
      {
        id:'6',
        value:'XXXL',
      }
    ]
    const onSubmit=async(value:z.infer<typeof formSchema>)=>{
        setLoading(true)
        const token= await redis.get('token')
        if(initialData){
          await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/size/${initialData.id}/update`,value,{
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${token}`
            }
          }).then(()=>{
            setLoading(false)
            toast({
                title:'Success',
                description:toastMessage
            })
            router.push(`/${params.storeId}/sizes/${initialData.id}`)
          })
        }else{

          await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/size/${params.storeId}/create`,value,{
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
              router.push(`/${params.storeId}/sizes`)
             
              
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
    }
    const deleteStore=async()=>{
        setLoading(true)
        const token= await redis.get('token')
        await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/size/${initialData?.id}`,{
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${token}`
            },
        }).then(()=>{
            setLoading(false)
            toast({
                title:'Success',
                description:'Size deleted.'
            })
            router.push(`/${params.storeId}/sizes`)
        }).catch((error)=>{
            setLoading(false)
            console.log(error)
            toast({
                variant:'destructive',
                title:'Error',
                description:'Make sure you removed all products using this size first.'
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
            title={title}
            description={description}
              />
            {initialData && 
             <Button variant='destructive'
             size={'icon'}
             onClick={()=>{setOpen(true)}}
             >
              <Trash className='h-4 w-4'/>
             </Button>
            } 
        </div>
        <Separator/>
        <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
          <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="name"
              defaultValue={initialData?.name}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
                <FormField
              control={form.control}
              name="value"
              defaultValue={initialData?.value}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Value</FormLabel>
                  <Select disabled={loading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue defaultValue={field.value} placeholder="Select a Value" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {values.map((value) => (
                        <SelectItem key={value.id} value={value.value}>{value.value}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button disabled={loading} className="ml-auto" type="submit">
            {action}
          </Button>
        </form>
      </Form>
        </>
    )
}
export default SizeForm;