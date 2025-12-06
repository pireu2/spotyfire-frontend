"use client";

import Navbar from "@/components/landing/Navbar";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Link from "next/link";

export default function SubscribePage() {
    return (
        <div className="min-h-screen bg-slate-900 overflow-hidden relative font-sans">
            <div className="absolute inset-0 bg-slate-950" />
            <div className="absolute inset-0" style={{ background: 'radial-gradient(circle 1400px at 50% -20%, rgba(34, 197, 94, 0.25) 0%, transparent 70%)' }} />
            <div className="absolute inset-0 bg-grid-pattern" />
            <div className="absolute inset-0 bg-noise opacity-5" />
            <Navbar />

            <div className="relative z-10 container mx-auto px-4 pt-40 pb-20">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                        Alege Planul Potrivit
                    </h1>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        Soluții flexibile pentru monitorizarea terenurilor, de la proprietari individuali la marii fermieri.
                    </p>
                </div>

                <div className="grid md:grid-cols-4 gap-6 max-w-[1400px] mx-auto">
                    {/* PER RAPORT PLAN - Now a main plan */}
                    <div className="space-y-4">
                        <div className="bg-green-800 rounded-3xl p-8 text-center border border-green-700 shadow-xl relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
                            <div className="absolute inset-0 bg-green-600/20 group-hover:bg-green-600/30 transition-colors" />
                            <div className="relative z-10">
                                <h3 className="text-2xl font-bold mb-2 uppercase tracking-wide">
                                    Per Raport
                                </h3>
                                <div className="text-4xl font-black mb-1">
                                    20€<span className="text-lg font-medium opacity-80">/lună</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-green-900/40 backdrop-blur rounded-3xl p-8 border border-green-800/50 min-h-[300px] flex flex-col">
                            <ul className="space-y-4 flex-1">
                                {[
                                    "Plata doar la nevoie",
                                    "Acces la rapoarte individuale",
                                    "Ideal pentru verificări ocazionale",
                                    "Fără abonament recurent"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <div className="mt-1 min-w-5">
                                            <Check className="w-5 h-5 text-green-400" />
                                        </div>
                                        <span className="text-lg">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* BASIC PLAN */}
                    <div className="space-y-4">
                        <div className="bg-green-800 rounded-3xl p-8 text-center border border-green-700 shadow-xl relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
                            <div className="absolute inset-0 bg-green-600/20 group-hover:bg-green-600/30 transition-colors" />
                            <div className="relative z-10">
                                <h3 className="text-2xl font-bold mb-2 uppercase tracking-wide">
                                    Basic
                                </h3>
                                <div className="text-4xl font-black mb-1">
                                    29€<span className="text-lg font-medium opacity-80">/lună</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-green-900/40 backdrop-blur rounded-3xl p-8 border border-green-800/50 min-h-[300px] flex flex-col">
                            <ul className="space-y-4 flex-1">
                                {[
                                    "Monitorizare pentru până la 20 ha",
                                    "5 rapoarte/lună",
                                    "Overview teren",
                                    "Alerte automate"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <div className="mt-1 min-w-5">
                                            <Check className="w-5 h-5 text-green-400" />
                                        </div>
                                        <span className="text-lg">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* PRO PLAN - Removed Popular badge & Button */}
                    <div className="space-y-4">
                        <div className="bg-green-800 rounded-3xl p-8 text-center border border-green-700 shadow-xl relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
                            <div className="absolute inset-0 bg-green-600/20 group-hover:bg-green-600/30 transition-colors" />
                            <div className="relative z-10">
                                <h3 className="text-2xl font-bold mb-2 uppercase tracking-wide">
                                    Pro
                                </h3>
                                <div className="text-4xl font-black mb-1">
                                    99€<span className="text-lg font-medium opacity-80">/lună</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-green-900/40 backdrop-blur rounded-3xl p-8 border border-green-800/50 min-h-[300px] flex flex-col">
                            <ul className="space-y-4 flex-1">
                                {[
                                    "Monitorizare pentru până la 20 ha",
                                    "15 rapoarte/lună",
                                    "Chat AI complet",
                                    "Overview teren",
                                    "Detectare dezastre automată",
                                    "Alerte prioritare"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <div className="mt-1 min-w-5">
                                            <Check className="w-5 h-5 text-green-400" />
                                        </div>
                                        <span className="text-lg">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    {/* ENTERPRISE PLAN */}
                    <div className="space-y-4">
                        <div className="bg-green-800 rounded-3xl p-8 text-center border border-green-700 shadow-xl relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300">
                            <div className="absolute inset-0 bg-green-600/20 group-hover:bg-green-600/30 transition-colors" />
                            <div className="relative z-10">
                                <h3 className="text-2xl font-bold mb-2 uppercase tracking-wide">
                                    Enterprise
                                </h3>
                                <div className="text-4xl font-black mb-1">
                                    299€<span className="text-lg font-medium opacity-80">/lună</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-green-900/40 backdrop-blur rounded-3xl p-8 border border-green-800/50 min-h-[300px] flex flex-col">
                            <ul className="space-y-4 flex-1">
                                {[
                                    "Monitorizare pentru până la 20 ha",
                                    "30 rapoarte/lună",
                                    "Chat AI complet",
                                    "Overview teren",
                                    "Alerte instantanee",
                                    "Analize personalizate",
                                    "Detectare dezastre automată",
                                    "Estimare pagube detaliată",
                                    "Upload date proprii"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <div className="mt-1 min-w-5">
                                            <Check className="w-5 h-5 text-green-400" />
                                        </div>
                                        <span className="text-lg">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    );
}
