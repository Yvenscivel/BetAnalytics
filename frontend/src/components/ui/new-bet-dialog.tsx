import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { betService } from "@/services/api"
import type { Bet } from "@/services/api"
import { PlusCircle } from "lucide-react"

export function NewBetDialog() {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)

    const formData = new FormData(event.currentTarget)
    
    // Mapeamento exato para o seu Pydantic BetBase
    const newBet: Bet = {
      descricao_bet: formData.get("descricao_bet") as string,
      valor_apostado: Number(formData.get("valor_apostado")),
      odd: Number(formData.get("odd")),
      status_bet: formData.get("status_bet") as string,
    }

    try {
      await betService.createBet(newBet)
      setOpen(false)
      alert("Aposta registrada com sucesso!")
      window.location.reload() 
    } catch (error: any) {
      console.error("Erro detalhado:", error.response?.data || error.message)
      // Se der 404 aqui, verifique a rota no betService.createBet
      alert(`Erro ao salvar: ${error.response?.status === 404 ? "Rota não encontrada no servidor (404)" : "Verifique os dados"}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2 bg-blue-600 hover:bg-blue-700 text-white">
          <PlusCircle className="h-4 w-4" />
          Nova Aposta
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Cadastrar Nova Aposta</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          
          <div className="grid gap-2">
            <Label htmlFor="descricao_bet">Descrição (Time/Evento)</Label>
            <Input 
              id="descricao_bet" 
              name="descricao_bet" 
              placeholder="Ex: Flamengo vs Palmeiras" 
              required 
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="valor_apostado">Valor (R$)</Label>
              <Input 
                id="valor_apostado" 
                name="valor_apostado" 
                type="number" 
                step="0.01" 
                placeholder="10.00" 
                required 
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="odd">Odd</Label>
              <Input 
                id="odd" 
                name="odd" 
                type="number" 
                step="0.01" 
                placeholder="2.00" 
                required 
              />
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="status_bet">Resultado</Label>
            <select 
              id="status_bet" 
              name="status_bet" 
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              required
            >
              <option value="Green">Green ✅</option>
              <option value="Red">Red ❌</option>
              <option value="Pendente">Pendente ⏳</option>
            </select>
          </div>

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Enviando para o Backend..." : "Salvar Aposta"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}