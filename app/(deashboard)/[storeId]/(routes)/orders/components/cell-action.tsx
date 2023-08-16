"use client";

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

import { OrderColumn} from "./columns";
import { useState } from "react";
import { redis } from "@/lib/redis";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";
import { AlertModal } from "@/components/modals/alert-modal";

interface CellActionProps {
  data: OrderColumn;
}

export const CellAction: React.FC<CellActionProps> = ({
data,
}) => {
  const router = useRouter();
  const params = useParams();
  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
  }
  const onConfirm = async () => {
    setLoading(true)
    const token= await redis.get('token')
    await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/order/${data?.id}`,{
        headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        },
    }).then(()=>{
        setLoading(false)
        toast({
            title:'Category deleted',
            description:'Your Order has been deleted successfully'
        })
        setOpen(false)
        router.refresh()
    }).catch(()=>{
        setLoading(false)
        setOpen(false)
        toast({
            variant:'destructive',
            title:'Error',
            description:'Something wents wrong.'
        })
    }).finally(()=>{
        setLoading(false)
    })
 
  };

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
            onClick={() => router.push(`/${params.storeId}/orders/${data?.id}`)}
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