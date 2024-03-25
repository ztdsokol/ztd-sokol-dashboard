import prismadb from "@/lib/prismadb";
import React from "react";
import { GroupForm } from "./components/group-form";

const GroupPage = async ({ params }: { params: { grupaId: string } }) => {
  const group = await prismadb.group.findUnique({
    where: {
      id: params.grupaId,
    },
  });

  const locations = await prismadb.location.findMany();
  const programs = await prismadb.program.findMany();
  const members = await prismadb.member.findMany();
  return (
    <div className="flex-col w-full">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <GroupForm
            locations={locations}
            programs={programs}
            initialData={group}
          />
        </div>
      </div>
    </div>
  );
};

export default GroupPage;
