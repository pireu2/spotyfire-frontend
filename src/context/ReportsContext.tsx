"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface Report {
  id: string;
  title: string;
  date: Date;
  type: "manual" | "automated";
  content: string;
}

export type PackageType = "Basic" | "Pro" | "Enterprise";

interface ReportsContextType {
  credits: number; // Available reports
  totalReports: number; // Total included in package
  activePackage: PackageType | null;
  reports: Report[];
  addCredits: (amount: number) => void;
  activatePackage: (pkg: PackageType, hectares: number) => void;
  requestReport: (title: string, content: string) => boolean;
  generateAutomatedReport: (title: string, content: string) => void;
  calculatePrice: (pkg: PackageType, hectares: number) => number;
}

const ReportsContext = createContext<ReportsContextType | undefined>(undefined);

export function ReportsProvider({ children }: { children: React.ReactNode }) {
  const [credits, setCredits] = useState<number>(0);
  const [totalReports, setTotalReports] = useState<number>(0);
  const [activePackage, setActivePackage] = useState<PackageType | null>(null);
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    const savedCredits = localStorage.getItem("spotyfire_credits");
    const savedTotal = localStorage.getItem("spotyfire_total_reports");
    const savedPackage = localStorage.getItem("spotyfire_package");
    const savedReports = localStorage.getItem("spotyfire_reports");

    if (savedCredits) setCredits(parseInt(savedCredits, 10));
    if (savedTotal) setTotalReports(parseInt(savedTotal, 10));
    if (savedPackage) setActivePackage(savedPackage as PackageType);
    
    if (savedReports) {
      try {
        const parsed = JSON.parse(savedReports);
        const hydratedReports = parsed.map((r: any) => ({
          ...r,
          date: new Date(r.date)
        }));
        setReports(hydratedReports);
      } catch (e) {
        console.error("Failed to parse reports", e);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("spotyfire_credits", credits.toString());
      localStorage.setItem("spotyfire_total_reports", totalReports.toString());
      if (activePackage) localStorage.setItem("spotyfire_package", activePackage);
      localStorage.setItem("spotyfire_reports", JSON.stringify(reports));
    }
  }, [credits, totalReports, activePackage, reports, isLoaded]);

  const addCredits = (amount: number) => {
    setCredits((prev) => prev + amount);
  };

  const activatePackage = (pkg: PackageType, hectares: number) => {
    let reportCount = 0;
    switch (pkg) {
      case "Basic": reportCount = 5; break;
      case "Pro": reportCount = 15; break;
      case "Enterprise": reportCount = 30; break;
    }
    
    setActivePackage(pkg);
    setTotalReports(reportCount);
    setCredits(reportCount); // Reset credits to full package limits
  };

  const calculatePrice = (pkg: PackageType, hectares: number): number => {
    let basePrice = 0;
    switch (pkg) {
      case "Basic": basePrice = 9; break;
      case "Pro": basePrice = 29; break;
      case "Enterprise": basePrice = 99; break;
    }

    if (hectares <= 20) {
      return basePrice;
    }

    // Formula: Preț_final = Preț_pachet + k * (Hectare_peste)^α
    // k = 0.857, α = 0.833
    const extraHectares = hectares - 20;
    const k = 0.857;
    const alpha = 0.833;
    const extraCost = k * Math.pow(extraHectares, alpha);

    return parseFloat((basePrice + extraCost).toFixed(2));
  };

  const requestReport = (title: string, content: string): boolean => {
    if (credits <= 0) return false;

    const newReport: Report = {
      id: crypto.randomUUID(),
      title,
      date: new Date(),
      type: "manual",
      content,
    };

    setCredits((prev) => prev - 1);
    setReports((prev) => [newReport, ...prev]);
    return true;
  };

  const generateAutomatedReport = (title: string, content: string) => {
    const newReport: Report = {
      id: crypto.randomUUID(),
      title,
      date: new Date(),
      type: "automated",
      content,
    };
    
    if (credits > 0) {
        setCredits((prev) => prev - 1);
    }
    
    setReports((prev) => [newReport, ...prev]);
  };

  return (
    <ReportsContext.Provider
      value={{
        credits,
        totalReports,
        activePackage,
        reports,
        addCredits,
        activatePackage,
        requestReport,
        generateAutomatedReport,
        calculatePrice,
      }}
    >
      {children}
    </ReportsContext.Provider>
  );
}

export function useReports() {
  const context = useContext(ReportsContext);
  if (context === undefined) {
    throw new Error("useReports must be used within a ReportsProvider");
  }
  return context;
}
