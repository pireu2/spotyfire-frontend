"use client";

import { useEffect, useRef, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Polygon,
  Marker,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface PolygonDrawMapProps {
  onPolygonChange: (
    coordinates: { lat: number; lng: number }[],
    area: number,
    center: { lat: number; lng: number } | null
  ) => void;
  initialPolygon?: { lat: number; lng: number }[];
  existingPolygons?: [number, number][][][];
}

export type { PolygonDrawMapProps };

const markerIcon = new L.DivIcon({
  className: "custom-marker",
  html: `<div style="width: 12px; height: 12px; background-color: #10b981; border: 2px solid white; border-radius: 50%; box-shadow: 0 2px 4px rgba(0,0,0,0.3);"></div>`,
  iconSize: [12, 12],
  iconAnchor: [6, 6],
});

function calculatePolygonArea(coords: { lat: number; lng: number }[]): number {
  if (coords.length < 3) return 0;

  const toRadians = (deg: number) => (deg * Math.PI) / 180;
  const R = 6371000;

  let area = 0;
  const n = coords.length;

  for (let i = 0; i < n; i++) {
    const j = (i + 1) % n;
    const lat1 = toRadians(coords[i].lat);
    const lat2 = toRadians(coords[j].lat);
    const lng1 = toRadians(coords[i].lng);
    const lng2 = toRadians(coords[j].lng);

    area += (lng2 - lng1) * (2 + Math.sin(lat1) + Math.sin(lat2));
  }

  area = Math.abs((area * R * R) / 2);

  return area / 10000;
}

function calculateCenter(
  coords: { lat: number; lng: number }[]
): { lat: number; lng: number } | null {
  if (coords.length === 0) return null;

  const sumLat = coords.reduce((acc, c) => acc + c.lat, 0);
  const sumLng = coords.reduce((acc, c) => acc + c.lng, 0);

  return {
    lat: sumLat / coords.length,
    lng: sumLng / coords.length,
  };
}

function MapClickHandler({
  coordinates,
  setCoordinates,
  onPolygonChange,
}: {
  coordinates: { lat: number; lng: number }[];
  setCoordinates: React.Dispatch<
    React.SetStateAction<{ lat: number; lng: number }[]>
  >;
  onPolygonChange: PolygonDrawMapProps["onPolygonChange"];
}) {
  useMapEvents({
    click: (e) => {
      const newCoord = { lat: e.latlng.lat, lng: e.latlng.lng };
      const newCoords = [...coordinates, newCoord];
      setCoordinates(newCoords);

      const area = calculatePolygonArea(newCoords);
      const center = calculateCenter(newCoords);
      onPolygonChange(newCoords, area, center);
    },
  });

  return null;
}

export default function PolygonDrawMap({
  onPolygonChange,
  initialPolygon,
  existingPolygons = [],
}: PolygonDrawMapProps) {
  const [coordinates, setCoordinates] = useState<
    { lat: number; lng: number }[]
  >(initialPolygon || []);

  useEffect(() => {
    if (initialPolygon && initialPolygon.length > 0) {
      setCoordinates(initialPolygon);
      const area = calculatePolygonArea(initialPolygon);
      const center = calculateCenter(initialPolygon);
      onPolygonChange(initialPolygon, area, center);
    } else {
      setCoordinates([]);
    }
  }, [initialPolygon]);

  const handleMarkerClick = (index: number) => {
    const newCoords = coordinates.filter((_, i) => i !== index);
    setCoordinates(newCoords);

    const area = calculatePolygonArea(newCoords);
    const center = calculateCenter(newCoords);
    onPolygonChange(newCoords, area, center);
  };

  const romaniaBounds: L.LatLngBoundsExpression = [
    [43.5, 20.2],
    [48.3, 30.0],
  ];

  return (
    <div className="h-full w-full relative">
      <MapContainer
        center={[45.9432, 24.9668]}
        zoom={7}
        minZoom={7}
        maxZoom={18}
        maxBounds={romaniaBounds}
        maxBoundsViscosity={1.0}
        className="h-full w-full"
        style={{ background: "#1e293b" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapClickHandler
          coordinates={coordinates}
          setCoordinates={setCoordinates}
          onPolygonChange={onPolygonChange}
        />

        {/* Existing Polygons Layer */}
        {existingPolygons.map((polygonCoords, index) => {
          // Validation: Ensure we have at least one ring with points
          if (
            !polygonCoords ||
            !Array.isArray(polygonCoords) ||
            polygonCoords.length === 0 ||
            !polygonCoords[0] ||
            polygonCoords[0].length === 0
          ) {
            return null;
          }

          return (
            <Polygon
              key={`existing-${index}`}
              positions={polygonCoords as any}
              pathOptions={{
                color: "#059669", // Green (matches "Sănătos" status)
                fillColor: "#059669",
                fillOpacity: 0.4,
                weight: 3,
                interactive: false,
              }}
            />
          );
        })}

        {coordinates.length >= 3 && (
          <Polygon
            positions={coordinates.map(
              (c) => [c.lat, c.lng] as [number, number]
            )}
            pathOptions={{
              color: "#10b981",
              fillColor: "#10b981",
              fillOpacity: 0.3,
              weight: 2,
            }}
          />
        )}

        {coordinates.map((coord, index) => (
          <Marker
            key={index}
            position={[coord.lat, coord.lng]}
            icon={markerIcon}
            eventHandlers={{
              click: () => handleMarkerClick(index),
            }}
          />
        ))}
      </MapContainer>

      {coordinates.length > 0 && coordinates.length < 3 && (
        <div className="absolute bottom-4 left-4 z-[1000] bg-orange-500/20 backdrop-blur px-3 py-2 rounded-lg border border-orange-500/50 pointer-events-none">
          <p className="text-xs text-orange-400">
            Mai ai nevoie de {3 - coordinates.length} punct
            {coordinates.length === 2 ? "" : "e"}
          </p>
        </div>
      )}
    </div>
  );
}
