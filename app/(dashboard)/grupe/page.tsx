import { format } from "date-fns";
import { GroupClient } from "./components/client";
import prismadb from "@/lib/prismadb";
import { GroupColumn } from "./components/columns";
import Groups from "../groups/page";
import { create } from "domain";
import { id } from "date-fns/locale";

const GroupsPage = async () => {
  const groups = await prismadb.group.findMany({
    include: { program: true, location: true },
    orderBy: { name: "asc" },
  });

  const formattedGroups: GroupColumn[] = groups.map((item) => ({
    id: item.id,
    name: item.name,
    program: item.program.name,
    location: item.location.name,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col w-full">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <GroupClient data={formattedGroups} />
      </div>
    </div>
  );
};

export default GroupsPage;
