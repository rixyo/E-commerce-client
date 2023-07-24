"use client"
import { Category } from "@/hooks/useGetAllCategories";
import { Product } from "@/hooks/useGetAllProducts";
import  React,{useState} from "react";
import { useForm, useFieldArray, Controller} from "react-hook-form";
import * as z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from "axios";
import { redis } from "@/lib/redis";
import { useParams, useRouter } from "next/navigation";

import { AlertModal } from "@/components/modals/alert-modal";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import ImageUpload from "@/components/ui/image-upload";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { toast } from "@/components/ui/use-toast";

import { Trash } from "lucide-react";


type Image = {
  url: string;
};

type ProductFormProps = {
initialData:Product|undefined;
categories:Category[];
};
const formSchema = z.object({
  name: z.string().min(1),
  images: z.object({ url: z.string() }).array(),
  price: z.coerce.number().min(1),
  categoryId: z.string().min(1),
  colors:z.object({value:z.string()}).array(),
  description:z.string().min(1),
  sizes:z.object({value:z.string()}).array(),
  isFeatured: z.boolean().default(false).optional(),
  isArchived: z.boolean().default(false).optional()
});
const ProductForm:React.FC<ProductFormProps> = ({initialData,categories}) => {
  const [open,setOpen] = useState<boolean>(false)
  const [loading,setLoading] = useState<boolean>(false)
  type ProductFormValues = z.infer<typeof formSchema>
  const {
control, register,handleSubmit,
setValue,getValues
  } = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
  defaultValues: {
    sizes: initialData?.Sizes || [{ value: "" }],
    colors: initialData?.Colors || [{ value: "" }],
    name: initialData?.name || "",
    description:initialData?.description || "",
    price: initialData?.price || 0,
    images: initialData?.Images || [],
    categoryId:initialData?.categoryId || "",
    isFeatured: initialData?.isFeatured||  false,
    isArchived: initialData?.isArchived|| false,
  },
  });
const { fields, append, remove } = useFieldArray({
  name: "sizes",
  control
});
const { fields:colors, append:colorAppend, remove:colorRemove } = useFieldArray({
  name: "colors",
  control
});
const toastMessage = initialData ? 'Product updated.' : 'Product created.';
const params = useParams();
const router = useRouter();
const onSubmit = async(value:z.infer<typeof formSchema>) => {
  setLoading(true)
  const token= await redis.get('token')
  if(initialData){
    await axios.patch(`${process.env.NEXT_PUBLIC_API_URL}/product/${params.storeId}/update/${initialData.id}`,value,{
      headers:{
          "Content-Type":"application/json",
          Authorization:`Bearer ${token}`
      }
    }).then(()=>{
      setLoading(false)
      toast({
          title:'Success',
          description:toastMessage
      })
      router.push(`/${params.storeId}/products/${initialData.id}`)
    })
  }else{
    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/product/${params.storeId}/create`,value,{
        headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        },
    }).then(()=>{
        setLoading(false)
        toast({
            title:'Success',
            description:toastMessage
        })
        router.push(`/${params.storeId}/products`)
       
        
    }).catch((error)=>{
        setLoading(false)
        console.log(error)
        toast({
            variant:'destructive',
            title:'Error',
            description:'Something went wrong'
        })
    }).finally(()=>{
        setLoading(false)
    })
  }
}
const onDelete=async()=>{
  setLoading(true)
  const token= await redis.get('token')
  await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/product/${initialData?.id}`,{
      headers:{
          "Content-Type":"application/json",
          Authorization:`Bearer ${token}`
      },
  }).then(()=>{
      setLoading(false)
      toast({
          title:'Product deleted',
          description:'Your Product has been deleted successfully'
      })
      router.push(`/${params.storeId}/products`)
  }).catch((error)=>{
      console.log(error)
      toast({
          variant:'destructive',
          title:'Error',
          description:'Something went wrong'
      })
  }).finally(()=>{
      setLoading(false)
  })
}
const title = initialData?"Edit Product":"Add Product";
const description = initialData? "Edit this product": "Add a new product to your store";
const action = initialData ? 'Save changes' : 'Create';

return (
  <>
     <AlertModal 
      isOpen={open} 
      onClose={() => setOpen(false)}
      onConfirm={onDelete}
      loading={loading}
    />
     <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={loading}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>

      <Separator />
 
        
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 w-full">
        <ImageUpload
        value={getValues('images').map((image: Image) => image.url)}
        onChange={(value) => setValue('images', [...getValues('images'), { url: value }])}
        onRemove={(value) => setValue('images', getValues('images').filter((image: Image) => image.url !== value))}
         />
  <div className=" md:grid md:grid-cols-3 gap-8  content-center">
  <Controller
  name="categoryId"
  control={control}
  defaultValue={""}
  render={({ field }) => (
    <Select>

      <select className="h-10 rounded   w-full border-2 border-gray-400 mt-2" {...field} placeholder="Select Category"  >
        <option value={""}  disabled>
          Select Category
        </option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </Select>
  )}
/>
  <Input
    placeholder="name"
    disabled={loading}
    className="mt-2"
                {...register("name")}
                required
              />
            
               <Textarea 
               disabled={loading}
               className="mt-2"
                placeholder="Description"
              {...register("description")}
              required
              />
              
               <Input
               disabled={loading}
                className="mt-2 mb-2"
                placeholder="Size"
             {...register("price")}
             required
              />
             

    <div className="flex items-center gap-2 justify-center">
 
  <Controller 
  name="isFeatured"
  control={control}
  defaultValue={initialData?.isFeatured || false}
  render={({ field }) => (
  <Checkbox
  disabled={loading}
  checked={field.value}
 
        onCheckedChange={(value) => {
          field.onChange(value as boolean);
        }}
 
    className="mt-2"
    />
    
  )}

  />
    <label
        htmlFor="isFeatured"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mt-1"
      >
        This product will appear on the home page
      </label>
  </div>
  <div className="flex justify-center items-center gap-2">
  <Controller 
  name="isArchived"
  control={control}
  defaultValue={initialData?.isArchived || false}
  render={({ field }) => (
  <Checkbox
  disabled={loading}
  checked={field.value}
  onCheckedChange={(value) => {
    field.onChange(value as boolean);
  }}
    className="mt-2"
    />
  )}

  />
    <label
        htmlFor="isArchived"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mt-2"
      >
        This product will not appear anywhere in the store.
      </label>
  </div>
      
      <div className="flex flex-col gap-5 mb-5 ">

      {fields.map((field, index) => {
        return (
          <div key={field.id} className="flex flex-col gap-5 ">
            <section className="flex gap-5 p-2 " key={field.id}>
              <Input
              disabled={loading}
                placeholder="Size"
                {...register(`sizes.${index}.value` as const, {
                  required: true
                })}
              />
              <Button size="icon" variant="destructive" disabled={loading}  onClick={() => remove(index)}>
                <Trash className="h-4 w-4" />
              </Button>
            </section>
          </div>
        );
      })}
       <Button
       disabled={loading}
        type="button"
        size="sm"
        className="mb-2 mt-3"
        onClick={() =>
          append({
            value: "",
          })
        }
      >
     Add Size
      
      </Button>
      </div>
   
      <div className="flex flex-col gap-5 mb-5">

{colors.map((field, index) => {
return (
  <div key={field.id} className="flex flex-col">
    <section className="flex gap-5 p-2" key={field.id}>
      <Input
         {...register(`colors.${index}.value` as const, {
          required: true
        })}
        placeholder="Color"
      />
      <Button size="icon" variant="destructive" disabled={loading}  onClick={() => colorRemove (index)}>
        <Trash className="h-4 w-4" />
      </Button>
    </section>
  </div>
);
})}
<Button
        type="button"
        className="mb-2 mt-3"
        size="sm"
        disabled={loading}
        onClick={() =>
          colorAppend({
            value: "",
          })
        }
      >
        Add Color
      </Button>
</div> 
  </div>
  <Button className="ml-auto" type="submit" >
    {action}
  </Button>
    </form>


  
  </>
);
  
}
export default ProductForm;