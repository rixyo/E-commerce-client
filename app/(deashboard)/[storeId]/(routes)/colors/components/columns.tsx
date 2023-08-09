// Note: This file is used for the color table columns
"use client"

import { ColumnDef } from "@tanstack/react-table"

import { CellAction } from "./cell-action"

export type ColorColumn =  {
  id: string
  name: string
  value: string
  createdAt: string
}


export const columns: ColumnDef<ColorColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "value",
    header: "Value",
    cell: ({ row }) => (
      <div className="flex items-center gap-x-2">
        {row.original?.value}
        <div className="h-6 w-6 rounded-full border" style={{ backgroundColor: row.original?.value }} />
      </div>
    )
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