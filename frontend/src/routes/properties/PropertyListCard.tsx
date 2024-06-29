import React from "react";
import { Link } from "react-router-dom";

export interface PropertyProps {
   id: string;
   title: string;
   address: string;
   bedroom: number;
   bathroom: number;
   type: string;
   property: string;
   price: number;
   images: string[];
   postDetail?: {
      size?: number;
      desc: string;
      wifi?: boolean;
      water?: boolean;
      gas?: boolean;
      parking?: boolean;
      electricity?: boolean;
      swimmingPool?: boolean;
      fitnessCenter?: boolean;
      clubhouse?: boolean;
      playground?: boolean;
      petFriendly?: boolean;
   };
}

interface PropertyListCardProps {
   property: PropertyProps;
}

const PropertyListCard: React.FC<PropertyListCardProps> = ({ property }) => {
   const priceLabel = property.price.toLocaleString();
   const sizeLabel = property.postDetail?.size
      ? `${property.postDetail.size} sq ft`
      : "N/A";

   return (
      <Link to={`/${property.id}`}>
         <div className="overflow-hidden max-w-[22rem]  rounded-md bg-white shadow-sm">
            <div className="max-h-[12rem] w-full overflow-hidden">
               <img
                  src={property.images[0]}
                  alt={property.title}
                  className="h-full w-full object-cover "
               />
            </div>

            <div className="flex flex-col gap-2 p-4">
               <div className="flex gap-2">
                  <p className=" rounded-full capitalize bg-green-100 px-2 text-[10px] font-medium text-green-600">
                     {property.type === "rent" ? "Rent" : "Sale"}
                  </p>
                  <p className="rounded-full capitalize bg-indigo-100 px-2 text-[10px] font-medium text-indigo-600">
                     {property.property}
                  </p>
               </div>
               <div>
                  <p className="text-xl font-bold text-gray-900">
                     {property.title.slice(0, 20)}
                     {property.title.length > 10 ? "..." : ""}
                  </p>
                  <p className="text-sm text-gray-700">
                     {property.bedroom && property.bathroom === 0 ? "" : ``}
                  </p>
                  <p className="text-sm text-gray-500">{property.address}</p>
               </div>
            </div>

            <div className="flex justify-between border-t border-t-gray-100 items-center bg-gray-50 p-3">
               <div className="flex items-center">
                  <p className="text-xl font-bold text-gray-900">
                     ₱{priceLabel}
                  </p>
                  <p className="text-sm text-gray-500">
                     {property.type === "rent" ? "/month" : ""}
                  </p>
               </div>
               <div className="text-sm hover:bg-blue-500 hover:text-white text-black transition delay-100 p-2 rounded-md bg-white/100">
                  View Property
               </div>
            </div>
         </div>
      </Link>
   );
};

export default PropertyListCard;
