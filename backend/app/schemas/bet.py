from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class BetBase(BaseModel):
    descricao_bet: str
    valor_apostado: float
    odd : float
    status_bet: str

class BetCreate(BetBase):
    pass

class BetResponse(BaseModel):
    id: int
    data_criacao: datetime
    lucro_prejuizo: Optional[float] = None

    class Config:
        from_attributes = True