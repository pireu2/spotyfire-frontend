"use client";

import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Navbar from "@/components/landing/Navbar";

export default function DesprePage() {
  return (
    <div className="relative min-h-screen bg-slate-900 overflow-hidden">
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

        <h1 className="text-4xl md:text-6xl font-bold text-white mb-8">
          Despre Noi
        </h1>

        <div className="max-w-4xl">
          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-green-500 mb-4">
              Misiunea Noastră
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed">
              {/* Add your text here */}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-green-500 mb-4">
              Cine Suntem
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed">
              {/* Add your text here */}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-green-500 mb-4">
              Tehnologia Noastră
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed">
              {/* Add your text here */}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold text-green-500 mb-4">
              De Ce SpotyFire?
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed">
              {/* Add your text here */}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
