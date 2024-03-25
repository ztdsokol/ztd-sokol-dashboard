import { format } from "date-fns";
import { LocationClient } from "./components/client";
import prismadb from "@/lib/prismadb";
import { LocationColumn } from "./components/columns";
import Groups from "../groups/page";
import { create } from "domain";
import { id } from "date-fns/locale";

const LocationsPage = async () => {
  const locations = await prismadb.location.findMany({
    orderBy: { name: "asc" },
  });

  const formattedLocations: LocationColumn[] = locations.map((item) => ({
    id: item.id,
    name: item.name,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col w-full">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <LocationClient data={formattedLocations} />
      </div>
    </div>
  );
};

export default LocationsPage;
