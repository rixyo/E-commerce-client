"use client"

import { ColumnDef } from "@tanstack/react-table"

import { CellAction } from "./cell-action"

export type SizeColumn = undefined |  {
  id: string
  name: string
  value: SizeType
  createdAt: string;
}
enum SizeType {
  SMALL,
  MEDIUM,
  LARGE,
  XLARGE,
  XXLARGE,
  XXXLARGE
}

export const columns: ColumnDef<SizeColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "value",
    header: "Value",
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