"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

//import { CellAction } from "./cell-action"

export type ProgramColumn = {
  id: string;
  name: string;
  createdAt: string;
};

export const columns: ColumnDef<ProgramColumn>[] = [
  {
    accessorKey: "name",
    header: "Ime programa",
  },
  {
    accessorKey: "createdAt",
    header: "Datum kreiranja programa",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
