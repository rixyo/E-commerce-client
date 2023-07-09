"use client"
import AuthForm from '@/components/AuthForm';
import React from 'react';
import Image from 'next/image';

type pageProps = {
    
};

const page:React.FC<pageProps> = () => {
    
    return (
        <div className="flex items-center justify-center h-full bg-[url('/signin-bg.svg')]">
           
           
            <AuthForm/>
        </div>
    )
}
export default page;