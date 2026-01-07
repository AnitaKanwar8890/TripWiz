import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export default function TripDetails({ trip, onClose }) {
  const pos =
    trip.latitude && trip.longitude ? [trip.latitude, trip.longitude] : null;

  return (
    <div className="p-4 border rounded mt-4 bg-white shadow-lg">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">{trip.title}</h3>
          <p className="text-sm text-gray-600">{trip.destination}</p>
        </div>
        <div>
          <button
            onClick={onClose}
            className="px-3 py-1 border rounded hover:bg-gray-100"
          >
            Close
          </button>
        </div>
      </div>

      <p className="mt-2 text-gray-700">{trip.notes}</p>

      {trip.image_url && (
        <img
          src={
            (import.meta.env.VITE_API_URL || "http://localhost:4000/api").replace(
              "/api",
              ""
            ) + trip.image_url
          }
          alt="trip"
          className="mt-3 w-full h-48 object-cover rounded-lg shadow-sm"
        />
      )}

      {pos && (
        <div className="relative z-0 mt-4">
          <MapContainer
            center={pos}
            zoom={6}
            scrollWheelZoom={false}
            className="w-full h-64 rounded-lg shadow-md"
          >
          <TileLayer
  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
  detectRetina={true}
  crossOrigin=""
/>
            <Marker position={pos}>
              <Popup>{trip.destination}</Popup>
            </Marker>
          </MapContainer>
        </div>
      )}
    </div>
  );
}
