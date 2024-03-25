"use client";
import { ColumnDef } from "@tanstack/react-table";
import Delete from "../custom_ui/Delete";
import Link from "next/link";
import { Group, Member } from "@prisma/client";
export const columns: ColumnDef<GroupType>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => <div className="flex space-x-2">{row.original.id}</div>,
  },
  {
    accessorKey: "name",
    header: "Ime grupe",
    cell: ({ row }) => (
      <Link href={`/groups/${row.original.id}`}>{row.original.name}</Link>
    ),
  },
  {
    accessorKey: "members",
    header: "Članovi",
    cell: ({ row }) => {
      console.log(row.original.members); // This will log the members data
      return row.original.members.length > 0
        ? row.original.members
            .map((groupMember) => groupMember.member.name)
            .join(", ")
        : "No members";
    },
  },

  {
    accessorKey: "id",
    header: "Akcije",
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <Delete item="group" id={row.original.id} />
      </div>
    ),
  },
];
