"use client"
import React from 'react';
import { useStore } from '@/app/(zstore)/useStore';
import { useCurrentUser } from '@/hooks/useCurrentUser';

const page:React.FC= () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {data}=useCurrentUser()
    console.log(data)
    return (
        <div>
            <h1>{data?.displayName}</h1>
        </div>
    )
}
export default page;