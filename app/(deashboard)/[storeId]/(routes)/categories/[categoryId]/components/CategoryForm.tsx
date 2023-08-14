// this is the form for creating and editing categories
"use client"
import React, { useState } from 'react';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { redis } from '@/lib/redis';
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Trash } from 'lucide-react';
import {  useParams, useRouter } from 'next/navigation';
import useGetAllBillboards from '@/hooks/useGetAllBillboards';

import { Heading } from '@/components/ui/heading';
import { Separator } from "@/components/ui/separator"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { toast } from '@/components/ui/use-toast';
import { AlertModal } from '@/components/modals/alert-modal';
import { Category } from '@/hooks/useGetAllCategories';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import ImageUpload from '@/components/ui/image-upload';



type FormProps = {
    initialData:Category | undefined;
    
};
const formSchema=z.object({
    name:z.string().min(3,"Must be at least 3 characters"),
    billboardId:z.string().min(3,"Must be at least 3 characters"),
    gender:z.string().min(3,"Must be at least 3 characters"),
    imageUrl:z.string().url("Must be a valid url")
})


const CategoryForm:React.FC<FormProps> = ({initialData}) => {
    const [open,setOpen] = useState<boolean>(false)
    const [loading,setLoading] = useState<boolean>(false)
    const router = useRouter();
    const params = useParams();
    const {data:billboards} = useGetAllBillboards(params.storeId)
    const title = initialData ? 'Edit category' : 'Create category';
    const description = initialData ? 'Edit a category.' : 'Add a new category';
    const toastMessage = initialData ? 'Category updated.' : 'Category created.';
    const action = initialData ? 'Save changes' : 'Create';
    const form=useForm<z.infer<typeof formSchema>>({
        resolver:zodResolver(formSchema),
        defaultValues:initialData || {
          name: '',
          billboardId: '',
          gender: '',
          imageUrl: '',

          
        }    
    })
    const data=[
      {
        id:1,
        value:"Male",
      },
      {
        id:2,
        value:"Female"
      }
    ]
    const onSubmit=async(value:z.infer<typeof formSchema>)=>{
        setLoading(true)
        const token= await redis.get('token')
        if(initialData){
          await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/category/${initialData.id}/update`,value,{
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
            router.push(`/${params.storeId}/categories/${initialData.id}`)
          })
        }else{

          await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/category/${params.storeId}/create`,value,{
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
              router.push(`/${params.storeId}/categories`)
             
              
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
    }
    const deleteStore=async()=>{
        setLoading(true)
        const token= await redis.get('token')
        await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/category/${initialData?.id}`,{
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${token}`
            },
        }).then(()=>{
            setLoading(false)
            toast({
                title:'Category deleted',
                description:'Category has been deleted successfully'
            })
            router.push(`/${params.storeId}/categories`)
        }).catch((error)=>{
            setLoading(false)
            console.log(error)
            toast({
                variant:'destructive',
                title:'Error',
                description:'Something went worng.'
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
              name="name"
              defaultValue={initialData?.name}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input disabled={loading} placeholder="Category Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
                  <FormField
              control={form.control}
              name="billboardId"
              defaultValue={initialData?.billboard.id}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Billboard</FormLabel>
                  <Select disabled={loading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue defaultValue={field.value} placeholder="Select a billboard" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {billboards?.map((billboard) => (
                        <SelectItem key={billboard.id} value={billboard.id}>{billboard.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
               <FormField
              control={form.control}
              name="gender"
              defaultValue={initialData?.gender}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <Select disabled={loading} onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue defaultValue={field.value} placeholder="Select a Gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {data?.map((data) => (
                        <SelectItem key={data.id} value={data.value}>{data.value}</SelectItem>
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
export default CategoryForm;