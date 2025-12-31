import { LayoutDashboard, ReceiptText, BarChart3, Settings} from "lucide-react";

const links = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/" },
  { label: "Minhas Bets", icon: ReceiptText, href: "/bets" },
  { label: "Relatórios", icon: BarChart3, href: "/stats" },
];

export function Sidebar() {
  return (
    <aside className="h-screen w-64 sticky top-0 bg-zinc-950 border-r border-zinc-800 flex flex-col">

      <div className="p-6">
        <h1 className="text-emerald-500 font-bold text-xl tracking-tight">
          Bet<span className="text-white">Analytics</span>
        </h1>
      </div>
      
    <nav className="flex-1 flex flex-col gap-2 px-4">
        {links.map((link) => (
            <a 
            key={link.label} 
            href={link.href} 
            className="flex items-center gap-3 px-3 py-2 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-lg transition-all group"
            >
            <link.icon size={20} className="group-hover:text-emerald-500" />
            <span className="font-medium">{link.label}</span>
            </a>
        ))}
    </nav>
    
      <div className="p-4 border-t border-zinc-800 space-y-4">
        <a href="#" className="flex items-center gap-3 px-3 py-2 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-lg transition-all">
          <Settings size={20} />
          <span className="font-medium">Configurações</span>
        </a>
        <div className="text-zinc-600 text-[10px] uppercase tracking-widest text-center">
          v1.0.0
        </div>
      </div>

    </aside>
  );
}