"use client"
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import React from 'react';

export  function MainNav({
    className,
    ...props
}:React.HTMLAttributes<HTMLElement>){
    const pathname=usePathname()
    const params=useParams()
    const routes=[
        {
            href:`/${params.storeId}`,
            label:'Dashboard',
            isActive:pathname.includes('/')

        },
        {
            href:`/${params.storeId}/billboards`,
            label:'Billboards',
            isActive:pathname.includes('billboards')

        },
        {
            href:`/${params.storeId}/categories`,
            label:'Categories',
            isActive:pathname.includes('categories')

        },
        {
            href:`/${params.storeId}/sizes`,
            label:'Sizes',
            isActive:pathname.includes('sizes')

        },
        {
            href:`/${params.storeId}/colors`,
            label:'Colors',
            isActive:pathname.includes('colors')

        },
        {
            href:`/${params.storeId}/products`,
            label:'Products',
            isActive:pathname.includes('products')

        },
        {
            href:`/${params.storeId}/orders`,
            label:'Orders',
            isActive:pathname.includes('orders')

        },
        {
            href:`/${params.storeId}/settings`,
            label:'Settings',
            isActive:pathname.includes('settings')

        }
    ]
    return(
        <nav   className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
            {routes.map((route)=>(
                <Link href={route.href} key={route.href} className={cn(
                    "text-sm font-medium transition-colors text-gray-900 hover:text-primary focus:outline-none focus:text-gray-700  duration-150 ease-in-out"
                    ,route.isActive ? 'text-black dark:text-white' : 'text-muted-foreground '
                )}>
                    {route.label}
                </Link>
            ))}
        </nav>
    )
}