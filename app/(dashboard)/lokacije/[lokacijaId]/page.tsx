import prismadb from "@/lib/prismadb";
import React from "react";
import { LocationForm } from "./components/location-form";

const LocationPage = async ({ params }: { params: { lokacijaId: string } }) => {
  const location = await prismadb.location.findUnique({
    where: {
      id: params.lokacijaId,
    },
  });
  return (
    <div className="flex-col w-full">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <LocationForm initialData={location} />
        </div>
      </div>
    </div>
  );
};

export default LocationPage;
