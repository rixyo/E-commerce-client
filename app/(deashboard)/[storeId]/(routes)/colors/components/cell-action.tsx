// Note: This component is used in the color table to show the actions menu for each color
"use client";

import axios from "axios";
import { useState } from "react";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { AlertModal } from "@/components/modals/alert-modal";

import { ColorColumn} from "./columns";
import { redis } from "@/lib/redis";
import { toast } from "@/components/ui/use-toast";


interface CellActionProps {
  data: ColorColumn;
}

export const CellAction: React.FC<CellActionProps> = ({
  data,
}) => {
  const router = useRouter();
  const params = useParams();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const onConfirm = async () => {
    setLoading(true)
    const token= await redis.get('token')
    await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/color/${data?.id}`,{
        headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        },
    }).then(()=>{
        setLoading(false)
        toast({
            title:'Success',
            description:'color deleted successfully.'
        })
        router.refresh()
        setOpen(false)
    }).catch((error)=>{
        setLoading(false)
        console.log(error)
        setOpen(false)
        toast({
            variant:'destructive',
            title:'Error',
            description:'Make sure you removed all products using this color first.'
        })
    }).finally(()=>{
        setLoading(false)
    })
 
  };

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
   
  }

  return (
    <>
      <AlertModal 
        isOpen={open} 
        onClose={() => setOpen(false)}
        onConfirm={onConfirm}
        loading={loading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            onClick={() => onCopy(data?.id as string)}
          >
            <Copy className="mr-2 h-4 w-4" /> Copy Id
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => router.push(`/${params.storeId}/colors/${data?.id}`)}
          >
            <Edit className="mr-2 h-4 w-4" /> Update
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => setOpen(true)}
          >
            <Trash className="mr-2 h-4 w-4" /> Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};