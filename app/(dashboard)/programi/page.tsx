import { format } from "date-fns";
import { ProgramClient } from "./components/client";
import prismadb from "@/lib/prismadb";
import { ProgramColumn } from "./components/columns";
import { id } from "date-fns/locale";

const ProgramsPage = async () => {
  const programs = await prismadb.program.findMany({
    orderBy: { name: "asc" },
  });

  const formattedPrograms: ProgramColumn[] = programs.map((item) => ({
    id: item.id,
    name: item.name,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col w-full">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProgramClient data={formattedPrograms} />
      </div>
    </div>
  );
};

export default ProgramsPage;
