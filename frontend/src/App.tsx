import { useEffect, useState } from "react"
import { SidebarProvider, SidebarTrigger, SidebarInset } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/ui/app-sidebar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TrendingUp, Percent, Target, Loader2 } from "lucide-react"
import { NewBetDialog } from "@/components/ui/new-bet-dialog"
import { betService, type Bet } from "@/services/api"

export default function App() {
  const [bets, setBets] = useState<Bet[]>([])
  const [loading, setLoading] = useState(true)

  // Função para buscar dados do Backend
  const loadData = async () => {
    try {
      const data = await betService.getBets()
      setBets(data)
    } catch (error) {
      console.error("Erro ao carregar apostas:", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  // Cálculos Automáticos
  const lucroTotal = bets.reduce((acc, bet) => {
    if (bet.status_bet === "Green") return acc + (bet.valor_apostado * (bet.odd - 1))
    if (bet.status_bet === "Red") return acc - bet.valor_apostado
    return acc
  }, 0)

  const totalInvestido = bets.reduce((acc, bet) => acc + (bet.status_bet !== "Pendente" ? bet.valor_apostado : 0), 0)
  const roi = totalInvestido > 0 ? (lucroTotal / totalInvestido) * 100 : 0
  
  const greens = bets.filter(b => b.status_bet === "Green").length
  const totalFinalizado = bets.filter(b => b.status_bet !== "Pendente").length
  const winRate = totalFinalizado > 0 ? (greens / totalFinalizado) * 100 : 0

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        <SidebarInset className="flex-1">
          <header className="flex h-16 items-center border-b px-6 justify-between bg-background">
            <div className="flex items-center gap-4">
              <SidebarTrigger />
              <h1 className="text-xl font-semibold tracking-tight">Dashboard</h1>
            </div>
            <NewBetDialog />
          </header>

          <main className="p-6 space-y-6 bg-slate-50/50 min-h-[calc(100vh-64px)]">
            {/* Grid de Métricas Dinâmicas */}
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-sm font-medium">Lucro Total</CardTitle>
                  <TrendingUp className={`h-4 w-4 ${lucroTotal >= 0 ? 'text-emerald-500' : 'text-red-500'}`} />
                </CardHeader>
                <CardContent>
                  <div className={`text-2xl font-bold ${lucroTotal >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                    {lucroTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-sm font-medium">ROI</CardTitle>
                  <Percent className="h-4 w-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{roi.toFixed(2)}%</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                  <CardTitle className="text-sm font-medium">Win Rate</CardTitle>
                  <Target className="h-4 w-4 text-orange-500" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{winRate.toFixed(1)}%</div>
                </CardContent>
              </Card>
            </div>

            {/* Tabela de Apostas Real */}
            <Card>
              <CardHeader>
                <CardTitle>Histórico de Apostas</CardTitle>
              </CardHeader>
              <CardContent>
                {loading ? (
                  <div className="flex justify-center p-10"><Loader2 className="animate-spin" /></div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Descrição</TableHead>
                        <TableHead>Valor</TableHead>
                        <TableHead>Odd</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Resultado</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {bets.map((bet) => (
                        <TableRow key={bet.id}>
                          <TableCell className="font-medium">{bet.descricao_bet}</TableCell>
                          <TableCell>R$ {bet.valor_apostado.toFixed(2)}</TableCell>
                          <TableCell>{bet.odd.toFixed(2)}</TableCell>
                          <TableCell>
                            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                              bet.status_bet === 'Green' ? 'bg-emerald-100 text-emerald-700' : 
                              bet.status_bet === 'Red' ? 'bg-red-100 text-red-700' : 'bg-slate-100 text-slate-700'
                            }`}>
                              {bet.status_bet}
                            </span>
                          </TableCell>
                          <TableCell className={`text-right font-bold ${bet.status_bet === 'Green' ? 'text-emerald-600' : 'text-red-600'}`}>
                            {bet.status_bet === 'Green' 
                              ? `+ R$ ${(bet.valor_apostado * (bet.odd - 1)).toFixed(2)}` 
                              : `- R$ ${bet.valor_apostado.toFixed(2)}`}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </CardContent>
            </Card>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}