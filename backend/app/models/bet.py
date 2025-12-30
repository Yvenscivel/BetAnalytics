
from datetime import datetime
from sqlalchemy import Column, Float, Integer, String, DateTime
from database import Base # importando a Base do arquivo database.py



class Bets(Base):
    __tablename__ = "bets"
    id = Column(Integer, primary_key=True, index=True)
    descricao_bet = Column(String, index=True)
    valor_apostado = Column(Float)
    odd = Column(Float)
    status_bet = Column(String, index=True)
    lucro_prejuizo = Column(Float)
    data_criacao = Column(DateTime, default=datetime.utcnow)