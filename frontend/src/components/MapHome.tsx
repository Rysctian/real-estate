import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Pin from "./Pin";

interface PropertyDetailProps {
  id: number;
  latitude: number;
  longitude: number;
  title: string;
  address: string;
  bedrooms: number;
  bathrooms: number;
  propertyType: string;
  price: number;
  images: string[];
}

interface MapHomeProps {
  properties: PropertyDetailProps[] ;
}



const MapHome: React.FC<MapHomeProps> = ({ properties }) => {


  console.log("PROPERTIES MAP....", properties);
  return (
    <MapContainer
      center={
        properties.length === 1
          ? [properties[0].latitude, properties[0].longitude]
          : [14.5995, 120.9842]
      }
      zoom={12}
      scrollWheelZoom={false}
      className="map h-full w-full shadow-lg border-[1px]"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {properties.map((property) => (
        <Pin key={property.id} item={property} />
      ))}
    </MapContainer>
  );
};

export default MapHome;
