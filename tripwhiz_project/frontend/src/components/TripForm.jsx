import React, { useEffect, useState } from "react";
import { createTrip, updateTrip } from "../api";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";

function LocationPicker({ position, setPosition }) {
  useMapEvents({
    click(e) {
      setPosition([e.latlng.lat, e.latlng.lng]);
    },
  });
  return position ? <Marker position={position} /> : null;
}

export default function TripForm({ onSaved, editing, onCancel }) {
  const [form, setForm] = useState({
    title: "",
    destination: "",
    start_date: "",
    end_date: "",
    notes: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [position, setPosition] = useState(null);

  useEffect(() => {
    if (editing) {
      setForm({
        title: editing.title || "",
        destination: editing.destination || "",
        start_date: editing.start_date || "",
        end_date: editing.end_date || "",
        notes: editing.notes || "",
      });
      if (editing.latitude && editing.longitude) {
        setPosition([editing.latitude, editing.longitude]);
      } else {
        setPosition(null);
      }
    } else {
      setForm({
        title: "",
        destination: "",
        start_date: "",
        end_date: "",
        notes: "",
      });
      setPosition(null);
    }
  }, [editing]);

  async function submit(e) {
    e.preventDefault();
    const fd = new FormData();
    fd.append("title", form.title);
    fd.append("destination", form.destination);
    fd.append("start_date", form.start_date);
    fd.append("end_date", form.end_date);
    fd.append("notes", form.notes);
    if (position) {
      fd.append("latitude", position[0]);
      fd.append("longitude", position[1]);
    }
    if (imageFile) fd.append("image", imageFile);
    if (editing) await updateTrip(editing.id, fd);
    else await createTrip(fd);
    onSaved && onSaved();
    onCancel && onCancel();
  }

  return (
    <form onSubmit={submit} className="mb-6 p-4 border rounded bg-white shadow-lg">
      <h2 className="text-lg font-semibold mb-3">
        {editing ? "Edit Trip" : "Create New Trip"}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <input
          required
          placeholder="Trip title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="p-2 border rounded"
        />
        <input
          required
          placeholder="Destination"
          value={form.destination}
          onChange={(e) => setForm({ ...form, destination: e.target.value })}
          className="p-2 border rounded"
        />
        <input
          required
          type="date"
          value={form.start_date}
          onChange={(e) => setForm({ ...form, start_date: e.target.value })}
          className="p-2 border rounded"
        />
        <input
          required
          type="date"
          value={form.end_date}
          onChange={(e) => setForm({ ...form, end_date: e.target.value })}
          className="p-2 border rounded"
        />
      </div>

      <textarea
        placeholder="Notes"
        rows={3}
        value={form.notes}
        onChange={(e) => setForm({ ...form, notes: e.target.value })}
        className="mt-3 w-full p-2 border rounded"
      ></textarea>

      <div className="mt-3">
        <label className="block mb-1 font-medium">Upload Image</label>
        <input
          type="file"
          onChange={(e) => setImageFile(e.target.files[0])}
          className="text-sm"
        />
      </div>

      <div className="mt-3">
        <label className="block mb-1 font-medium">
          Pick location (click on map)
        </label>
        <div className="relative z-0">
          <MapContainer
            center={position || [20.5937, 78.9629]}
            zoom={5}
            scrollWheelZoom={false}
            className="w-full h-64 rounded-lg shadow-md"
          >
          <TileLayer
  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
  detectRetina={true}
  crossOrigin=""
/>
            <LocationPicker position={position} setPosition={setPosition} />
          </MapContainer>
        </div>

        {position && (
          <p className="text-sm text-gray-600 mt-2">
            📍 Latitude: {position[0].toFixed(4)}, Longitude:{" "}
            {position[1].toFixed(4)}
          </p>
        )}
      </div>

      <div className="mt-3 flex gap-2">
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          {editing ? "Update Trip" : "Create Trip"}
        </button>
        {editing && (
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
