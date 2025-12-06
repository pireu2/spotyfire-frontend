"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "../ui/badge";
import { MapPin, Euro, SquareIcon, RefreshCw } from "lucide-react";

const PACKAGE_REPORTS: Record<string, number> = {
  Basic: 5,
  Pro: 15,
  Enterprise: 50,
};

export default function TerenCard({
  property,
  onRenew,
}: {
  property: any;
  onRenew: () => void;
}) {
  const {
    name,
    crop_type,
    area_ha,
    estimated_value,
    center_lat,
    center_lng,
    risk_score,
    activePackage,
    reportsLeft,
  } = property;
  return (
    <div className="bg-slate-800 rounded-xl border border-slate-700 p-4 hover:border-green-500/50 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-semibold text-white">{name}</h3>
          <p className="text-sm text-slate-400">{crop_type}</p>
        </div>
        <Badge className="bg-green-600 text-white text-xs px-2 py-1 rounded-lg">
          {activePackage}
        </Badge>
      </div>
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-slate-400">
            <SquareIcon className="h-4 w-4" />
            <span>Suprafață</span>
          </div>
          <span className="text-white font-medium">
            {area_ha.toFixed(2)} ha
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-slate-400">
            <Euro className="h-4 w-4" />
            <span>Valoare Estimată</span>
          </div>
          <span className="text-white font-medium">
            {estimated_value.toLocaleString()} €
          </span>
        </div>
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-slate-400">
            <MapPin className="h-4 w-4" />
            <span>Coordonate Centru</span>
          </div>
          <span className="text-white font-medium text-xs">
            {center_lat.toFixed(4)}, {center_lng.toFixed(4)}
          </span>
        </div>
      </div>
      <div className="mt-4 pt-3 border-t border-slate-700">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs text-slate-500">Rapoarte rămase</span>
          <span className="text-xs font-bold text-green-400">
            {reportsLeft} / {PACKAGE_REPORTS[activePackage]}
          </span>
        </div>
        {reportsLeft === 0 && (
          <div className="flex flex-col items-center gap-2 mt-2">
            <span className="text-xs text-red-500 font-semibold">
              Numărul de rapoarte a fost epuizat.
            </span>
            <Button
              size="sm"
              className="bg-green-600 hover:bg-green-700"
              onClick={onRenew}
            >
              <RefreshCw className="h-4 w-4 mr-1" /> Reînnoiește
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
