import { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { FormularioNovaBet } from "./components/FormularioNovaBet";
import { TabelaBets } from "./components/TabelaBets";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// src/types.ts
export interface Bet {
  id: string;
  time: string;
  odds: number;
  valor: number;
  status: "Ganhou" | "Perdeu" | "Pendente";
}

export default function App() {
  const [apostas, setApostas] = useState<Bet[]>([]);

  const adicionarNovaBet = (dados: { time: string; odds: number; valor: number }) => {
    const novaAposta:  Bet = {
      id: Math.random().toString(36).substr(2, 9),
      time: dados.time,
      odds: dados.odds,
      valor: dados.valor,
      status: "Pendente",
    };
    setApostas([novaAposta, ...apostas]);
  };

  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-zinc-950 text-white font-sans">
        <Sidebar />

        <main className="flex-1 p-8 overflow-y-auto">
          <div className="max-w-4xl mx-auto space-y-10">
            
            <Routes>
              {/* ROTA PRINCIPAL (DASHBOARD/FORMULÁRIO) */}
              <Route path="/" element={
                <>
                  <header className="border-b border-zinc-800 pb-6">
                    <h1 className="text-3xl font-bold text-emerald-500">Dashboard</h1>
                  </header>
                  <FormularioNovaBet onAdicionar={adicionarNovaBet} />
                </>
              } />

              {/* ROTA DAS TABELAS (MINHAS BETS) */}
              <Route path="/bets" element={
                <>
                  <header className="border-b border-zinc-800 pb-6">
                    <h1 className="text-3xl font-bold text-emerald-500">Minhas Bets</h1>
                  </header>
                  <TabelaBets lista={apostas} />
                </>
              } />

              {/* OUTRAS ROTAS */}
              <Route path="/stats" element={<h1 className="text-2xl">Relatórios (Em breve)</h1>} />
            </Routes>

          </div>
        </main>
      </div>
    </BrowserRouter>
  );
}