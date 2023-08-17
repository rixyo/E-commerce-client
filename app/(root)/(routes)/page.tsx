// used for: auth page
"use client"
import AuthForm from '@/components/AuthForm';

const Authpage:React.FC = () => {
    return (
        <div className="flex items-center justify-center h-full bg-[url('/signin-bg.svg')] ">
        <AuthForm/>
        </div>
    )
}
export default Authpage;
