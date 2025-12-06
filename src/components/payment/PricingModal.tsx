"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "@/components/ui/button";
import { Check, X } from "lucide-react";
import CheckoutModal from "./CheckoutModal";

const PACKAGES = [
  {
    name: "Basic",
    price: 9,
    reports: 5,
    features: ["5 rapoarte incluse", "Monitorizare NDVI", "Alerte incendiu"],
  },
  {
    name: "Pro",
    price: 29,
    reports: 15,
    features: [
      "15 rapoarte incluse",
      "Monitorizare NDVI avansată",
      "Alerte incendiu/inundație",
      "Export PDF",
    ],
  },
  {
    name: "Enterprise",
    price: 99,
    reports: 50,
    features: [
      "50 rapoarte incluse",
      "Toate funcțiile Pro",
      "Suport prioritar",
    ],
  },
];

function calcExtraCost(ha: number) {
  if (ha <= 20) return 0;
  const k = 0.857;
  const alpha = 0.833;
  return k * Math.pow(ha - 20, alpha);
}

export default function PricingModal({
  open,
  onClose,
  areaHa,
  onPaymentSuccess,
  userEmail,
}: {
  open: boolean;
  onClose: () => void;
  areaHa: number;
  onPaymentSuccess: (pkg: string, reports: number) => void;
  userEmail: string;
}) {
  const [selected, setSelected] = useState(0);
  const [showCheckout, setShowCheckout] = useState(false);

  const pkg = PACKAGES[selected];
  const extra = calcExtraCost(areaHa);
  const finalPrice =
    areaHa <= 20 ? pkg.price : Math.round((pkg.price + extra) * 100) / 100;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle className="text-2xl font-bold text-center">
            Alege pachetul pentru terenul tău
          </DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6 pt-2">
          {PACKAGES.map((p, i) => (
            <div
              key={p.name}
              className={`rounded-2xl border ${
                selected === i
                  ? "border-green-600 bg-green-50/5"
                  : "border-slate-700 bg-slate-800"
              } p-6 flex flex-col items-center transition-colors`}
              onClick={() => setSelected(i)}
              style={{ cursor: "pointer" }}
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-lg font-semibold text-white">
                  {p.name}
                </span>
                {selected === i && <Check className="h-5 w-5 text-green-500" />}
              </div>
              <div className="text-3xl font-bold text-green-500 mb-2">
                {p.price}€
              </div>
              <div className="text-xs text-slate-400 mb-4">/lună</div>
              <ul className="mb-4 space-y-1 w-full">
                {p.features.map((f) => (
                  <li
                    key={f}
                    className="flex items-center gap-2 text-slate-300"
                  >
                    <Check className="h-4 w-4 text-green-500" /> {f}
                  </li>
                ))}
              </ul>
              {areaHa > 20 && (
                <div className="text-xs text-orange-400 mt-2 text-center">
                  +{extra.toFixed(2)}€ pentru {areaHa - 20} ha suplimentare
                </div>
              )}
              <Button
                className="mt-4 w-full bg-green-600 hover:bg-green-700"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowCheckout(true);
                }}
              >
                Alege {p.name}
              </Button>
            </div>
          ))}
        </div>
        <Button
          variant="ghost"
          className="absolute top-4 right-4 text-slate-400 hover:text-red-500"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </Button>
        <CheckoutModal
          open={showCheckout}
          onClose={() => setShowCheckout(false)}
          price={finalPrice}
          pkg={pkg.name}
          reports={pkg.reports}
          userEmail={userEmail}
          onPaymentSuccess={() => {
            setShowCheckout(false);
            onClose();
            onPaymentSuccess(pkg.name, pkg.reports);
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
