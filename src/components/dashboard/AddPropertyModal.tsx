"use client";

import { useState } from "react";
import { X, MapPin, Loader2, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CreatePropertyRequest } from "@/types";
import { createProperty } from "@/lib/api";
import { useUser } from "@stackframe/stack";

interface AddPropertyModalProps {
  isOpen: boolean;
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

export default function AddPropertyModal({
  isOpen,
  onClose,
  onSuccess,
}: AddPropertyModalProps) {
  const user = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [cropType, setCropType] = useState("grau");
  const [areaHa, setAreaHa] = useState("");
  const [estimatedValue, setEstimatedValue] = useState("");
  const [coordinates, setCoordinates] = useState<
    { lat: string; lng: string }[]
  >([
    { lat: "", lng: "" },
    { lat: "", lng: "" },
    { lat: "", lng: "" },
  ]);

  const addCoordinate = () => {
    setCoordinates([...coordinates, { lat: "", lng: "" }]);
  };

  const removeCoordinate = (index: number) => {
    if (coordinates.length > 3) {
      setCoordinates(coordinates.filter((_, i) => i !== index));
    }
  };

  const updateCoordinate = (
    index: number,
    field: "lat" | "lng",
    value: string
  ) => {
    const updated = [...coordinates];
    updated[index][field] = value;
    setCoordinates(updated);
  };

  const calculateCenter = (coords: { lat: number; lng: number }[]) => {
    const sumLat = coords.reduce((acc, c) => acc + c.lat, 0);
    const sumLng = coords.reduce((acc, c) => acc + c.lng, 0);
    return {
      lat: sumLat / coords.length,
      lng: sumLng / coords.length,
    };
  };

  const resetForm = () => {
    setName("");
    setCropType("grau");
    setAreaHa("");
    setEstimatedValue("");
    setCoordinates([
      { lat: "", lng: "" },
      { lat: "", lng: "" },
      { lat: "", lng: "" },
    ]);
    setError(null);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError("Numele terenului este obligatoriu");
      return;
    }

    const parsedCoords = coordinates.map((c) => ({
      lat: parseFloat(c.lat),
      lng: parseFloat(c.lng),
    }));

    if (parsedCoords.some((c) => isNaN(c.lat) || isNaN(c.lng))) {
      setError("Toate coordonatele trebuie să fie numere valide");
      return;
    }

    const area = parseFloat(areaHa);
    if (isNaN(area) || area <= 0) {
      setError("Suprafața trebuie să fie un număr pozitiv");
      return;
    }

    const value = parseFloat(estimatedValue);
    if (isNaN(value) || value < 0) {
      setError("Valoarea estimată trebuie să fie un număr valid");
      return;
    }

    const center = calculateCenter(parsedCoords);

    const closedCoords = [...parsedCoords];
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
      estimated_value: value,
    };

    try {
      setIsLoading(true);
      const accessToken = await user
        ?.getAuthJson()
        .then((auth) => auth?.accessToken);
      await createProperty(requestData, accessToken || undefined);
      resetForm();
      onSuccess();
      onClose();
    } catch (err) {
      console.error("Failed to create property:", err);
      setError("A apărut o eroare la crearea terenului. Încearcă din nou.");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-9999 flex items-center justify-center p-4">
      <div className="bg-slate-800 rounded-2xl w-full max-w-lg max-h-[90vh] overflow-hidden border border-slate-700 flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-slate-700">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-green-500" />
            <h2 className="text-lg font-semibold text-white">
              Adaugă Teren Nou
            </h2>
          </div>
          <button
            onClick={handleClose}
            className="p-1 rounded-lg hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex-1 overflow-y-auto p-4 space-y-4"
        >
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

          <div className="grid grid-cols-2 gap-4">
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

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                Suprafață (ha) *
              </label>
              <input
                type="number"
                step="0.01"
                value={areaHa}
                onChange={(e) => setAreaHa(e.target.value)}
                placeholder="ex: 25.5"
                className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Valoare Estimată (EUR) *
            </label>
            <input
              type="number"
              step="0.01"
              value={estimatedValue}
              onChange={(e) => setEstimatedValue(e.target.value)}
              placeholder="ex: 50000"
              className="w-full px-3 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-slate-300">
                Coordonate Poligon * (minim 3 puncte)
              </label>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={addCoordinate}
                className="text-green-500 hover:text-green-400 hover:bg-green-500/10"
              >
                <Plus className="h-4 w-4 mr-1" />
                Adaugă Punct
              </Button>
            </div>

            <div className="space-y-2 max-h-48 overflow-y-auto">
              {coordinates.map((coord, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="text-xs text-slate-500 w-6">
                    {index + 1}.
                  </span>
                  <input
                    type="text"
                    value={coord.lat}
                    onChange={(e) =>
                      updateCoordinate(index, "lat", e.target.value)
                    }
                    placeholder="Latitudine"
                    className="flex-1 px-3 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  <input
                    type="text"
                    value={coord.lng}
                    onChange={(e) =>
                      updateCoordinate(index, "lng", e.target.value)
                    }
                    placeholder="Longitudine"
                    className="flex-1 px-3 py-2 bg-slate-900 border border-slate-600 rounded-lg text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  />
                  {coordinates.length > 3 && (
                    <button
                      type="button"
                      onClick={() => removeCoordinate(index)}
                      className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  )}
                </div>
              ))}
            </div>
            <p className="text-xs text-slate-500 mt-2">
              Introdu coordonatele în format zecimal (ex: 45.7489, 21.2087)
            </p>
          </div>
        </form>

        <div className="p-4 border-t border-slate-700 flex gap-3 justify-end">
          <Button
            type="button"
            variant="outline"
            onClick={handleClose}
            className="border-slate-600 text-slate-300 hover:bg-slate-700"
          >
            Anulează
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isLoading}
            className="bg-green-600 hover:bg-green-700"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Se creează...
              </>
            ) : (
              <>
                <MapPin className="h-4 w-4 mr-2" />
                Adaugă Teren
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
