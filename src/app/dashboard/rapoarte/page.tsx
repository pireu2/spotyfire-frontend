"use client";

import { useReports } from "@/context/ReportsContext";
import { Button } from "@/components/ui/button";
import { FileText, Plus, AlertCircle, RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ReportsPage() {
  const { credits, totalReports, activePackage, reports, requestReport } = useReports();
  const router = useRouter();

  const handleRequestReport = () => {
    if (credits > 0) {
      requestReport("Raport Manual Solicitat", "Analiză detaliată a terenului.");
    } else {
      // Should be handled by UI state, but safe guard
      alert("Nu mai aveți rapoarte disponibile.");
    }
  };

  const navigateToPayment = () => {
    router.push("/dashboard/aboneaza-te");
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
           <h1 className="text-2xl font-bold text-white mb-2">Gestionare Rapoarte</h1>
           <p className="text-slate-400 text-sm">Vizualizează și generează rapoarte pentru terenurile tale.</p>
        </div>
        
        {/* Stats Widget */}
         <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl px-6 py-3 flex items-center gap-6">
             <div className="text-right">
                 <p className="text-xs text-slate-400 uppercase tracking-wider">Pachet Activ</p>
                 <p className="text-green-400 font-bold">{activePackage || "Niciunul"}</p>
             </div>
             <div className="h-8 w-px bg-slate-700"></div>
             <div className="text-right">
                 <p className="text-xs text-slate-400 uppercase tracking-wider">Disponibile</p>
                 <p className={`font-bold ${credits === 0 ? "text-red-500" : "text-white"}`}>
                    {credits} <span className="text-slate-500 text-sm">/ {totalReports}</span>
                 </p>
             </div>
         </div>
      </div>

      {credits === 0 && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-6 flex flex-col items-center justify-center text-center space-y-4">
            <div className="h-12 w-12 bg-red-500/20 rounded-full flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-red-500" />
            </div>
            <div>
                <h3 className="text-xl font-bold text-white">Ați rămas fără rapoarte disponibile</h3>
                <p className="text-slate-400 max-w-md mt-1">
                    Pachetul dumneavoastră curent a epuizat numărul de rapoarte incluse. 
                    Pentru a genera rapoarte noi, vă rugăm să actualizați pachetul.
                </p>
            </div>
            <Button 
                onClick={navigateToPayment}
                className="bg-green-600 hover:bg-green-700 text-white gap-2"
            >
                <RefreshCw className="h-4 w-4" />
                Reabonează-te
            </Button>
        </div>
      )}

      <Card className="bg-slate-800/50 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg text-white flex items-center gap-2">
                  <FileText className="h-5 w-5 text-slate-400" />
                  Istoric Rapoarte
              </CardTitle>
              {credits > 0 && (
                  <Button onClick={handleRequestReport} className="bg-slate-700 hover:bg-slate-600 text-white">
                      <Plus className="h-4 w-4 mr-2" />
                      Cere Raport Nou
                  </Button>
              )}
          </CardHeader>
          <CardContent>
              {reports.length === 0 ? (
                  <div className="text-center py-12 text-slate-500">
                      <FileText className="h-12 w-12 mx-auto mb-3 opacity-20" />
                      <p>Nu există rapoarte generate momentan.</p>
                  </div>
              ) : (
                  <div className="space-y-4">
                      {reports.map((report) => (
                          <div key={report.id} className="bg-slate-900/50 p-4 rounded-lg border border-slate-800 flex items-center justify-between hover:border-slate-700 transition-colors">
                              <div className="flex items-start gap-3">
                                  <div className={`p-2 rounded-lg ${report.type === 'automated' ? 'bg-orange-500/10 text-orange-500' : 'bg-blue-500/10 text-blue-500'}`}>
                                      <FileText className="h-5 w-5" />
                                  </div>
                                  <div>
                                      <h4 className="text-white font-medium">{report.title}</h4>
                                      <p className="text-sm text-slate-400 mt-1">{report.content}</p>
                                  </div>
                              </div>
                              <div className="text-right">
                                  <span className={`text-xs px-2 py-1 rounded-full ${report.type === 'automated' ? 'bg-orange-500/20 text-orange-400' : 'bg-blue-500/20 text-blue-400'}`}>
                                      {report.type === 'automated' ? 'Automat (Alertă)' : 'Manual'}
                                  </span>
                                  <p className="text-xs text-slate-500 mt-2">
                                      {report.date.toLocaleDateString("ro-RO")} • {report.date.toLocaleTimeString("ro-RO")}
                                  </p>
                              </div>
                          </div>
                      ))}
                  </div>
              )}
          </CardContent>
      </Card>
    </div>
  );
}
