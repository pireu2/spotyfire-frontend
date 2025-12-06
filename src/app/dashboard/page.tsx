"use client";

import { useState, useEffect } from "react";
import MapWrapper from "@/components/map/MapWrapper";
import MapLayers from "@/components/map/MapLayers";
import HealthStats from "@/components/dashboard/HealthStats";
import AlertsPanel from "@/components/dashboard/AlertsPanel";
import ClaimsCard from "@/components/dashboard/ClaimsCard";
import AiAssistant from "@/components/dashboard/AiAssistant";
import { mockAlerts, mockNDVIData } from "@/lib/mocks";
import { getProperties } from "@/lib/api";
import { useUser } from "@stackframe/stack";
import { Property, LandParcel } from "@/types";
import { MapPin, Loader2 } from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const user = useUser();
  const [properties, setProperties] = useState<Property[]>([]);
  const [parcels, setParcels] = useState<LandParcel[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProperties = async () => {
      if (!user) return;
      try {
        setIsLoading(true);
        const accessToken = await user
          .getAuthJson()
          .then((auth) => auth?.accessToken);
        const data = await getProperties(accessToken || undefined);
        setProperties(data);

        if (data.length > 0) {
          const convertedParcels: LandParcel[] = data.map((prop) => ({
            id: prop.id,
            name: prop.name,
            coordinates: prop.geometry.coordinates[0] as [number, number][],
            ndviIndex: 1 - prop.risk_score / 100,
            status:
              prop.risk_score > 70
                ? "fire"
                : prop.risk_score > 40
                ? "flood"
                : "healthy",
            area: prop.area_ha,
            damageEstimate:
              prop.risk_score > 50
                ? prop.estimated_value * (prop.risk_score / 100)
                : undefined,
          }));
          setParcels(convertedParcels);
        }
      } catch (error) {
        console.error("Failed to fetch properties:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProperties();
  }, [user]);

  const currentNDVI =
    parcels.length > 0
      ? parcels.reduce((acc, p) => acc + p.ndviIndex, 0) / parcels.length
      : 0;

  if (isLoading) {
    return (
      <div className="h-[calc(100vh-4rem)] flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-green-500" />
      </div>
    );
  }

  if (parcels.length === 0) {
    return (
      <div className="h-[calc(100vh-4rem)] flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <MapPin className="h-20 w-20 text-slate-600 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">
            Nu ai terenuri înregistrate
          </h2>
          <p className="text-slate-400 mb-6">
            Pentru a vedea harta live cu terenurile tale, trebuie mai întâi să
            adaugi cel puțin un teren.
          </p>
          <Link
            href="/dashboard/terenuri"
            className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors"
          >
            <MapPin className="h-5 w-5" />
            Adaugă Primul Teren
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-4rem)] p-4 flex gap-4">
      <div className="flex-1 relative rounded-xl overflow-hidden border border-slate-700">
        <MapWrapper parcels={parcels} />
        <MapLayers />

        <div className="absolute bottom-4 left-4 bg-slate-900/90 backdrop-blur px-4 py-2 rounded-lg flex items-center gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span className="text-xs text-slate-300">Sănătos</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-orange-500"></div>
            <span className="text-xs text-slate-300">Incendiu</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            <span className="text-xs text-slate-300">Inundație</span>
          </div>
        </div>
      </div>

      <div className="w-80 space-y-4 overflow-y-auto">
        <HealthStats data={mockNDVIData} currentNDVI={currentNDVI} />
        <AlertsPanel alerts={mockAlerts} />
        <ClaimsCard parcels={parcels} />
      </div>

      <AiAssistant />
    </div>
  );
}
