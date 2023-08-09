// Note: This file is used for the category table columns
"use client"

import { ColumnDef } from "@tanstack/react-table"

import { CellAction } from "./cell-action"

export type CategoryColumn = {
  id: string;
  name: string;
 label:string;
 gender:string;
  createdAt: string;
}

export const columns: ColumnDef<CategoryColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",

  },
  {
    accessorKey: "gender",
    header: "Gender",

  },
  {
    accessorKey: "billboard",
    header: "Billboard",
    cell: ({ row }) => row.original.label,
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