"use client";

import { Heading } from "@/components/custom_ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { MemberColumn, columns } from "./columns";
import { DataTable } from "@/components/custom_ui/data-table";

interface MemberClientProps {
  data: MemberColumn[];
}

export const MemberClient: React.FC<MemberClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useSearchParams();

  return (
    <div>
      <div className="flex items-center justify-between ">
        <Heading
          title={`Članovi (${data.length})`}
          description=" Manage members"
        />
        <Button onClick={() => router.push(`/clanovi/new`)}>
          <Plus className="w-4 h-4 mr-2" />
          Add new
        </Button>
      </div>
      <Separator className="mt-4 mb-8" />
      <DataTable searchKey="name" columns={columns} data={data} />
    </div>
  );
};
