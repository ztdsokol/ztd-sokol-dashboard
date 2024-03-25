"use client";

import { ColumnDef } from "@tanstack/react-table";
import { CellAction } from "./cell-action";

//import { CellAction } from "./cell-action"

export type GroupColumn = {
  id: string;
  name: string;
  createdAt: string;
  program: string;
  location: string;
};

export const columns: ColumnDef<GroupColumn>[] = [
  {
    accessorKey: "name",
    header: "Ime grupe",
  },
  {
    accessorKey: "program",
    header: "Program",
  },
  {
    accessorKey: "location",
    header: "Lokacija",
  },
  {
    accessorKey: "createdAt",
    header: "Datum kreiranja grupe",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
