"use client";

import SubscriptionContent from "@/components/subscription/SubscriptionContent";
import Navbar from "@/components/landing/Navbar";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function SubscribePage() {
  return (
    <div className="relative min-h-screen bg-slate-900 overflow-hidden">
      {/* Background Effects matching DesprePage */}
      <div className="absolute inset-0 bg-slate-950" />
      <div className="absolute inset-0" style={{ background: 'radial-gradient(circle 1400px at 50% -20%, rgba(34, 197, 94, 0.25) 0%, transparent 70%)' }} />
      <div className="absolute inset-0 bg-grid-pattern" />
      <div className="absolute inset-0 bg-noise pointer-events-none" />

      <Navbar />

      <div className="relative z-10 container mx-auto px-6 pt-28 pb-20">
        <Link href="/">
          <Button variant="ghost" className="text-slate-400 hover:text-white mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Înapoi la pagina principală
          </Button>
        </Link>
        
        <h1 className="text-4xl md:text-5xl font-bold text-center text-white mb-12">
          Alege Planul Potrivit
        </h1>

        <SubscriptionContent />
      </div>
    </div>
  );
}
