import prismadb from "@/lib/prismadb";
import React from "react";
import { ProgramForm } from "./components/program-form";

const ProgramPage = async ({ params }: { params: { programId: string } }) => {
  const program = await prismadb.program.findUnique({
    where: {
      id: params.programId,
    },
  });
  return (
    <div className="flex-col w-full">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <ProgramForm initialData={program} />
        </div>
      </div>
    </div>
  );
};

export default ProgramPage;
