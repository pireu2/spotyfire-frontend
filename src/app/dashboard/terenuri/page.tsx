"use client";

import { useState, useEffect } from "react";
import {
  Plus,
  Loader2,
  Trash2,
  Wheat,
  Trees,
  Grape,
  MapPin,
  Euro,
  SquareIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Property } from "@/types";
import { getProperties, deleteProperty } from "@/lib/api";
import { useUser } from "@stackframe/stack";
import AddTerrainPanel from "@/components/dashboard/AddTerrainPanel";

const getCropIcon = (cropType: string) => {
  switch (cropType.toLowerCase()) {
    case "grau":
    case "wheat":
    case "porumb":
    case "corn":
      return <Wheat className="h-6 w-6" />;
    case "vie":
    case "grape":
      return <Grape className="h-6 w-6" />;
    default:
      return <Trees className="h-6 w-6" />;
  }
};

const getCropLabel = (cropType: string) => {
  const labels: Record<string, string> = {
    grau: "Grâu",
    porumb: "Porumb",
    floarea_soarelui: "Floarea Soarelui",
    rapita: "Rapiță",
    orz: "Orz",
    soia: "Soia",
    vie: "Vie",
    livada: "Livadă",
    legume: "Legume",
    altele: "Altele",
  };
  return labels[cropType.toLowerCase()] || cropType;
};

export default function TerenuriPage() {
  const user = useUser();
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [showAddPanel, setShowAddPanel] = useState(false);

  const fetchProperties = async () => {
    try {
      setIsLoading(true);
      const accessToken = await user
        ?.getAuthJson()
        .then((auth) => auth?.accessToken);
      const data = await getProperties(accessToken || undefined);
      setProperties(data);
    } catch (error) {
      console.error("Failed to fetch properties:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      fetchProperties();
    }
  }, [user]);

  const handleDelete = async (propertyId: string) => {
    if (!confirm("Ești sigur că vrei să ștergi acest teren?")) return;

    try {
      setDeletingId(propertyId);
      const accessToken = await user
        ?.getAuthJson()
        .then((auth) => auth?.accessToken);
      await deleteProperty(propertyId, accessToken || undefined);
      setProperties((prev) => prev.filter((p) => p.id !== propertyId));
    } catch (error) {
      console.error("Failed to delete property:", error);
    } finally {
      setDeletingId(null);
    }
  };

  const handleAddSuccess = () => {
    fetchProperties();
    setShowAddPanel(false);
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex">
      {showAddPanel && (
        <AddTerrainPanel
          onClose={() => setShowAddPanel(false)}
          onSuccess={handleAddSuccess}
        />
      )}

      <div className="flex-1 p-6 overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white">Terenurile Mele</h1>
            <p className="text-slate-400 text-sm mt-1">
              Gestionează și monitorizează terenurile tale agricole
            </p>
          </div>
          <Button
            onClick={() => setShowAddPanel(true)}
            className="bg-green-600 hover:bg-green-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Adaugă Teren
          </Button>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-green-500" />
          </div>
        ) : properties.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 bg-slate-800/50 rounded-xl border border-slate-700">
            <MapPin className="h-16 w-16 text-slate-600 mb-4" />
            <h3 className="text-lg font-medium text-white mb-2">
              Nu ai niciun teren înregistrat
            </h3>
            <p className="text-slate-400 text-sm mb-4">
              Adaugă primul tău teren pentru a începe monitorizarea
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {properties.map((property) => (
              <div
                key={property.id}
                className="bg-slate-800 rounded-xl border border-slate-700 p-4 hover:border-green-500/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-green-600/20 flex items-center justify-center text-green-500">
                      {getCropIcon(property.crop_type)}
                    </div>
                    <div>
                      <h3 className="font-semibold text-white">
                        {property.name}
                      </h3>
                      <p className="text-sm text-slate-400">
                        {getCropLabel(property.crop_type)}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-slate-400 hover:text-red-500 hover:bg-red-500/10"
                    onClick={() => handleDelete(property.id)}
                    disabled={deletingId === property.id}
                  >
                    {deletingId === property.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Trash2 className="h-4 w-4" />
                    )}
                  </Button>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-slate-400">
                      <SquareIcon className="h-4 w-4" />
                      <span>Suprafață</span>
                    </div>
                    <span className="text-white font-medium">
                      {property.area_ha.toFixed(2)} ha
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-slate-400">
                      <Euro className="h-4 w-4" />
                      <span>Valoare Estimată</span>
                    </div>
                    <span className="text-white font-medium">
                      {property.estimated_value.toLocaleString()} €
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2 text-slate-400">
                      <MapPin className="h-4 w-4" />
                      <span>Coordonate Centru</span>
                    </div>
                    <span className="text-white font-medium text-xs">
                      {property.center_lat.toFixed(4)},{" "}
                      {property.center_lng.toFixed(4)}
                    </span>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-700">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">Scor Risc</span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            property.risk_score > 70
                              ? "bg-red-500"
                              : property.risk_score > 40
                              ? "bg-orange-500"
                              : "bg-green-500"
                          }`}
                          style={{ width: `${property.risk_score}%` }}
                        />
                      </div>
                      <span
                        className={`text-xs font-medium ${
                          property.risk_score > 70
                            ? "text-red-400"
                            : property.risk_score > 40
                            ? "text-orange-400"
                            : "text-green-400"
                        }`}
                      >
                        {property.risk_score}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
