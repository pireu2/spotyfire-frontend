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
import { MapPin, Loader2, FileText, Plus } from "lucide-react";
import Link from "next/link";
import { useReports } from "@/context/ReportsContext";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { Property, LandParcel } from "@/types";

export default function DashboardPage() {
  const user = useUser();
  const { credits, totalReports, activePackage, reports, requestReport, generateAutomatedReport } = useReports();
  const router = useRouter();
  const [activeLayer, setActiveLayer] = useState("standard");
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

  // Automated Reports Simulation for High Severity Alerts
  useEffect(() => {
    // Helper to check if we already have a report for this alert (simplistic mock check)
    // In a real app the report would link to the alert ID.
    const hasReportForAlert = (alertId: string) => {
        return reports.some(r => r.content.includes(alertId)); 
    };

    const highSeverityAlerts = mockAlerts.filter(a => a.severity === 'high');
    
    highSeverityAlerts.forEach(alert => {
        // Requirement: "caz de alerta... automat un raport"
        // Check if we have credits
        if (credits > 0 && !hasReportForAlert(alert.id)) {
             // Create report
             // We use a timeout to not flood immediately on mount, simulating "live" detection
             setTimeout(() => {
                 // Double check credits inside timeout
                 // We don't have access to fresh state here easily without ref, but good enough for mock simulation
                 // generateAutomatedReport handles credit decrement internally
                 // We just need to make sure we don't spam.
                 if (Math.random() > 0.8) { // Only trigger sometimes to simulate "new" alerts
                     generateAutomatedReport(
                        `Raport Automat: ${alert.type.toUpperCase()}`, 
                        `Generat automat pentru alerta #${alert.id}: ${alert.message}`
                     );
                 }
             }, 2000);
        }
    });

    // NOTE: In a real implementation this would listen to a websocket or polling for NEW alerts.
    // Here we just use the mock list.
  }, [credits, reports, generateAutomatedReport]);

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
        <MapWrapper parcels={parcels} alerts={mockAlerts} activeLayer={activeLayer} />
        <MapLayers activeLayer={activeLayer} onLayerChange={setActiveLayer} />

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
        
        {/* Reports Control Panel */}
        <div className="bg-slate-800/80 backdrop-blur border border-slate-700 rounded-xl p-4">
          <div className="flex items-center justify-between mb-4">
            <div>
                <h3 className="text-white font-semibold flex items-center gap-2">
                <FileText className="h-4 w-4 text-green-500" />
                Rapoarte
                </h3>
                {activePackage && <p className="text-[10px] text-slate-400 ml-6 uppercase tracking-wider">{activePackage} Plan</p>}
            </div>
            <span className={`text-sm font-bold px-2 py-0.5 rounded ${credits > 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
              {credits} / {totalReports > 0 ? totalReports : '-'}
            </span>
          </div>

          <Button
            onClick={() => {
              if (credits > 0) {
                const success = requestReport("Raport Manual Solicitat", "Analiză detaliată a terenurilor selectate.");
                if (success) {
                   // Success
                }
              } else {
                alert("Nu mai ai rapoarte disponibile.");
                router.push("/payment");
              }
            }}
            className="w-full bg-slate-700 hover:bg-slate-600 text-white mb-4"
          >
            <Plus className="h-4 w-4 mr-2" />
            Cere raport
          </Button>

          {/* Simulate Automated Report to test logic */}
          <Button
            onClick={() => {
               if (credits > 0) {
                   generateAutomatedReport("Alertă Automată Incendiu", "Detectat incendiu în Sectorul 4.");
               } else {
                   alert("Nu mai ai rapoarte disponibile pentru procesare automată.");
                   router.push("/payment");
               }
            }}
            variant="outline"
            className="w-full border-slate-600 text-slate-300 hover:bg-slate-700 text-xs mb-4"
          >
            Simulează Alertă (Auto)
          </Button>

          <div className="space-y-2 max-h-40 overflow-y-auto pr-1 custom-scrollbar">
            {reports.length === 0 ? (
                <p className="text-xs text-slate-500 text-center py-2">Nu există rapoarte generate.</p>
            ) : (
                reports.map((report) => (
                    <div key={report.id} className="bg-slate-900/50 p-2 rounded border border-slate-700/50">
                        <p className="text-xs text-slate-300 font-medium truncate">{report.title}</p>
                        <div className="flex justify-between items-center mt-1">
                            <span className="text-[10px] text-slate-500">{report.type === "automated" ? "Automat" : "Manual"}</span>
                            <span className="text-[10px] text-slate-500">{new Date(report.date).toLocaleTimeString()}</span>
                        </div>
                    </div>
                ))
            )}
          </div>
        </div>

        <HealthStats data={mockNDVIData} currentNDVI={currentNDVI} />
        <AlertsPanel alerts={mockAlerts} />
        <ClaimsCard parcels={parcels} />
      </div>

      <AiAssistant />
    </div>
  );
}
