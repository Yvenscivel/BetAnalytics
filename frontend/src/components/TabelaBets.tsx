import { type Bet } from "../App";

interface TabelaProps {
  lista: Bet[];
}

export function TabelaBets({ lista }: TabelaProps) {
  if (lista.length === 0) {
    return (
      <div className="p-10 border border-dashed border-zinc-800 rounded-2xl text-center text-zinc-500">
        Nenhuma aposta registrada ainda.
      </div>
    );
  }

  return (
    <div className="w-full bg-zinc-900 rounded-2xl border border-zinc-800 overflow-hidden shadow-2xl">
      <table className="w-full text-left border-collapse">
        <thead className="bg-zinc-950 text-zinc-500 text-[10px] uppercase font-black tracking-widest">
          <tr>
            <th className="p-4">Evento</th>
            <th className="p-4">Odds</th>
            <th className="p-4">Valor</th>
            <th className="p-4">Status</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-zinc-800 text-zinc-300">
          {lista.map((aposta) => (
            <tr key={aposta.id} className="hover:bg-zinc-800/30 transition-colors">
              <td className="p-4 font-bold text-white">{aposta.time}</td>
              <td className="p-4 font-mono text-emerald-400">@{aposta.odds.toFixed(2)}</td>
              <td className="p-4 font-medium text-zinc-100">R$ {aposta.valor.toFixed(2)}</td>
              <td className="p-4">
                <span className="px-3 py-1 rounded-full text-[10px] font-black uppercase bg-zinc-800 text-zinc-400">
                  {aposta.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}