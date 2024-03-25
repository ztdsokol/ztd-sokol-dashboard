import { format } from "date-fns";
import { MemberClient } from "./components/client";
import prismadb from "@/lib/prismadb";
import { MemberColumn } from "./components/columns";
import { id } from "date-fns/locale";

const MembersPage = async () => {
  const members = await prismadb.member.findMany({
    orderBy: { name: "asc" },
  });

  const formattedMembers: MemberColumn[] = members.map((item) => ({
    id: item.id,
    name: item.name,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col w-full">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <MemberClient data={formattedMembers} />
      </div>
    </div>
  );
};

export default MembersPage;
