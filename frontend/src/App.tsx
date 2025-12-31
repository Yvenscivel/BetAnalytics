import { useState } from "react";
import { Sidebar } from "./components/Sidebar";
import { FormularioNovaBet } from "./components/FormularioNovaBet";
import { TabelaBets } from "./components/TabelaBets";

// Definição do tipo para todo o projeto
export interface Bet {
  id: string;
  time: string;
  odds: number;
  valor: number;
  status: "Ganhou" | "Perdeu" | "Pendente";
}

export default function App() {
  const [apostas, setApostas] = useState<Bet[]>([]);

  // Função que o formulário chama para salvar
  const adicionarNovaBet = (dados: { time: string; odds: number; valor: number }) => {
    const novaAposta: Bet = {
      id: Math.random().toString(36).substr(2, 9),
      time: dados.time,
      odds: dados.odds,
      valor: dados.valor,
      status: "Pendente",
    };

    setApostas([novaAposta, ...apostas]); // Adiciona a nova no topo
  };

  return (
    <div className="flex min-h-screen bg-zinc-950 text-white font-sans">
      <Sidebar />

      <main className="flex-1 p-8 overflow-y-auto">
        <div className="max-w-4xl mx-auto space-y-10">
          <header className="border-b border-zinc-800 pb-6">
            <h1 className="text-3xl font-bold text-emerald-500">BetAnalytics</h1>
            <p className="text-zinc-400">Gerencie suas entradas e acompanhe seus greens.</p>
          </header>

          <section>
            <FormularioNovaBet onAdicionar={adicionarNovaBet} />
          </section>

          <section>
            <h2 className="text-xl font-bold mb-4">Histórico Recente</h2>
            <TabelaBets lista={apostas} />
          </section>
        </div>
      </main>
    </div>
  );
}