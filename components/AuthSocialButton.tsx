
import React from 'react';
import Image from 'next/image';

type AuthSocialButtonProps = {
   
    onClick:()=>void
    
};

const AuthSocialButton:React.FC<AuthSocialButtonProps> = ({onClick}) => {
    
    return(
        <button type='button' onClick={onClick} className="inline-flex justify-center rounded-full w-full bg-white px-4 py-2 text-gray-500 shadow-sm ring-1 ring-inset
        ring-gray-300 hover:bg-gray-50 focus:outline-offset-0
        ">
            <div className='flex gap-2 items-center'>
                <Image src='/google-icon.svg' width={20} height={20} alt='google' />
                <span>Continue with Google</span>
            </div>
         
        </button>
    )
}
export default AuthSocialButton;