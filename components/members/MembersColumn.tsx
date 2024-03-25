"use client";
import { ColumnDef } from "@tanstack/react-table";
import Delete from "../custom_ui/Delete";
import Link from "next/link";
import { Member } from "@prisma/client";
export const columns: ColumnDef<Member>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div className="flex space-x-2">{row.original.id}</div>,
  },
  {
    accessorKey: "name",
    header: "Ime i prezime",
    cell: ({ row }) => (
      <Link href={`/members/${row.original.id}`}>{row.original.name}</Link>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <div>{row.original.email}</div>,
  },

  {
    accessorKey: "id",
    header: "Akcije",
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <Delete item="member" id={row.original.id} />
      </div>
    ),
  },
];
