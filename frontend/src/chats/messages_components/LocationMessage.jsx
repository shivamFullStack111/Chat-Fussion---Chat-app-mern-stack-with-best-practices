import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useSelector } from "react-redux";

const LocationMessage = ({ message }) => {
  const { user } = useSelector((state) => state.user);
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
    <>
      {message?.sender == user?.email ? (
        <div className="p-2 w-[206px] ml-auto z-10   rounded-lg bg-[#31fc5d3e]">
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
            className="w-full h-8 mt-2 cursor-pointer rounded-md  bg-blue-500 flex justify-center items-center text-white"
          >
            Locate
          </div>
        </div>
      ) : (
        <div className="w-[200px] z-10 bg-[#1964dd4b] p-1 rounded-lg ">
          <div>
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
              className="w-full h-8 mt-2 cursor-pointer rounded-md  bg-blue-500 flex justify-center items-center text-white"
            >
              Locate
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LocationMessage;
