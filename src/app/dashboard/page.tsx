"use client";

import MapWrapper from "@/components/map/MapWrapper";
import MapLayers from "@/components/map/MapLayers";
import HealthStats from "@/components/dashboard/HealthStats";
import AlertsPanel from "@/components/dashboard/AlertsPanel";
import ClaimsCard from "@/components/dashboard/ClaimsCard";
import AiAssistant from "@/components/dashboard/AiAssistant";
import { mockParcels, mockAlerts, mockNDVIData } from "@/lib/mocks";

export default function DashboardPage() {
  const currentNDVI =
    mockParcels.reduce((acc, p) => acc + p.ndviIndex, 0) / mockParcels.length;

  return (
    <div className="h-[calc(100vh-4rem)] p-4 flex gap-4">
      <div className="flex-1 relative rounded-xl overflow-hidden border border-slate-700">
        <MapWrapper parcels={mockParcels} />
        <MapLayers />

        <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
          <div className="bg-slate-900/90 backdrop-blur px-4 py-2 rounded-lg flex items-center gap-4">
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
      </div>

      <div className="w-80 space-y-4 overflow-y-auto">
        <HealthStats data={mockNDVIData} currentNDVI={currentNDVI} />
        <AlertsPanel alerts={mockAlerts} />
        <ClaimsCard parcels={mockParcels} />
      </div>

      <AiAssistant />
    </div>
  );
}
