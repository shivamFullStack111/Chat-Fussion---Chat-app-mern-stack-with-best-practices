import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const LocationMessage = ({ message }) => {
  const position = [
    message?.message?.latitude || 51.505,
    message?.message?.longitude || -0.09,
  ]; // Default: London

  const handleRedirect = () => {
    const googleMapsUrl = `https://www.google.com/maps?q=${message?.message?.latitude},${message?.message?.longitude}`;

    // Redirect to Google Maps
    window.location.href = googleMapsUrl;
  };

  return (
    <div className="p-2 w-[206px] ml-auto   rounded-lg bg-[#31fc5d3e]">
      <MapContainer
        center={position}
        zoom={35}
        style={{ height: "200px", width: "190px" }}
        // className="w-full h-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={position}>
          <Popup>Location: {position.join(", ")}</Popup>
        </Marker>
      </MapContainer>
      <div
        onClick={handleRedirect}
        className="w-full h-8 mt-2 cursor-pointer rounded-md  bg-green-500 flex justify-center items-center text-white"
      >
        Locate
      </div>
    </div>
  );
};

export default LocationMessage;
