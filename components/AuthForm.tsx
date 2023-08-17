"use client"
import React, { useState } from 'react';
import * as z from "zod";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {Button} from '@/components/ui/button';
import AuthSocialButton from './AuthSocialButton';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from './ui/use-toast';
import {redis} from "@/lib/redis"
import { EyeIcon, EyeOffIcon } from 'lucide-react';
type Vairant="Login" | "forgotPassword";

const AuthForm:React.FC = () => {
    const [variant, setVariant] = useState<Vairant>("Login")
    const [loading, setLoading] = useState<boolean>(false)
    const [passwordType, setPasswordType] = useState<string>("password");
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
      setLoading(true)
      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`,value).then(async(res)=>{
        setLoading(false)
        toast({
            title: "Login Success",
            description: "You have been logged in successfully",
        })
        await redis.set('token',res.data.access_token,{
            ex:60*60
        })
       router.push("/store")
      }).catch((error)=>{
        setLoading(false)
        console.log(error)
        toast({
            variant:"destructive",
            title: "Error",
            description: "Something went wrong",
        })
      })
    }; 
    const ShowPassword= () => {
      if (passwordType === "password") {
          setPasswordType("text");
      } else {
          setPasswordType("password");
      }

  };
    return (
        
    <div className="bg-white p-10 rounded-lg sm:w-auto lg:w-1/3">
        <h1 
         className="text-2xl font-semibold text-center mb-6">{variant==="forgotPassword"?"Forget Password":"Login to Account"}</h1>
       <AuthSocialButton onClick={()=>{}} />
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
                <Input type="email" disabled={loading} placeholder='Email' {...field} />
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
            <div className='relative'>
                    <Input key={field.name} className='relative' disabled={loading}  type={passwordType} placeholder="Password" {...field} />
                   {passwordType==="password" && <EyeIcon className='absolute top-1/2 right-1 -translate-y-1/2  cursor-pointer text-gray-400' onClick={ShowPassword}  size={20}/> } 
                    {passwordType==="text" && <EyeOffIcon className='absolute top-1/2 right-1 -translate-y-1/2  cursor-pointer text-gray-400' onClick={ShowPassword}  size={20}/>}
                    </div>

            </FormControl>
            <FormMessage>{form.formState.errors?.password?.message}</FormMessage>

           </FormItem>
         )}
         />
            <div className='flex items-center justify-end pt-6 space-x-2'>
                <Button type='submit' disabled={loading}>
                   {loading?"Loading...":"Login"}
                </Button>
               
            </div>

        </form>
       </Form>
         <div className='flex items-center justify-center pt-6 space-x-2'>
         <div>
          {variant === 'Login' ? 'Forget Password?' : 'Already have an account?'} 
          </div>
         <div 
         onClick={() => setVariant(variant === 'forgotPassword' ? 'Login' : 'forgotPassword')}
           
            className="underline cursor-pointer"
          >
         {variant === 'Login' ? 'Rest Password' : 'Login'}
          </div>
         </div>
      
    </div>

    )
}
export default AuthForm;