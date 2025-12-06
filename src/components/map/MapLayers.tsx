"use client";

import { useState } from "react";
import { Layers, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";

interface MapLayersProps {
  onLayerChange?: (layer: string) => void;
}

const layers = [
  { id: "natural", name: "Culoare Naturală", active: true },
  { id: "ndvi", name: "NDVI (Vegetație)", active: false },
  { id: "thermal", name: "Termic", active: false },
  { id: "radar", name: "Radar", active: false },
];

export default function MapLayers({ onLayerChange }: MapLayersProps) {
  const [activeLayers, setActiveLayers] = useState<string[]>(["natural"]);
  const [isOpen, setIsOpen] = useState(false);

  const toggleLayer = (layerId: string) => {
    setActiveLayers((prev) =>
      prev.includes(layerId)
        ? prev.filter((id) => id !== layerId)
        : [...prev, layerId]
    );
    onLayerChange?.(layerId);
  };

  return (
    <div className="absolute top-4 right-4 z-[1000]">
      <Button
        variant="outline"
        size="icon"
        className="bg-white/90 backdrop-blur border-slate-200 shadow-lg"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Layers className="h-4 w-4 text-slate-700" />
      </Button>

      {isOpen && (
        <div className="absolute top-12 right-0 bg-white/95 backdrop-blur rounded-lg shadow-xl border border-slate-200 p-3 min-w-[180px]">
          <h4 className="text-sm font-semibold text-slate-700 mb-2">
            Straturi Hartă
          </h4>
          <div className="space-y-1">
            {layers.map((layer) => (
              <button
                key={layer.id}
                onClick={() => toggleLayer(layer.id)}
                className={`flex items-center gap-2 w-full px-2 py-1.5 rounded text-sm transition-colors ${
                  activeLayers.includes(layer.id)
                    ? "bg-green-100 text-green-700"
                    : "text-slate-600 hover:bg-slate-100"
                }`}
              >
                {activeLayers.includes(layer.id) ? (
                  <Eye className="h-4 w-4" />
                ) : (
                  <EyeOff className="h-4 w-4" />
                )}
                {layer.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
