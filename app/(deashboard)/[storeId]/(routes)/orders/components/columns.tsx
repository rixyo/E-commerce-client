"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action";



export type OrderColumn = {
id: string
address: string;
phone: string;
isDelivered: boolean;
totalPrice: string;
isPaid: boolean;
orderItems: string;
orderItemsQuantity: string;
orderItemsSize: string;
orderItemsColor: string[];
createdAt: string;
}

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "id",
    header: "Order ID",

  },
  {
    accessorKey: "orderItems",
    header: "Product",

  },
  {
    accessorKey: "orderItemsQuantity",
    header: "Quantity",
  },
  {
    accessorKey: "orderItemsSize",
    header: "Size",
  },
  {
    accessorKey: "orderItemsColor",
    header: "Color",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        {row.original?.orderItemsColor.map((color, index) => (

        <div key={index} className="h-6 w-6 rounded-full border" style={{ backgroundColor: color}} />
        ))}
      </div>
    )
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "isDelivered",
    header: "Delivered",
  },
  {
    accessorKey: "isPaid",
    header: "Payment",
  },
  {
    accessorKey: "totalPrice",
    header: "Total Price",

  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => <CellAction data={row.original} />
  },
];