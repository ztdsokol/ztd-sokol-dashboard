"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

//import { CellAction } from "./cell-action"

export type LocationColumn = {
  id: string;
  name: string;
  createdAt: string;
};

export const columns: ColumnDef<LocationColumn>[] = [
  {
    accessorKey: "name",
    header: "Ime lokacije",
  },
  {
    accessorKey: "createdAt",
    header: "Datum kreiranja lokacije",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
