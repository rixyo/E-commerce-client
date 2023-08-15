// this component is use to create a new billboard or update an existing one
// used react-hook-form for form validation
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

type BillBoard = {
    id:string;
    label:string;
    imageUrl:string;
}
type FormProps = {
    initialData:BillBoard | undefined;
    
};
const formSchema=z.object({
    label:z.string().min(3,"Must be at least 3 characters"),
    imageUrl:z.string().url("Must be a valid url")
})


const BillBoardForm:React.FC<FormProps> = ({initialData}) => {
    const [open,setOpen] = useState<boolean>(false)
    const [loading,setLoading] = useState<boolean>(false)
    const router = useRouter();
    const params = useParams();
    const title = initialData ? 'Edit billboard' : 'Create billboard';
    const description = initialData ? 'Edit a billboard.' : 'Add a new billboard';
    const toastMessage = initialData ? 'Billboard updated.' : 'Billboard created.';
    const action = initialData ? 'Save changes' : 'Create';
    const form=useForm<z.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        defaultValues:initialData || {
            label: '',
            imageUrl: '',
        }    
    })
    const onSubmit=async(value:z.infer<typeof formSchema>)=>{
        setLoading(true)
        const token= await redis.get('token')
        if(initialData){
          if(value.imageUrl===initialData.imageUrl && value.label===initialData.label) return;
          await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/billboard//${initialData.id}/update`,value,{
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
            router.push(`/${params.storeId}/billboards/${initialData.id}`)
          })
        }else{

          await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/billboard/${params.storeId}/create`,value,{
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
              router.push(`/${params.storeId}/billboards`)
             
              
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
        await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/billboard/${initialData?.id}`,{
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${token}`
            },
        }).then(()=>{
            setLoading(false)
            toast({
                title:'Billboard deleted',
                description:'Your billboard has been deleted successfully'
            })
            router.push(`/${params.storeId}/billboards`)
        }).catch((error)=>{
            console.log(error)
            toast({
                variant:'destructive',
                title:'Error',
                description:'Make sure you removed all categories using this billboard first.'
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
          <FormField
              control={form.control}
              name="imageUrl"
              defaultValue={initialData?.imageUrl}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Background image</FormLabel>
                  <FormControl>
                    <ImageUpload 
                      value={field.value ? [field.value] : []} 
                      disabled={loading} 
                      onChange={(url) => field.onChange(url)}
                      onRemove={() => field.onChange('')}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          <div className="md:grid md:grid-cols-3 gap-8">
            <FormField
              control={form.control}
              name="label"
              defaultValue={initialData?.label}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Label</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Billboard label" {...field} />
                  </FormControl>
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
export default BillBoardForm;