// Purpose:  Setting page for store
"use client";
import useStore from '@/hooks/useStoreById';
import SettingForm from './components/SettingForm';

type pageProps = {
    params:{
        storeId:string
    }
};
const SettingPage:React.FC<pageProps> = ({params}) => {
    const {data}=useStore(params.storeId)
    return (
        <div className='flex-col mt-16'>
             <div className="flex-1 space-y-4 p-8 pt-6">
          {data && <SettingForm store={data}/>  }   
              
             </div>
        </div>
    )
}
export default SettingPage;