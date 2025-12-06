"use client";

import { useState } from "react";
import { mockAlerts } from "@/lib/mocks";
import { AlertTriangle, Flame, Droplets, Leaf } from "lucide-react";

const alertTypes = [
  { value: "all", label: "Toate" },
  { value: "fire", label: "Incendii", icon: <Flame className="h-4 w-4 text-orange-500" /> },
  { value: "flood", label: "Inundații", icon: <Droplets className="h-4 w-4 text-blue-500" /> },
  { value: "ndvi", label: "Vegetatie", icon: <Leaf className="h-4 w-4 text-green-500" /> },
  { value: "warning", label: "Avertizări", icon: <AlertTriangle className="h-4 w-4 text-yellow-500" /> },
];

export default function AlertePage() {
  const [filter, setFilter] = useState("all");

  const filteredAlerts =
    filter === "all"
      ? mockAlerts
      : mockAlerts.filter((a) => a.type === filter);

  return (
    <div className="container mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold text-white mb-8">Alerte Active</h1>
      <div className="flex gap-3 mb-8">
        {alertTypes.map((type) => (
          <button
            key={type.value}
            onClick={() => setFilter(type.value)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors text-sm font-medium
              ${filter === type.value
                ? "bg-green-600/20 border-green-600 text-green-400"
                : "bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700 hover:text-white"}
            `}
          >
            {type.icon}
            {type.label}
          </button>
        ))}
      </div>
      <div className="space-y-4">
        {filteredAlerts.length > 0 ? (
          filteredAlerts.map((alert) => (
            <div
              key={alert.id}
              className={`border-l-4 rounded-r-lg p-4 bg-slate-800 border-slate-700 flex items-start gap-4`}
            >
              {alert.type === "fire" && <Flame className="h-6 w-6 text-orange-500" />}
              {alert.type === "flood" && <Droplets className="h-6 w-6 text-blue-500" />}
              {alert.type === "ndvi" && <Leaf className="h-6 w-6 text-green-500" />}
              {alert.type === "warning" && <AlertTriangle className="h-6 w-6 text-yellow-500" />}
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium text-lg mb-1">{alert.message}</p>
                <div className="flex items-center gap-2 text-xs text-slate-400">
                  <span>{alert.sector}</span>
                  <span>•</span>
                  <span>{alert.timestamp.toLocaleString("ro-RO", { hour: "2-digit", minute: "2-digit", day: "2-digit", month: "short" })}</span>
                  <span>•</span>
                  <span className={`font-semibold ${alert.severity === "high" ? "text-red-500" : alert.severity === "medium" ? "text-orange-400" : "text-yellow-400"}`}>
                    {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10 text-slate-400">
            <AlertTriangle className="h-10 w-10 mx-auto mb-3 opacity-50" />
            <p>Nicio alertă pentru acest tip.</p>
          </div>
        )}
      </div>
    </div>
  );
}
