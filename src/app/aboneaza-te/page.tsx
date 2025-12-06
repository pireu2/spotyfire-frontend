"use client";

import Navbar from "@/components/landing/Navbar";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import Link from "next/link";

export default function SubscribePage() {
    return (
        <div className="min-h-screen bg-slate-950 text-white font-sans">
            <Navbar />

            <div className="container mx-auto px-6 pt-32 pb-20">
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                        Alege Planul Potrivit
                    </h1>
                    <p className="text-slate-400 text-lg max-w-2xl mx-auto">
                        Soluții flexibile pentru monitorizarea terenurilor, de la proprietari individuali la marii fermieri.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
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

                        {/* Add-on Bubble */}
                        <div className="bg-green-800 rounded-3xl p-6 text-center border border-green-700 shadow-lg relative overflow-hidden">
                            <div className="absolute inset-0 bg-green-600/20" />
                            <div className="relative z-10">
                                <h3 className="text-xl font-bold mb-1">Per raport</h3>
                                <div className="text-3xl font-black">
                                    20 €<span className="text-base font-medium opacity-80">/lună</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* PRO PLAN */}
                    <div className="space-y-4 relative -mt-4 md:-mt-8">
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-green-500 text-black font-bold px-4 py-1 rounded-full text-sm z-20">
                            POPULAR
                        </div>

                        <div className="bg-green-800 rounded-3xl p-10 text-center border-2 border-green-500 shadow-2xl relative overflow-hidden group hover:scale-[1.02] transition-transform duration-300 z-10">
                            <div className="absolute inset-0 bg-green-600/30 group-hover:bg-green-600/40 transition-colors" />
                            <div className="relative z-10">
                                <h3 className="text-3xl font-bold mb-2 uppercase tracking-wide text-white">
                                    Pro
                                </h3>
                                <div className="text-5xl font-black mb-1 text-white">
                                    99€<span className="text-xl font-medium opacity-80">/lună</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-green-900/60 backdrop-blur rounded-3xl p-8 border-2 border-green-500/50 min-h-[340px] flex flex-col relative z-0">
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
                                        <span className="text-lg font-medium">{item}</span>
                                    </li>
                                ))}
                            </ul>

                            <Button className="w-full mt-8 bg-green-600 hover:bg-green-500 text-white font-bold py-6 text-lg rounded-xl shadow-lg shadow-green-900/50">
                                Alege Planul Pro
                            </Button>
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

                <div className="mt-20 text-center">
                    <p className="text-slate-400 mb-6">Ai nevoie de o ofertă personalizată pentru suprafețe mai mari?</p>
                    <Link href="/contact">
                        <Button variant="outline" className="border-slate-700 text-white hover:bg-slate-800 px-8">
                            Contactează Echipa de Vânzări
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
