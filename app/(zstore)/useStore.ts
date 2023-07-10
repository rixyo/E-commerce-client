import { stat } from 'fs';
import {create} from 'zustand';

interface StoreState {
  token:string,
  setToken: (token: string) => void;

}

export const useStore = create<StoreState>(set => ({
  token: '',
  setToken: (token: string) => set((state) => ({token: token})),


}));


