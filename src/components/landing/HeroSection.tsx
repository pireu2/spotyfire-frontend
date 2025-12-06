import Link from "next/link";
import {
  Shield,
  Satellite,
  FileCheck,
  ArrowRight,
  Flame,
  Droplets,
  Leaf,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <div className="relative min-h-screen bg-slate-900 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-green-900/20 via-slate-900 to-slate-900" />
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />

      <div className="relative z-10 container mx-auto px-6 py-20">
        <nav className="flex items-center justify-between mb-20">
          <div className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-green-500" />
            <span className="text-2xl font-bold text-white">SpotyFire</span>
          </div>
          <Link href="/dashboard">
            <Button
              variant="outline"
              className="border-green-600 text-green-500 hover:bg-green-600 hover:text-white"
            >
              Intră în Aplicație
            </Button>
          </Link>
        </nav>

        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-green-600/20 border border-green-600/30 rounded-full px-4 py-2 mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-green-400 text-sm font-medium">
              Conexiune Satelit Activă
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Protejăm Terenul Tău
            <span className="block text-green-500">Din Spațiu</span>
          </h1>

          <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto">
            Detectează incendii și inundații în timp real folosind imagini
            satelitare. Analizează sănătatea vegetației și automatizează
            cererile de despăgubire cu AI.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
            <Link href="/dashboard">
              <Button
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-lg px-8 py-6"
              >
                Lansează Dashboard
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="border-slate-600 text-slate-300 hover:bg-slate-800 text-lg px-8 py-6"
            >
              Află Mai Multe
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mt-20">
            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-8 hover:border-green-600/50 transition-colors">
              <div className="w-14 h-14 bg-orange-600/20 rounded-xl flex items-center justify-center mb-6">
                <Flame className="h-7 w-7 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Detectare Incendii
              </h3>
              <p className="text-slate-400">
                Monitorizare în timp real a incendiilor de vegetație folosind
                date termice satelitare.
              </p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-8 hover:border-green-600/50 transition-colors">
              <div className="w-14 h-14 bg-blue-600/20 rounded-xl flex items-center justify-center mb-6">
                <Droplets className="h-7 w-7 text-blue-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Alertă Inundații
              </h3>
              <p className="text-slate-400">
                Predicție și avertizare timpurie pentru zonele cu risc de
                inundații.
              </p>
            </div>

            <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-2xl p-8 hover:border-green-600/50 transition-colors">
              <div className="w-14 h-14 bg-green-600/20 rounded-xl flex items-center justify-center mb-6">
                <Leaf className="h-7 w-7 text-green-500" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-3">
                Sănătate Vegetație
              </h3>
              <p className="text-slate-400">
                Analiză NDVI pentru monitorizarea stării culturilor și predicții
                de recoltă.
              </p>
            </div>
          </div>

          <div className="mt-20 grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="flex items-center justify-center gap-2 mb-2">
                <Satellite className="h-5 w-5 text-green-500" />
                <span className="text-3xl font-bold text-white">24/7</span>
              </div>
              <p className="text-slate-400">Monitorizare Continuă</p>
            </div>
            <div>
              <div className="flex items-center justify-center gap-2 mb-2">
                <Shield className="h-5 w-5 text-green-500" />
                <span className="text-3xl font-bold text-white">99.9%</span>
              </div>
              <p className="text-slate-400">Precizie Detectare</p>
            </div>
            <div>
              <div className="flex items-center justify-center gap-2 mb-2">
                <FileCheck className="h-5 w-5 text-green-500" />
                <span className="text-3xl font-bold text-white">&lt;1h</span>
              </div>
              <p className="text-slate-400">Timp Generare Raport</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
