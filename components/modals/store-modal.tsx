"use client"
import React from 'react';
import { useStoreModal } from '@/hooks/use-store-model';
import * as z from "zod";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import {redis} from "@/lib/redis"
import { useRouter } from 'next/navigation';

import Modal from '@/components/ui/modal';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import { toast } from '../ui/use-toast';


const formSchema = z.object({
    name: z.string().min(3, "Must be at least 3 characters"),
});

const StoreModal:React.FC=() => {
    const StoreModal=useStoreModal();
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",

        },
    })
    const onSubmit = async (value: z.infer<typeof formSchema>) => {
        const token = await redis.get('token')
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/store`,value,{
            headers:{
                "Content-Type":"application/json",
                Authorization:`Bearer ${token}`
            }
        }).then((res)=>{
            toast({
                title: "Store Created",
                description: "Your store has been created successfully",
              })
              StoreModal.onClose()
              router.push(`/${res.data.id}`)
        }).catch(()=>{
            toast({
                variant:"destructive",
                title: "Error",
                description: "Something went wrong",
            })
        })
    };
    return(
   <Modal isOpen={StoreModal.isOpen} onClose={StoreModal.onClose} title="Create Store" description="Add a store to manage product and categories">
    <div>

    <div className='space-y-4 py-2 pb-4 '>
       <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
               <FormLabel>Name</FormLabel>
               <FormControl>
                <Input type="text" placeholder='e-commerce' {...field} />
               </FormControl>
               <FormMessage>{form.formState.errors?.name?.message}</FormMessage>

              </FormItem>
            )}
            />
            <div className='flex items-center justify-end pt-6 space-x-2'>
                <Button type='submit'>
                    Continue
                </Button>
                <Button variant='destructive' onClick={StoreModal.onClose}>
                    Cancel
                </Button>
            </div>
        </form>
       </Form>
    </div>
    </div>
   </Modal>
    )
}
export default StoreModal;