"use client";

import { Heading } from "@/components/custom_ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { ProgramColumn, columns } from "./columns";
import { DataTable } from "@/components/custom_ui/data-table";

interface ProgramClientProps {
  data: ProgramColumn[];
}

export const ProgramClient: React.FC<ProgramClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useSearchParams();

  return (
    <div>
      <div className="flex items-center justify-between ">
        <Heading
          title={`Programi (${data.length})`}
          description=" Manage programs"
        />
        <Button onClick={() => router.push(`/programi/new`)}>
          <Plus className="w-4 h-4 mr-2" />
          Add new
        </Button>
      </div>
      <Separator className="mt-4 mb-8" />
      <DataTable searchKey="name" columns={columns} data={data} />
    </div>
  );
};
