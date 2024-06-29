import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import Pin from "./Pin";

function Map({ properties }: any) {
  return (
    <MapContainer
    center={
      properties.length === 1
        ? [properties[0].latitude, properties[0].longitude]
        : [52.4797, -1.90269]
    }
    zoom={13}
    scrollWheelZoom={false}
    className="map h-full w-full z-0"
  >
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {properties.map((property) => (
      <Pin item={property} key={property.id} />
    ))}
  </MapContainer>
  );
}

export default Map;
