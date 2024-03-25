import prismadb from "@/lib/prismadb";
import React from "react";
import { MemberForm } from "./components/member-form";

const MemberPage = async ({ params }: { params: { clanId: string } }) => {
  const member = await prismadb.member.findUnique({
    where: {
      id: params.clanId,
    },
  });
  return (
    <div className="flex-col w-full">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <MemberForm initialData={member} />
        </div>
      </div>
    </div>
  );
};

export default MemberPage;
