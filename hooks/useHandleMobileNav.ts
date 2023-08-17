// this hook is used to handle mobile nav open and close from any component
import {create} from "zustand";
interface State {
   isOpen: boolean;
   onOpen: () => void;
    onClose: () => void;
}
const useMobileNaveOpen = create<State>(set => ({
    isOpen: false,
    onOpen: () => set({isOpen: true,}),
    onClose: () => set({isOpen: false}),
  
   
    
}))
export default useMobileNaveOpen;