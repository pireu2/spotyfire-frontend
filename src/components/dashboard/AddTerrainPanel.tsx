"use client";

import { useState, ComponentType } from "react";
import { X, Loader2, MapPin, Euro, SquareIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CreatePropertyRequest } from "@/types";
import { createProperty } from "@/lib/api";
import { useUser } from "@stackframe/stack";
import dynamic from "next/dynamic";

interface PolygonDrawMapProps {
  onPolygonChange: (
    coordinates: { lat: number; lng: number }[],
    area: number,
    center: { lat: number; lng: number } | null
  ) => void;
}

const PolygonDrawMap = dynamic<PolygonDrawMapProps>(
  () => import("@/components/map/PolygonDrawMap").then((mod) => mod.default),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-full bg-slate-900 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-green-500" />
      </div>
    ),
  }
);

interface AddTerrainPanelProps {
  onClose: () => void;
  onSuccess: () => void;
}

const CROP_TYPES = [
  { value: "grau", label: "Grâu" },
  { value: "porumb", label: "Porumb" },
  { value: "floarea_soarelui", label: "Floarea Soarelui" },
  { value: "rapita", label: "Rapiță" },
  { value: "orz", label: "Orz" },
  { value: "soia", label: "Soia" },
  { value: "vie", label: "Vie" },
  { value: "livada", label: "Livadă" },
  { value: "legume", label: "Legume" },
  { value: "altele", label: "Altele" },
];

const PRICE_PER_HA = 5000;

export default function AddTerrainPanel({
  onClose,
  onSuccess,
}: AddTerrainPanelProps) {
  const user = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [cropType, setCropType] = useState("grau");
  const [coordinates, setCoordinates] = useState<
    { lat: number; lng: number }[]
  >([]);
  const [area, setArea] = useState(0);
  const [center, setCenter] = useState<{ lat: number; lng: number } | null>(
    null
  );

  const estimatedValue = area * PRICE_PER_HA;

  const handlePolygonChange = (
    coords: { lat: number; lng: number }[],
    calculatedArea: number,
    calculatedCenter: { lat: number; lng: number } | null
  ) => {
    setCoordinates(coords);
    setArea(calculatedArea);
    setCenter(calculatedCenter);
  };

  const handleSubmit = async () => {
    setError(null);

    if (!name.trim()) {
      setError("Numele terenului este obligatoriu");
      return;
    }

    if (coordinates.length < 3) {
      setError(
        "Selectează cel puțin 3 puncte pe hartă pentru a forma un poligon"
      );
      return;
    }

    if (!center) {
      setError("Eroare la calcularea centrului poligonului");
      return;
    }

    const closedCoords = [...coordinates];
    if (
      closedCoords[0].lat !== closedCoords[closedCoords.length - 1].lat ||
      closedCoords[0].lng !== closedCoords[closedCoords.length - 1].lng
    ) {
      closedCoords.push({ ...closedCoords[0] });
    }

    const requestData: CreatePropertyRequest = {
      name: name.trim(),
      geometry: {
        type: "Polygon",
        coordinates: [closedCoords],
      },
      crop_type: cropType,
      area_ha: area,
      center_lat: center.lat,
      center_lng: center.lng,
      estimated_value: estimatedValue,
    };

    try {
      setIsLoading(true);
      const accessToken = await user
        ?.getAuthJson()
        .then((auth) => auth?.accessToken);
      await createProperty(requestData, accessToken || undefined);
      onSuccess();
    } catch (err) {
      console.error("Failed to create property:", err);
      setError("A apărut o eroare la crearea terenului. Încearcă din nou.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-full w-full">
      <div className="w-80 bg-slate-800 border-r border-slate-700 flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-slate-700">
          <h2 className="text-lg font-semibold text-white flex items-center gap-2">
            <MapPin className="h-5 w-5 text-green-500" />
            Adaugă Teren
          </h2>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {error && (
            <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Nume Teren *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="ex: Parcela Nord"
              className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Tip Cultură *
            </label>
            <select
              value={cropType}
              onChange={(e) => setCropType(e.target.value)}
              className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              {CROP_TYPES.map((crop) => (
                <option key={crop.value} value={crop.value}>
                  {crop.label}
                </option>
              ))}
            </select>
          </div>

          <div className="bg-slate-900/50 rounded-lg p-3 space-y-3">
            <h3 className="text-sm font-medium text-slate-300 flex items-center gap-2">
              <SquareIcon className="h-4 w-4 text-green-500" />
              Informații Poligon
            </h3>

            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-400">Puncte Selectate</span>
              <span className="text-white font-medium">
                {coordinates.length}
              </span>
            </div>

            <div className="flex items-center justify-between text-sm">
              <span className="text-slate-400">Suprafață Calculată</span>
              <span className="text-white font-medium">
                {area.toFixed(2)} ha
              </span>
            </div>

            {center && (
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Centru</span>
                <span className="text-white font-medium text-xs">
                  {center.lat.toFixed(4)}, {center.lng.toFixed(4)}
                </span>
              </div>
            )}
          </div>

          <div className="bg-green-600/20 border border-green-500/30 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <Euro className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium text-green-400">
                Cost Estimativ
              </span>
            </div>
            <p className="text-2xl font-bold text-white">
              {estimatedValue.toLocaleString()} €
            </p>
            <p className="text-xs text-slate-400 mt-1">
              Calculat la {PRICE_PER_HA.toLocaleString()} €/ha
            </p>
          </div>

          <div className="text-xs text-slate-500 bg-slate-900/50 rounded-lg p-3">
            <p className="font-medium text-slate-400 mb-1">Instrucțiuni:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>Click pe hartă pentru a adăuga puncte</li>
              <li>Minim 3 puncte pentru a forma un poligon</li>
              <li>Click pe un punct existent pentru a-l șterge</li>
              <li>Aria și centrul se calculează automat</li>
            </ul>
          </div>
        </div>

        <div className="p-4 border-t border-slate-700 space-y-2">
          <Button
            onClick={handleSubmit}
            disabled={isLoading || coordinates.length < 3}
            className="w-full bg-green-600 hover:bg-green-700 disabled:opacity-50"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Se creează...
              </>
            ) : (
              <>
                <MapPin className="h-4 w-4 mr-2" />
                Salvează Teren
              </>
            )}
          </Button>
          <Button
            variant="outline"
            onClick={onClose}
            className="w-full border-slate-600 text-slate-300 hover:bg-slate-700"
          >
            Anulează
          </Button>
        </div>
      </div>

      <div className="flex-1 relative">
        <PolygonDrawMap onPolygonChange={handlePolygonChange} />
      </div>
    </div>
  );
}
