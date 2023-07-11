"use client"
import AuthForm from '@/components/AuthForm';
import React from 'react';

const page:React.FC = () => {
    
    return (
        <div className="flex items-center justify-center h-full bg-[url('/signin-bg.svg')]">
        <AuthForm/>
        </div>
    )
}
export default page;