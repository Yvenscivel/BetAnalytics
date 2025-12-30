import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:8000", 
});

export interface Bet {
  id?: number;
  descricao_bet: string;
  valor_apostado: number;
  odd: number;
  status_bet: string;
}

export const betService = {
  // Adicionei a barra "/" no final de /bets/ para bater com o router do FastAPI
  createBet: async (bet: Bet) => {
    const response = await api.post("/bets/", bet); 
    return response.data;
  },
  
  getBets: async () => {
    const response = await api.get<Bet[]>("/bets/");
    return response.data;
  }
};