import Link from "next/link";
import {
  Shield,
  Home,
  Map,
  Bell,
  FileText,
  Settings,
  Satellite,
  Wifi,
} from "lucide-react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-slate-900 flex">
      <aside className="w-64 bg-slate-800 border-r border-slate-700 flex flex-col">
        <div className="p-4 border-b border-slate-700">
          <Link href="/" className="flex items-center gap-2">
            <Shield className="h-8 w-8 text-green-500" />
            <span className="text-xl font-bold text-white">SpotyFire</span>
          </Link>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li>
              <Link
                href="/dashboard"
                className="flex items-center gap-3 px-3 py-2 rounded-lg bg-green-600/20 text-green-500 font-medium"
              >
                <Map className="h-5 w-5" />
                Hartă Live
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 hover:bg-slate-700 hover:text-white transition-colors"
              >
                <Bell className="h-5 w-5" />
                Alerte
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 hover:bg-slate-700 hover:text-white transition-colors"
              >
                <FileText className="h-5 w-5" />
                Rapoarte
              </Link>
            </li>
            <li>
              <Link
                href="#"
                className="flex items-center gap-3 px-3 py-2 rounded-lg text-slate-400 hover:bg-slate-700 hover:text-white transition-colors"
              >
                <Settings className="h-5 w-5" />
                Setări
              </Link>
            </li>
          </ul>
        </nav>

        <div className="p-4 border-t border-slate-700">
          <div className="bg-slate-700/50 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              <Satellite className="h-4 w-4 text-green-500" />
              <span className="text-sm text-slate-300">Status Conectare</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-xs text-green-400">
                Uplink Satelit Activ
              </span>
            </div>
            <div className="flex items-center gap-2 mt-1">
              <Wifi className="h-3 w-3 text-slate-500" />
              <span className="text-xs text-slate-500">
                SMS Backup Disponibil
              </span>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1 flex flex-col">
        <header className="h-16 bg-slate-800/50 backdrop-blur border-b border-slate-700 flex items-center justify-between px-6">
          <div>
            <h1 className="text-lg font-semibold text-white">
              Dashboard Monitorizare
            </h1>
            <p className="text-xs text-slate-400">
              Ultima actualizare: acum 2 minute
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-slate-700/50 px-3 py-1.5 rounded-lg">
              <Home className="h-4 w-4 text-slate-400" />
              <span className="text-sm text-slate-300">
                Fermă Demo - București
              </span>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-auto">{children}</div>
      </main>
    </div>
  );
}
