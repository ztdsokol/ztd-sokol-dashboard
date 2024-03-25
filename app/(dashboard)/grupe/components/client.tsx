"use client";

import { Heading } from "@/components/custom_ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Group } from "@prisma/client";
import { Plus } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { GroupColumn, columns } from "./columns";
import { DataTable } from "@/components/custom_ui/data-table";

interface GroupClientProps {
  data: GroupColumn[];
}

export const GroupClient: React.FC<GroupClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useSearchParams();

  return (
    <div>
      <div className="flex items-center justify-between ">
        <Heading
          title={`Grupe (${data.length})`}
          description=" Manage groups"
        />
        <Button onClick={() => router.push(`/grupe/new`)}>
          <Plus className="w-4 h-4 mr-2" />
          Add new
        </Button>
      </div>
      <Separator className="mt-4 mb-8" />
      <DataTable searchKey="name" columns={columns} data={data} />
    </div>
  );
};
