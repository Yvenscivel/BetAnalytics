import { useState } from "react";

interface FormProps {
  onAdicionar: (dados: { time: string; odds: number; valor: number }) => void;
}

export function FormularioNovaBet({ onAdicionar }: FormProps) {
  const [time, setTime] = useState("");
  const [odds, setOdds] = useState("");
  const [valor, setValor] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!time || !odds || !valor) return alert("Preencha tudo!");

    onAdicionar({
      time,
      odds: Number(odds),
      valor: Number(valor),
    });

    // Limpa os campos
    setTime("");
    setOdds("");
    setValor("");
  };

  return (
    <form onSubmit={handleSubmit} className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 space-y-4 max-w-md">
      <h2 className="text-lg font-bold text-white uppercase tracking-wider">Nova Aposta</h2>
      
      <div>
        <label className="text-[10px] text-zinc-500 uppercase font-black mb-1 block">Time / Evento</label>
        <input 
          type="text" 
          value={time}
          onChange={(e) => setTime(e.target.value)}
          className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-white focus:border-emerald-500 outline-none transition-all"
          placeholder="Ex: Real Madrid"
        />
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <label className="text-[10px] text-zinc-500 uppercase font-black mb-1 block">Odds</label>
          <input 
            type="number" 
            step="0.01"
            value={odds}
            onChange={(e) => setOdds(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-white focus:border-emerald-500 outline-none transition-all"
            placeholder="1.50"
          />
        </div>
        <div className="flex-1">
          <label className="text-[10px] text-zinc-500 uppercase font-black mb-1 block">Valor (R$)</label>
          <input 
            type="number" 
            value={valor}
            onChange={(e) => setValor(e.target.value)}
            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-white focus:border-emerald-500 outline-none transition-all"
            placeholder="50"
          />
        </div>
      </div>

      <button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black py-3 rounded-lg transition-all shadow-lg shadow-emerald-900/20 active:scale-[0.98]">
        CONFIRMAR APOSTA
      </button>
    </form>
  );
}