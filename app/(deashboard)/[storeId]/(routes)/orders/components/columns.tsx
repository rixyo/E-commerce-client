"use client"

import { ColumnDef } from "@tanstack/react-table"



export type OrderColumn = {
id: string
address: string;
phone: string;
isDelivered: boolean;
totalPrice: string;
isPaid: boolean;
orderItems: string;
quantity: number;
createdAt: string;
}

export const columns: ColumnDef<OrderColumn>[] = [
  {
    accessorKey: "orderItems",
    header: "Product",

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
    accessorKey: "quantity",
    header: "Quantity",
  },
  {
    accessorKey: "totalPrice",
    header: "Total Price",

  },
  {
    accessorKey: "createdAt",
    header: "Date",
  },
];