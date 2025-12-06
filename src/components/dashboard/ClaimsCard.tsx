"use client";

import { useState } from "react";
import { FileText, Download, CheckCircle, Clock, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LandParcel } from "@/types";

interface ClaimsCardProps {
  parcels: LandParcel[];
}

export default function ClaimsCard({ parcels }: ClaimsCardProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [reportGenerated, setReportGenerated] = useState(false);

  const damagedParcels = parcels.filter((p) => p.status !== "healthy");
  const totalDamage = damagedParcels.reduce(
    (acc, p) => acc + (p.damageEstimate || 0),
    0
  );
  const totalArea = damagedParcels.reduce((acc, p) => acc + p.area, 0);

  const handleGenerateReport = async () => {
    setIsGenerating(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsGenerating(false);
    setReportGenerated(true);
  };

  return (
    <Card className="bg-slate-800/80 backdrop-blur border-slate-700">
      <CardHeader className="pb-2">
        <CardTitle className="text-white flex items-center gap-2 text-lg">
          <FileText className="h-5 w-5 text-green-500" />
          Raport Despăgubiri
        </CardTitle>
      </CardHeader>
      <CardContent>
        {damagedParcels.length > 0 ? (
          <>
            <div className="space-y-3 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-sm">Parcele Afectate</span>
                <span className="text-white font-semibold">
                  {damagedParcels.length}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-sm">Suprafață Totală</span>
                <span className="text-white font-semibold">
                  {totalArea.toFixed(1)} ha
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-sm">Estimare Daune</span>
                <span className="text-red-400 font-bold text-lg">
                  {totalDamage.toLocaleString("ro-RO")} RON
                </span>
              </div>
            </div>

            <div className="border-t border-slate-700 pt-4">
              {reportGenerated ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-green-500">
                    <CheckCircle className="h-5 w-5" />
                    <span className="font-medium">Raport Generat</span>
                  </div>
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    <Download className="h-4 w-4 mr-2" />
                    Descarcă Certificat PDF
                  </Button>
                </div>
              ) : (
                <Button
                  className="w-full bg-green-600 hover:bg-green-700"
                  onClick={handleGenerateReport}
                  disabled={isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Se Generează...
                    </>
                  ) : (
                    <>
                      <FileText className="h-4 w-4 mr-2" />
                      Generează Raport AI
                    </>
                  )}
                </Button>
              )}
            </div>

            <div className="mt-4 flex items-center gap-2 text-xs text-slate-500">
              <Clock className="h-3 w-3" />
              <span>Timp estimat generare: &lt;1 minut</span>
            </div>
          </>
        ) : (
          <div className="text-center py-6 text-slate-400">
            <CheckCircle className="h-8 w-8 mx-auto mb-2 text-green-500 opacity-50" />
            <p>Nicio daună detectată</p>
            <p className="text-xs mt-1">Toate parcelele sunt sănătoase</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
