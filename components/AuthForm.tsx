"use client"
import React, { useState } from 'react';
import {motion as m} from 'framer-motion';
import * as z from "zod";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import AuthSocialButton from './AuthSocialButton';
import axios from 'axios';
import { useStore } from '@/app/(zstore)/useStore';
import { useRouter } from 'next/navigation';

type Vairant="Login" | "SignUp";


const AuthForm:React.FC = () => {
    const [variant, setVariant] = useState<Vairant>("Login")
    const {setToken,token}=useStore()
    const router=useRouter()
    const formSchema = z.object({
        email: z.string().email("Must be a valid email"),
        password: z.string().min(6, "Must be at least 6 characters"),

    });
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })
    const onSubmit = async (value: z.infer<typeof formSchema>) => {
      await axios.post("http://localhost:5000/auth/login",value).then(async(res)=>{
        console.log('resDatA',res.data)
        setToken(res.data)
       router.push('/test')

      })
    };
    const googleAuth=async()=>{
          await axios.get("http://localhost:5000/auth").then(async(res)=>{
            console.log(res.data);
           
        })
    }
    
    
    return (
        
    <m.div className="bg-white p-10 rounded-lg sm:w-auto lg:w-1/3"
    initial={{opacity:0}}
        animate={{opacity:1}}
        transition={{duration:0.75}}
    >
        <m.h1 
         className="text-2xl font-semibold text-center mb-6">{variant==="SignUp"?"Create an Account":"Login to Account"}</m.h1>
       <AuthSocialButton onClick={googleAuth} />
       <div className="relative flex justify-center text-sm mt-2">
              <span className="bg-white px-2 text-gray-500">
                Or
              </span>
            </div>
         <Form {...form} >
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
               <FormLabel>Email</FormLabel>
               <FormControl>
                <Input type="email" placeholder='Email' {...field} />
               </FormControl>
               <FormMessage>{form.formState.errors?.email?.message}</FormMessage>

              </FormItem>
            )}
            />
        
             <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
               <FormLabel>Password</FormLabel>
               <FormControl>
                <Input type="password" placeholder='Password' {...field} />
               </FormControl>
               <FormMessage>{form.formState.errors?.password?.message}</FormMessage>

              </FormItem>
            )}
            />
            <div className='flex items-center justify-end pt-6 space-x-2'>
                <Button type='submit'>
                    Continue
                </Button>
               
            </div>

        </form>
       </Form>
       <div className="mt-6">
          <div className="relative">
            <div 
              className="
                absolute 
                inset-0 
                flex 
                items-center
              "
            >
              <div className="w-full border-t border-gray-300" />
            </div>
            
          </div>
          </div>
         <div className='flex items-center justify-center pt-6 space-x-2'>
         <div>
          {variant === 'Login' ? 'Donot have account?' : 'Already have an account?'} 
          </div>
         <div 
         onClick={() => setVariant(variant === 'Login' ? 'SignUp' : 'Login')}
           
            className="underline cursor-pointer"
          >
         {variant === 'Login' ? 'Create an account' : 'Login'}
          </div>
         </div>
      
    </m.div>

    )
}
export default AuthForm;