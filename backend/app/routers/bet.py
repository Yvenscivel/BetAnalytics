from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import SessionLocal
import crud.bet as crud
import schemas.bet as schemas

router = APIRouter(prefix="/bets", tags=["Bets"])

# Função para pegar a conexão do banco em cada rota
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=schemas.BetResponse)
def criar_nova_aposta(aposta: schemas.BetCreate, db: Session = Depends(get_db)):
    return crud.create_bet(db=db, bet=aposta)

@router.get("/", response_model=list[schemas.BetResponse])
def listar_todas_apostas(db: Session = Depends(get_db)):
    return crud.get_bets(db)