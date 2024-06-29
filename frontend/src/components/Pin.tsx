import React from "react";
import { Marker, Popup } from "react-leaflet";
import { Link } from "react-router-dom";
import { FaBed, FaBath } from "react-icons/fa";

export interface PropertyProps {
  id: string;
  latitude: number;
  longitude: number;
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

interface PinProps {
  item: PropertyProps;
}

const Pin: React.FC<PinProps> = ({ item }) => {
  if (!item) {
    return null; 
  }

 
  return (
    <Marker position={[item.latitude, item.longitude]}>
      <Popup>
        <div className="p-3 max-w-xs bg-white rounded-lg shadow-lg">
          <img 
            src={item.images[0]} 
            alt="" 
            className="w-full h-32 object-cover rounded-t-lg mb-2 shadow-md" 
          />
          <div className="text-left font-bold">
            <Link 
              to={`/${item.id}`} 
              className="text-lg font-bold hover:underline"
            >
              <p className="text-blue-700">{item.title}</p>
            </Link>
            <p className="text-sm text-gray-900 mt-1 flex items-center">
              <FaBed className="mr-2" /> {item.bedroom} bedrooms
              <FaBath className="ml-4 mr-2" /> {item.bathroom} bathrooms
            </p>
            <p className="text-sm font-light text-gray-500 mt-1">{item.address}</p>
            <p className="text-lg font-semibold text-black mt-2">
              ₱{item.price.toLocaleString()} {item.type === "rent" ? "/month" : ""}
            </p>
          </div>
        </div>
      </Popup>
    </Marker>
  );
};

export default Pin;
