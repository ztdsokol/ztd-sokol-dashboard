"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

//import { CellAction } from "./cell-action"

export type MemberColumn = {
  id: string;
  name: string;
  createdAt: string;
};

export const columns: ColumnDef<MemberColumn>[] = [
  {
    accessorKey: "name",
    header: "Ime clana",
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
