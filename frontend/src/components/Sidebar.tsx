import { LayoutDashboard, ReceiptText, BarChart3, Settings, ChevronLeft, ChevronRight} from "lucide-react";
import { useState } from 'react';

const links = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/" },
  { label: "Minhas Bets", icon: ReceiptText, href: "/bets" },
  { label: "Relatórios", icon: BarChart3, href: "/stats" },
];

export function Sidebar() {
  // 1. O estado agora vive aqui dentro
  const [isOpen, setIsOpen] = useState(true);

  // 2. A função que alterna entre true e false
  function toggleSidebar() {
    setIsOpen(!isOpen);
  }

  return (
    <aside 
        className={`h-screen sticky top-0 bg-zinc-950 border-r border-zinc-800 flex flex-col transition-all duration-300 relative ${
          isOpen ? "w-64" : "w-20"
        }`}
      >
        {/* BOTAO NA BORDA */}
        <button 
          onClick={toggleSidebar}
          className="cursor-pointer absolute -right-3 top-12 bg-emerald-500 hover:bg-emerald-600 text-zinc-950 rounded-full p-1 shadow-lg transition-transform"
        >
          {isOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
        </button>

        {/* LOGO */}
        <div className={`p-6 mb-4 ${!isOpen && "flex justify-center"}`}>
          {isOpen ? (
            <h1 className="text-emerald-500 font-bold text-4xl tracking-tight">
              Bet<span className="text-white">Analytics</span>
            </h1>
          ) : (
            <span className="flex text-emerald-500 font-bold text-4xl">B <span className="text-white">A</span></span> 
          )}
        </div>
      
      <nav className="flex-1 flex flex-col gap-2 px-4">
        {links.map((link) => (
          <a key={link.label} href={link.href} className="flex items-center gap-3 px-3 py-2 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-lg transition-all group">
            <link.icon size={20} className="group-hover:text-emerald-500" />
            {isOpen && <span className="font-medium">{link.label}</span>}
          </a>
        ))}
      </nav>
    
      <div className="p-4 border-t border-zinc-800 space-y-4">
        <a href="/settings" className="flex items-center gap-3 px-3 py-2 text-zinc-400 hover:text-white hover:bg-zinc-900 rounded-lg transition-all">
          <Settings size={20} />
          
          {/* Só mostra o texto se isOpen for true */}
          {isOpen && <span className="font-medium">Configurações</span>}
        </a>
        <div className="text-zinc-600 text-[10px] uppercase tracking-widest text-center">
          v1.0.0
        </div>
      </div>

    </aside>
  );
}