import React from "react";
import { useSearchParams } from "react-router-dom";

import SearchFilter from "./SearchFilter";
import MobileFilterSearch from "./MobileFilterSearch";
import MapHome from "./MapHome";
import { useQuery } from "@tanstack/react-query";
import PropertyListCard, { PropertyProps } from "@/routes/properties/PropertyListCard";

export default function PropertyList() {
  const [searchParams] = useSearchParams();
  const query = searchParams.toString();

  const { data: properties, isLoading, error } = useQuery<PropertyProps[]>({
    queryKey: ["properties", query],
    queryFn: () =>
      fetch(`http://localhost:8800/api/posts?${query}`).then((res) =>
        res.json()
      ),
  });


  if (isLoading) return <div>Loading...</div>;
  if (error)
    return (
      <div>Error loading properties: {(error as Error).message}</div>
    );

  return (
    <div className="grid grid-cols-1 gap-8">
      <div className="dark:bg-gray-950 rounded-lg md:pb-10">
        <div className="hidden md:block md:px-20 md:mt-[-20px]">
          <SearchFilter />
        </div>
        <div className="md:hidden">
          
          <MobileFilterSearch />
        </div>
      </div>

      <div className="flex w-full gap-14 h-[100rem] mb-16 justify-evenly place-content-center">
        {/* left side - Map */}
        <div className="w-[1000px] max-h-[93vh] hidden md:block ml-3 sticky top-20">
          {properties && properties.length > 0 && (
            <MapHome properties={properties} />
          )}
        </div>

        <div className="flex flex-col gap-4 justify-self-end lg:pl-10 w-full">
          {properties && properties.length === 0 ? (
            <p className="text-xl font-bold mt-4">No properties found.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-10">
              {properties?.map((property: PropertyProps) => (
                <PropertyListCard key={property.id} property={property} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
