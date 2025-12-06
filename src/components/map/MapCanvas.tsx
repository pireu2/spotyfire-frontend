"use client";

import { MapContainer, TileLayer, Polygon, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LandParcel } from "@/types";

interface MapCanvasProps {
  parcels: LandParcel[];
}

const getParcelColor = (status: LandParcel["status"]) => {
  switch (status) {
    case "fire":
      return { color: "#ea580c", fillColor: "#ea580c" };
    case "flood":
      return { color: "#2563eb", fillColor: "#2563eb" };
    default:
      return { color: "#059669", fillColor: "#059669" };
  }
};

const getStatusText = (status: LandParcel["status"]) => {
  switch (status) {
    case "fire":
      return "Incendiu Detectat";
    case "flood":
      return "Inundație Detectată";
    default:
      return "Sănătos";
  }
};

const getNDVILabel = (value: number) => {
  if (value >= 0.7) return "Ridicat";
  if (value >= 0.4) return "Mediu";
  return "Scăzut";
};

export default function MapCanvas({ parcels }: MapCanvasProps) {
  const romaniaBounds: [[number, number], [number, number]] = [
    [43.5, 20.2],
    [48.3, 30.0],
  ];

  return (
    <MapContainer
      center={[45.9432, 24.9668]}
      zoom={7}
      minZoom={6}
      maxZoom={18}
      maxBounds={romaniaBounds}
      maxBoundsViscosity={1.0}
      className="h-full w-full rounded-lg"
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {parcels.map((parcel) => {
        const colors = getParcelColor(parcel.status);
        return (
          <Polygon
            key={parcel.id}
            positions={parcel.coordinates}
            pathOptions={{
              ...colors,
              fillOpacity: 0.4,
              weight: 3,
            }}
          >
            <Popup>
              <div className="p-2 min-w-[200px]">
                <h3 className="font-bold text-lg mb-2">{parcel.name}</h3>
                <div className="space-y-1 text-sm">
                  <p>
                    <span className="font-medium">Stare:</span>{" "}
                    <span
                      className={
                        parcel.status === "fire"
                          ? "text-orange-600"
                          : parcel.status === "flood"
                          ? "text-blue-600"
                          : "text-green-600"
                      }
                    >
                      {getStatusText(parcel.status)}
                    </span>
                  </p>
                  <p>
                    <span className="font-medium">Index Vegetație (NDVI):</span>{" "}
                    {parcel.ndviIndex.toFixed(2)} (
                    {getNDVILabel(parcel.ndviIndex)})
                  </p>
                  <p>
                    <span className="font-medium">Suprafață:</span>{" "}
                    {parcel.area} ha
                  </p>
                  {parcel.damageEstimate && (
                    <p className="text-red-600 font-medium">
                      Estimare Daune:{" "}
                      {parcel.damageEstimate.toLocaleString("ro-RO")} RON
                    </p>
                  )}
                </div>
              </div>
            </Popup>
          </Polygon>
        );
      })}
    </MapContainer>
  );
}
